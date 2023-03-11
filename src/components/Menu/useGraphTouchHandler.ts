import { useTouchHandler } from "@shopify/react-native-skia";

export const useGraphTouchHandler = () => {
  console.log("useGraphTouchHandler hook");

  const onTouch = useTouchHandler({
    onStart: (props) => {
      console.log("useGraphTouchHandler onStart", props);
    },
    onActive: (props) => {
      console.log("useGraphTouchHandler onActive", props);
    },
    onEnd: (props) => {
      console.log("useGraphTouchHandler onEnd", props);
    },
  });
  return onTouch;
};
