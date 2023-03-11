import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import React from "react";
import Loader from "../Loader";

const Menu = () => {
  return (
    <WithSkiaWeb getComponent={() => import("./Menu")} fallback={<Loader />} />
  );
};

export default Menu;
