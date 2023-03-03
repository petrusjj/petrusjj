import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  QuerySnapshot
} from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../../utils/firebase";

type IUseFirestore = {
  listCollection: (
    table: string
  ) => Promise<QuerySnapshot<DocumentData>> | null;
  addDocument: (table: string, payload: object) => Promise<any>;
};

const useFirestore = (): IUseFirestore => {
  const listCollection = useCallback(async (table: string) => {
    try {
      return getDocs(collection(db, table));
    } catch (e) {
      console.warn(e);
      return null;
    }
  }, []);

  const addDocument = useCallback(async (table: string, payload: object) => {
    try {
      return addDoc(collection(db, table), payload);
    } catch (e) {
      console.warn("Error adding document: ", e);
      return null;
    }
  }, []);

  return {
    listCollection,
    addDocument,
  };
};

export default useFirestore;
