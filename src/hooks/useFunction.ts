
import { getFunctions, httpsCallable } from "firebase/functions";
import { useEffect } from "react";

const functions = getFunctions();

export default () => {
  useEffect(() => {
    setTimeout(() => {
      //   init();
    }, 2000);
  }, []);

  const init = async () => {
    const helloWorld = httpsCallable(functions, "helloWorld");
    const { data } = await helloWorld();
    console.log(data);
  };

  return {};
};
