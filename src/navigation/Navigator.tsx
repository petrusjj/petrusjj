import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect } from "react";
import Header from "../components/Header";
import { AuthContext } from "../providers/AuthProvider";
import Initializer from "../screens/Initializer";
import { navigationRef } from "./NavigationRef";
import ProtectedStack from "./ProtectedStack";
import PublicStack from "./PublicStack";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    initializer: {
      screens: {
        initializer: {
          path: "",
        },
      },
    },
    public: {
      screens: {
        resume: {
          path: "resume",
        },
        auth: {
          path: "auth",
        },
      },
    },
    protected: {
      screens: {
        fitness: {
          path: "fitness",
        },
      },
    },
  },
};

const linking = {
  prefixes: ["https://petrusjj.com", "petrusjj://"],
  config,
};

const Navigator = () => {
  const { hydrating, currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!hydrating) {
      navigationRef.navigate(currentUser ? "protected" : "public", {
        screen: currentUser ? "fitness" : "resume",
      });
    }
  }, [hydrating]);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />,
        }}
        initialRouteName="initializer"
      >
        <Stack.Screen name="initializer" component={Initializer} />
        <Stack.Screen name="public" component={PublicStack} />
        {currentUser ? (
          <Stack.Screen name="protected" component={ProtectedStack} />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
