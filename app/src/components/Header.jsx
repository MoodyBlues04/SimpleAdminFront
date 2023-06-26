import React from "react";
import "../style/Header.css";
import Api from "../classes/Api";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super();
        this.api = new Api(props.jwt);
        this.credentials = props.credentials;
        this.setCredentials = props.setCredentials;
    }

    logout() {
        this.api.sendAuthorizedPost("logout");
        localStorage.clear();
        window.location.reload(false);
    }

    render() {
        return (
            <header className="Header">
                <Link
                    style={{
                        marginRight: "25px",
                        color: "black",
                    }}
                    to="/profile"
                >
                    {this.credentials.username}
                </Link>
                <button className="btn" onClick={(e) => this.logout(e)}>
                    Log out
                </button>
            </header>
        );
    }
}
