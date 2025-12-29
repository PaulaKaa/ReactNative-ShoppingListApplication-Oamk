import { initializeApp } from "firebase/app"; //npx expo install firebase
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore: Firestore = getFirestore(app);

const ITEMS: string = "items";

export {
  firestore,
  collection,
  addDoc,
  ITEMS,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc
};