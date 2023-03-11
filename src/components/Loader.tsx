import React from "react";
import { ActivityIndicator, View } from "react-native";

type Props = {};

const Loader = (props: Props) => {
  return (
    <View>
      <ActivityIndicator size="small" color="black" />
    </View>
  );
};

export default Loader;
