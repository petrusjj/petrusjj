import type { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = NativeStackNavigationProp<RootStack>;

export type RootStack = {
  public: NavigatorScreenParams<PublicStackParams>;
  protected: NavigatorScreenParams<ProtectedStackParams>;
};

export type PublicStackParams = {
  resume: undefined;
  auth: undefined;
};

export type ProtectedStackParams = {
  fitness: undefined;
};
