import {
  Canvas, Group, LinearGradient, Path, useComputedValue, useValue, vec
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { Cursor } from "./components/Cursor";
import { Header } from "./components/Header";
import { Label } from "./components/Label";
import { List } from "./components/List";
import { Selection } from "./components/Selection";
import { useGraphTouchHandler } from "./components/useGraphTouchHandler";
import { getYForX } from "./Math";
import { COLORS, getGraph, PADDING } from "./Model";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F1D2B",
  },
});

export const Wallet = () => {
  const window = useWindowDimensions();
  const { width } = window;
  const height = Math.min(window.width, window.height) / 2;
  const translateY = height + PADDING;
  const graphs = useMemo(() => getGraph(width, height), [width, height]);
  // animation value to transition from one graph to the next
  const transition = useValue(0);
  // indicices of the current and next graphs
  const state = useValue({
    next: 0,
    current: 0,
  });
  // path to display
  const path = useComputedValue(() => {
    const { current, next } = state.current;
    const start = graphs[current].data.path;
    const end = graphs[next].data.path;
    return end.interpolate(start, transition.current)!;
  }, [state, transition]);
  // x and y values of the cursor
  const x = useValue(0);
  const y = useComputedValue(
    () => getYForX(path.current.toCmds(), x.current),
    [x, path]
  );
  const onTouch = useGraphTouchHandler(x, y, width, height);
  return (
    <View style={styles.container}>
      <Header />
      <Canvas style={{ width, height: 2 * height + 30 }} onTouch={onTouch}>
        <Label
          state={state}
          y={y}
          graphs={graphs}
          width={width}
          height={height}
        />
        <Group transform={[{ translateY }]}>
          <Path
            style="stroke"
            path={path}
            strokeWidth={4}
            strokeJoin="round"
            strokeCap="round"
          >
            <LinearGradient
              start={vec(0, 0)}
              end={vec(width, 0)}
              colors={COLORS}
            />
          </Path>
          <Cursor x={x} y={y} width={width} />
        </Group>
      </Canvas>
      <Selection state={state} transition={transition} graphs={graphs} />
      <List />
    </View>
  );
};
