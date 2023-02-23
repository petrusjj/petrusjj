import { atomWithStorage } from "jotai/utils";

export const currentUserAtom: any = atomWithStorage("currentUser", false);
