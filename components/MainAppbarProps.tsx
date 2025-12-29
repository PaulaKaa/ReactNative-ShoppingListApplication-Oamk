import React from "react";
import { Appbar } from "react-native-paper"; //npm install react-native-paper AND npm install react-native-safe-area-context
interface MainAppbarProps {
  title: string;
}
const MainAppbar: React.FC<MainAppbarProps> = ({ title }) => {
  return (
    <Appbar.Header mode="center-aligned" elevated={true}>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};
export default MainAppbar;
