import {useState, useEffect} from "react";
import {app} from "firebaseApp";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./components/Router";
import Loader from "components/Loader";

function App() {
    const auth = getAuth(app);

    const [init, setInit] = useState<boolean>(false);

    const [isAuth, setIsAuth] = useState<boolean>(!!auth?.currentUser);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            setInit(true);
        });
    }, [auth]);

    return (
        <>
            <ToastContainer />
            {init ? <Router isAuth={isAuth} /> : <Loader />}
        </>
    );
}

export default App;
