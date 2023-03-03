import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef: any = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
