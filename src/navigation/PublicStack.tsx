import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import Resume from "../screens/Resume";

const Stack = createNativeStackNavigator<any>();

const PublicStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        title: "petrusjj",
      }}
      initialRouteName="resume"
    >
      <Stack.Screen name="resume" component={Resume} />
      <Stack.Screen name="auth" component={Auth} />
    </Stack.Navigator>
  );
};

export default PublicStack;
