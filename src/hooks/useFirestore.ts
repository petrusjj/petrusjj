import { addDoc, collection, getDocs } from "firebase/firestore";
import { useCallback } from "react";
import { db } from "../utils/firebase";

type IUseFirestore = {
  addDocument: () => Promise<any>;
  listEmployments: () => Promise<any>;
};

const useFirestore = (): IUseFirestore => {
  const listEmployments = async () => {
    const querySnapshot = await getDocs(collection(db, "employments"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
    });
  };

  const addDocument = useCallback(async () => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }, []);

  return {
    addDocument,
    listEmployments,
  };
};

export default useFirestore;
