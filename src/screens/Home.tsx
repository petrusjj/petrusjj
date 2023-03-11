import { StyleSheet, View } from "react-native";
import Menu from "../components/Menu/Index";

const Home = () => {
  return (
    <View style={styles.container}>
      <Menu />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
