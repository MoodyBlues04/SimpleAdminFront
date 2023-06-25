import React, { useState } from "react";
import Api from "../classes/api";

export default function Login(props) {
    let api = new Api();
    let setJwt = props["setJwt"];

    let [username, setUsername] = useState();
    let [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await api.sendPost("login", {
            username,
            password,
        });
        setJwt(loginResponse["access_token"]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <p>Username</p>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </label>
            <label>
                <p>Password</p>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
