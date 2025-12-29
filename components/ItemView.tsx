import * as React from "react";
import { Pressable, Text } from "react-native";

interface ItemProps {
  id: string;
  text: string;
  done: boolean;
  handleUpdate: (id: string, done: boolean) => void;
}

const Item: React.FC<ItemProps> = ({ id, text, done, handleUpdate }) => {
  return (
    <Pressable onPress={() => handleUpdate(id, done)}>
      <Text
        style={{
          textDecorationLine: done ? "line-through" : "none",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Item;
