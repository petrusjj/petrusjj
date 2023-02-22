import { AntDesign } from "@expo/vector-icons";
import { getPathFromState, NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback, useContext, useEffect } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { AuthContext } from "../providers/AuthProvider";
import { navigationRef } from "./NavigationRef";
import ProtectedStack from "./ProtectedStack";
import PublicStack from "./PublicStack";

const Stack = createNativeStackNavigator();

const Initializer = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

const Header = () => {
  const { navigate } = useNavigation();

  const { currentUser, logout } = useContext(AuthContext);

  const navigateToResume = useCallback(() => {
    navigate("public", { screen: "resume" });
  }, []);

  const navigateToFitness = () => {
    console.log("NAVIGATE TO PROTECTED", currentUser);
    navigate(currentUser ? "protected" : "public", {
      screen: currentUser ? "fitness" : "auth",
    });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={navigateToResume}>
        <Text>Resume</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={navigateToFitness}>
        <Text>Fitness</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      {currentUser ? (
        <AntDesign.Button
          name="google"
          backgroundColor="#EE4B2B"
          onPress={logout}
        >
          Logout
        </AntDesign.Button>
      ) : null}
    </View>
  );
};

const config = {
  screens: {
    public: {
      path: "public",
    },
    protected: {
      path: "protected",
    },
    initializer: {
      path: "initializer",
    },
    resume: {
      path: "resume",
    },
    auth: {
      path: "auth",
    },
    fitness: {
      path: "fitness",
    },
  },
};

const linking = {
  prefixes: ["https://petrusjj.com", "petrusjj://"],
  config,
  getPathFromState: (state, options) => {
    const cleanState = {
      ...state,
      routes: state.routes.map((route) => {
        if (!route.params) {
          return route;
        }

        const cleanParams = {};
        for (const param in route.params) {
          const value = route.params[param];
          if (typeof value !== "object" && typeof value !== "function") {
            cleanParams[param] = value;
          }
        }
        return {
          ...route,
          params: cleanParams,
        };
      }),
    };
    return getPathFromState(cleanState, options); //imported from @react-navigation/native
  },
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

  console.log("render navigator", currentUser);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          header: () => <Header />,
        }}
        initialRouteName={"initializing"}
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="initializing"
          component={Initializer}
        />
        <Stack.Screen options={{}} name="public" component={PublicStack} />
        {currentUser ? (
          <Stack.Screen
            options={{}}
            name="protected"
            component={ProtectedStack}
          />
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: 80,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CCCCCC",
  },
  button: {
    marginRight: 32,
  },
  spacer: {
    flex: 1,
  },
});
