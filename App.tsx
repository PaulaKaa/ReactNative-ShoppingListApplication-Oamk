import { PaperProvider } from "react-native-paper";
import ShoppingListScreen from "./screens/ShoppingListScreen";

export default function App() {
  return (
    <PaperProvider>
      <ShoppingListScreen />
    </PaperProvider>
  );
}