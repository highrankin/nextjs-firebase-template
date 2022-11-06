import React from "react";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function useStorage({ path }) {
  const [downloadURL, setDownloadURL] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [uploading, setUploading] = React.useState(false);

  async function upload() {
    const storage = getStorage();
    const fileRef = ref(storage, path + "/" + file[0].name);
    const uploadTask = uploadBytesResumable(fileRef, file[0]);
    setUploading(true);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(parseInt(progress));
      },
      (error) => {
        setError(error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setDownloadURL(downloadURL);
          setUploading(false);
        });
      }
    );
  }

  return { upload, downloadURL, error, progress, uploading };
}
