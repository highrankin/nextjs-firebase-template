import { useState, useEffect } from "react";
import app from "../fbApp";
import { getFirestore, collection, setDoc, getDocs, deleteDoc } from "firebase/firestore";
const db = getFirestore(app);

export default function useCollection({ path, query = null }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollection();
  }, [path]);

  async function getCollection() {
    setLoading(true);
    await getDocs(query ? query : collection(db, path)).then((snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push({ id: doc.id, ...doc.data() });
      });
      setData(newData);
      setLoading(false);
    });
  }

  async function addDocument(data) {
    await setDoc(doc(db, path, data.id), data);
    getCollection();
  }

  async function deleteDocument(id) {
    await deleteDoc(doc(db, path, id));
    getCollection();
  }

  return { data, loading, addDocument, deleteDocument };
}
