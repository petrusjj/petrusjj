import { httpsCallable } from "firebase/functions";
import { useEffect } from "react";
import { functions } from "../../utils/firebase";

export default () => {
  useEffect(() => {
    //   init();
  }, []);

  const init = async () => {
    const helloWorld = httpsCallable(functions, "helloWorld");
    const { data } = await helloWorld();
  };

  return {};
};
