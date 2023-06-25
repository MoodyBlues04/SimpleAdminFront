import React, { useState } from "react";
import Api from "../classes/api";

export default function Signup(props) {
    let setJwt = props["setJwt"];
    let api = new Api();

    let [username, setUsername] = useState();
    let [name, setName] = useState();
    let [surname, setSurname] = useState();
    let [birthday, setBirthday] = useState();
    let [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginResponse = await api.sendPost("user", {
            username,
            name,
            surname,
            birthday,
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
                <p>Name</p>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                <p>Surname</p>
                <input
                    type="text"
                    onChange={(e) => setSurname(e.target.value)}
                />
            </label>
            <label>
                <p>Birthday</p>
                <input
                    type="text"
                    onChange={(e) => setBirthday(e.target.value)}
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
