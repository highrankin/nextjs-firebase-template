import { useState, useEffect } from "react";
import app from "../fbApp";
import { getFirestore, setDoc, getDoc, deleteDoc } from "firebase/firestore";
const db = getFirestore(app);

export default function useDocument({ path }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDocument();
  }, []);

  async function getDocument() {
    setLoading(true);
    await getDoc(doc(db, path)).then((doc) => {
      const newData = [];
      newData.push({ id: doc.id, ...doc.data() });
      setData(newData);
      setLoading(false);
    });
  }

  async function addDocument(data) {
    await setDoc(doc(db, path, data.id), data);
  }

  async function deleteDocument(id) {
    await deleteDoc(doc(db, path, id));
  }

  return { data, loading, addDocument, deleteDocument };
}
