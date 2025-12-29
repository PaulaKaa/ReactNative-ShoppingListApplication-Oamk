import MainAppbar from "../components/MainAppbarProps";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view"; //npm install --save react-native-swipe-list-view
import { TextInput, Button } from "react-native-paper";
import {
  firestore,
  collection,
  addDoc,
  serverTimestamp,
  ITEMS,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "../firebase/Config";
import Item from "../components/ItemView";

interface Item {
  id: string;
  text: string;
  done: boolean;
}

const ShoppingListScreen = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const colRef = collection(firestore, ITEMS);
    const itemquery = query(colRef, orderBy("created", "desc"));
    const unsubscribe = onSnapshot(
      itemquery,
      (snap) => {
        const rows: Item[] = snap.docs.map((d) => {
          const data = d.data() as any;
          const text = data.text ?? "";
          const done = data.done ?? false;

          return { id: d.id, text, done };
        });
        setItems(rows);
      },
      (err) => {
        console.error("OnSnapshot error", err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);

  //Update item: done
  const handleUpdate = async (itemID: string, done: boolean): Promise<void> => {
    const colRef = collection(firestore, ITEMS);
    const docRef = doc(colRef, itemID);
    try {
      if (done === false) {
        await updateDoc(docRef, {
          done: true,
        });
      } else {
        await updateDoc(docRef, {
          done: false,
        });
      }
    } catch (error) {
      console.error("Failed to update the item to Firebase", error);
    }
  };

  //Delete item
  const handleDelete = async (itemID: string): Promise<void> => {
    const colRef = collection(firestore, ITEMS);
    try {
      await deleteDoc(doc(colRef, itemID));
    } catch (error) {
      console.error("Failed to delete the item to Firebase", error);
    }
  };

  //Add new item
  const handleSend = async (): Promise<void> => {
    if (!input.trim()) return;

    if (input.trim()) {
      try {
        const colRef = collection(firestore, ITEMS);
        await addDoc(colRef, {
          text: input,
          done: false,
          created: serverTimestamp(),
        });
        setInput("");
      } catch (error) {
        console.error("Failed to save the item to Firebase", error);
      }
    }
  };

  //Filter data
  const filteredItems = search.trim()
    ? items.filter((item) =>
        item.text.toLowerCase().includes(search.trim().toLocaleLowerCase())
      )
    : items;

  return (
    <>
      <MainAppbar title="Ostoslista" />
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.field}
            value={search}
            onChangeText={setSearch}
            label="Search items"
          />
        </View>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.field}
            value={input}
            onChangeText={setInput}
            label="Add"
          />
          <Button mode="text" onPress={handleSend}>
            Add
          </Button>
        </View>
        <SwipeListView
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.rowFront}>
              <Item
                id={item.id}
                text={item.text}
                done={item.done}
                handleUpdate={handleUpdate}
              />
            </View>
          )}
          renderHiddenItem={({ item }) => (
            //Show delete button when swiped to left.
            <View style={styles.rowBack}>
              <Button mode="contained" onPress={() => handleDelete(item.id)}>
                Delete
              </Button>
            </View>
          )}
          rightOpenValue={-120}
          disableRightSwipe
        ></SwipeListView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  rowFront: {
    backgroundColor: "#C3B1E1",
    borderBottomWidth: 1,
    borderColor: "#eee",
    padding: 16,
  },
  rowBack: {
    backgroundColor: "#E6DFF1",
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  field: {
    flex: 1,
    backgroundColor: "#fcfcfc",
    marginVertical: 4,
    marginHorizontal: 8,
  },
});

export default ShoppingListScreen;
