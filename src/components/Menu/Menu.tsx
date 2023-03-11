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
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

const buttonWidth = 100;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#272636",
    flexDirection: "row",
  },
  button: {
    height: 64,
    width: buttonWidth,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  label: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});

const buttons = ["Resume", "Fitness", "Travel"];

const Menu = () => {
  const transition = useValue(0);

  const state = useValue({
    active: 0,
    next: 0,
  });

  const transform = useComputedValue(() => {
    const { active, next } = state.current;
    return [
      {
        translateX: mix(
          transition.current,
          active * buttonWidth,
          next * buttonWidth
        ),
      },
    ];
  }, [state, transition]);

  return (
    <View style={styles.container}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Group transform={transform}>
          <RoundedRect x={0} y={0} height={64} width={buttonWidth}>
            <LinearGradient
              colors={["#31CBD1", "#61E0A1"]}
              start={vec(0, 0)}
              end={vec(buttonWidth, 64)}
            />
          </RoundedRect>
        </Group>
      </Canvas>
      {buttons.map((button, index) => (
        <TouchableWithoutFeedback
          key={index}
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
          <View style={styles.button}>
            <Text style={styles.label}>{button}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default Menu;
