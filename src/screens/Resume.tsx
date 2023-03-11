import { StyleSheet, View } from "react-native";
import Menu from "../components/Menu";

const Resume = () => {
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
