import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import { useAtomValue } from "jotai";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import useResume from "../hooks/useResume";
import { employmentsAtom } from "../store/jotai";

const Resume = () => {
  const { listEmployments } = useResume();

  const employments = useAtomValue(employmentsAtom);

  console.log("render employments", employments);

  const renderEmployment = useCallback(({ item }) => {
    const { name } = item;
    return (
      <View>
        <Text>{name}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <WithSkiaWeb
        getComponent={() => import("./Breathe")}
        fallback={<Text style={{ textAlign: "center" }}>Loading Skia...</Text>}
      />
      <Text>Hallo</Text>
      {/* <TouchableOpacity onPress={listEmployments}>
        <Text>Test</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={employments}
          renderItem={renderEmployment}
          keyExtractor={(item) => item.id}
        />
      </View> */}
    </View>
  );
};

export default Resume;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
});
