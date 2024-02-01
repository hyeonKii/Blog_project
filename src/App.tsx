import { useState } from "react";
import { app } from "firebaseApp";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./components/Router";

function App() {
  const auth = getAuth(app);

  const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);
    return (
        <>
        <ToastContainer />
          <Router isAuth={isAuth}/> 
        </>
    );
}

export default App;
