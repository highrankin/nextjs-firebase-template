import AuthContext from "../AuthContext.js";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute(props) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, []);

  if (user) {
    return props.children;
  }
}
