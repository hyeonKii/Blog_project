import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContextProvider} from "context/AuthContext.tsx";
import {ThemeContextProvider} from "context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeContextProvider>
        <AuthContextProvider>
            <Router>
                <App />
            </Router>
        </AuthContextProvider>
    </ThemeContextProvider>
);
