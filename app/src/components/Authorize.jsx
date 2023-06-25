import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useState } from "react";
import "./../style/Authorize.css";

export default function Authorize(props) {
    const setJwt = props["setJwt"];

    const [isLogin, setIsLogin] = useState(false);
    const handleLoginClick = (event) => {
        setIsLogin((current) => !current);
    };

    return (
        <div className="authorize-wrapper">
            <button onClick={handleLoginClick}>
                {isLogin ? "Sign up" : "Log in"}
            </button>

            {isLogin ? <Login setJwt={setJwt} /> : <Signup setJwt={setJwt} />}
        </div>
    );
}
