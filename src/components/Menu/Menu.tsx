import { Canvas, Circle } from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { useGraphTouchHandler } from "./useGraphTouchHandler";

const Menu = () => {
  const window = useWindowDimensions();
  const { width, height } = window;

  const canvasStyling = {
    width: width / 2,
    height: height / 2,
    backgroundColor: "green",
  };

  const onTouch = useGraphTouchHandler();

  return (
    <View style={styles.container}>
      <Canvas style={canvasStyling} onTouch={onTouch}>
        <Circle r={50} cx={50} cy={50} color="red" />
      </Canvas>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
