import {
    Canvas,
    Easing,
    Group,
    LinearGradient,
    mix,
    RoundedRect,
    runTiming,
    useComputedValue,
    useValue,
    vec
} from "@shopify/react-native-skia";
import Constants from "expo-constants";
import { useCallback } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const statusBarHeight = Constants.statusBarHeight;
const buttonWidth = 100;
const buttonHeight = statusBarHeight + 64;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272636",
    height: buttonHeight,
    alignItems: "stretch",
  },
  button: {
    height: buttonHeight,
    width: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  label: {
    paddingTop: statusBarHeight,
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

const buttons = [
  { label: "Resume" },
  { label: "Fitness" },
  //   { label: "Another" },
  //   { label: "Another" },
  //   { label: "Another" },
  //   { label: "Another" },
  //   { label: "Another" },
  //   { label: "Another" },
];

const Menu = () => {
  const transition = useValue(0);
  const flatlistOffset = useValue(0);

  const state = useValue({
    active: 0,
    next: 0,
  });

  const onScroll = useCallback((e: any) => {
    const { contentOffset } = e.nativeEvent;
    flatlistOffset.current = contentOffset.x;
  }, []);

  const transform = useComputedValue(() => {
    const { active, next } = state.current;
    console.log(flatlistOffset.current);
    return [
      {
        translateX:
          mix(transition.current, active * buttonWidth, next * buttonWidth) -
          flatlistOffset.current,
      },
    ];
  }, [state, transition, flatlistOffset]);

  const renderItem = useCallback(({ item, index }) => {
    const { label } = item;
    return (
      <TouchableOpacity
        key={index}
        style={styles.button}
        onPress={() => {
          state.current.active = state.current.next;
          state.current.next = index;
          transition.current = 0;
          runTiming(transition, 1, {
            duration: 250,
            easing: Easing.inOut(Easing.cubic),
          });
        }}
      >
        <Text style={styles.label}>{label}</Text>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Group transform={transform}>
          <RoundedRect
            r={0}
            x={0}
            y={0}
            height={buttonHeight}
            width={buttonWidth}
          >
            <LinearGradient
              colors={["#31CBD1", "#61E0A1"]}
              start={vec(0, 0)}
              end={vec(buttonWidth, buttonHeight)}
            />
          </RoundedRect>
        </Group>
      </Canvas>
      <FlatList
        onScroll={onScroll}
        horizontal
        data={buttons}
        renderItem={renderItem}
        keyExtractor={(_, index) => `button-${index}`}
      />
    </View>
  );
};

export default Menu;
