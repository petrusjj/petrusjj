import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../utils/firebase";

type IUseStorage = {
  downloadFromStorage: (fileName: string) => Promise<void>;
};

export default (): IUseStorage => {
  const handleStorageError = (error) => {
    switch (error.code) {
      case "storage/object-not-found":
        console.warn(`File doesn't exist`);
        break;
      case "storage/unauthorized":
        console.warn(`User doesn't have permission to access the object`);
        break;
      case "storage/canceled":
        console.warn("User canceled the upload");
        break;
      case "storage/unknown":
        console.warn("Unknown error occurred, inspect the server response");
        break;
    }
  };

  const downloadFromStorage = async (fileName: string) => {
    try {
      const reference = ref(storage, fileName);
      const url = await getDownloadURL(reference);
      const operation = await fetch(url);
      const response = await operation.json();
      return response;
    } catch (e) {
      handleStorageError(e);
    }
  };

  return { downloadFromStorage };
};
