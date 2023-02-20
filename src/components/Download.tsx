import React from "react";
import { Button, View } from "react-native";
import useStorage from "../hooks/useStorage";

export default () => {
  const { downloadFromStorage } = useStorage();

  const onPress = async () => {
    const fileName = "fithero-backup-2023-02-19.json";
    const data = await downloadFromStorage(fileName);
    console.log("data", data);
  };

  return (
    <View>
      <Button title="Download" onPress={onPress} />
    </View>
  );
};
