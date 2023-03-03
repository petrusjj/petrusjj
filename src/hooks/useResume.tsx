import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { employmentsAtom } from "../store/jotai";
import useFirestore from "./core/useFirestore";

type IUseResume = {
  listEmployments: () => Promise<void>;
};

const useResume = (): IUseResume => {
  const { listCollection } = useFirestore();

  const setEmployments = useSetAtom(employmentsAtom);

  const listEmployments = useCallback(async () => {
    const { docs } = await listCollection("employments");
    const data = docs.reduce((memo: any, d: any) => {
      memo.push({ id: d.id, ...d.data() });
      return memo;
    }, []);
    setEmployments(data);
  }, []);

  return { listEmployments };
};

export default useResume;
