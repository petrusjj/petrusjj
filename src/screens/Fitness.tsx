import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../providers/AuthProvider";

const Fitness = () => {
  const { currentUser } = useContext(AuthContext);

  const name = currentUser?.user?.displayName;

  return (
    <View style={styles.container}>
      <Text>{name || ""}</Text>
      {/* <Download /> */}
    </View>
  );
};

export default Fitness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
