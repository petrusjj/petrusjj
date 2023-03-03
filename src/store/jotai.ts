import AsyncStorage from "@react-native-async-storage/async-storage";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage(() => AsyncStorage);

export const currentUserAtom = atomWithStorage<unknown | false>(
  "currentUser",
  false,
  storage
);

export const employmentsAtom = atomWithStorage<any>("employments", [], storage);
