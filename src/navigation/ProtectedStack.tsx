import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Fitness from "../screens/Fitness";

const Stack = createNativeStackNavigator();

const ProtectedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"auth"}
    >
      <Stack.Screen name="fitness" component={Fitness} />
    </Stack.Navigator>
  );
};

export default ProtectedStack;
