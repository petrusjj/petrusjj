import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Admin from "../screens/Admin";

const Stack = createNativeStackNavigator<any>();

const ProtectedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: "petrusjj",
      }}
    >
      <Stack.Screen name="admin" component={Admin} />
    </Stack.Navigator>
  );
};

export default ProtectedStack;
