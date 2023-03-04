import { registerRootComponent } from "expo";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import "react-native-reanimated";
import App from "./src/App";
import "./src/utils/firebase";

LogBox.ignoreAllLogs();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
