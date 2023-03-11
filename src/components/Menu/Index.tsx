import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
import React from "react";
import Initializer from "../../screens/Initializer";

const Menu = () => {
  return (
    <WithSkiaWeb
      getComponent={() => import("./Menu")}
      fallback={<Initializer />}
    />
  );
};

export default Menu;
