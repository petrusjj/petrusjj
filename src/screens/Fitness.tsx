import { useAtom } from "jotai";
import { StyleSheet, Text, View } from "react-native";
import { currentUserAtom } from "../store/jotai";

const Fitness = () => {
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

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
    alignItems: "center",
    justifyContent: "center",
  },
});
