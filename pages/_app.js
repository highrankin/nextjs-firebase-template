import "../styles/globals.css";
import { AuthProvider } from "../AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer autoClose={1000} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
