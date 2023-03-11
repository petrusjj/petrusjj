import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { StyleSheet, View } from "react-native";
import Loader from "../components/Loader";

const Resume = () => {
  return (
    <View style={styles.container}>
      <WithSkiaWeb
        getComponent={() => import("../components/Menu/Menu")}
        fallback={<Loader />}
      />
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
