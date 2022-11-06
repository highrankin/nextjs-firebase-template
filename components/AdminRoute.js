import AuthContext from "../AuthContext.js";
import { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import app from "../fbApp";
const auth = getAuth(app);

export default function AdminRoute(props) {
  const { user } = useContext(AuthContext);
  const [admin, setAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    } else {
      checkAdmin();
    }
  }, []);

  async function checkAdmin() {
    let admin = await user
      .getIdTokenResult()
      .then((idTokenResult) => {
        return idTokenResult.claims.admin;
      })
      .catch((error) => {
        console.log(error);
      });
    setAdmin(admin);
  }

  if (admin) {
    return props.children;
  }
}
