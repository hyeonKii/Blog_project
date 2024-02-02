import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContextProvider} from "context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AuthContextProvider>
        <Router>
            <App />
        </Router>
    </AuthContextProvider>
);
