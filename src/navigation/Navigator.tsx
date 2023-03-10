import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { useAtom } from "jotai";
import { loadable } from "jotai/utils";
import Initializer from "../screens/Initializer";
import { currentUserAtom } from "../store/jotai";
import { RootStack } from "../types/navigation";
import { navigationRef } from "./NavigationRef";
import ProtectedStack from "./ProtectedStack";
import PublicStack from "./PublicStack";

const Stack = createNativeStackNavigator<RootStack>();

const config: any = {
  screens: {
    public: {
      screens: {
        home: {
          path: "",
        },
        auth: {
          path: "auth",
        },
      },
    },
    protected: {
      screens: {
        admin: {
          path: "admin",
        },
      },
    },
  },
};

const linking = {
  prefixes: ["https://petrusjj.com", "petrusjj://"],
  config,
};

const loadableAtom = loadable(currentUserAtom);

const Navigator = () => {
  const [user] = useAtom<any>(loadableAtom);

  const currentUser = user?.data;

  let [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_400Regular,
  });

  if (!fontsLoaded) return <Initializer />;

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="public"
      >
        <Stack.Screen name="public" component={PublicStack} />
        {currentUser ? (
          <Stack.Screen name="protected" component={ProtectedStack} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
