import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator<any>();

const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: "petrusjj",
      }}
      initialRouteName="home"
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default PublicStack;
