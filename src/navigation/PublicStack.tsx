import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import Resume from "../screens/Resume";

const Stack = createNativeStackNavigator();

const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="resume"
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="resume"
        component={Resume}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="auth"
        component={Auth}
      />
    </Stack.Navigator>
  );
};

export default PublicStack;
