import React from "react";
import "../style/Header.css";
import Api from "../classes/Api";

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
                <div style={{ marginRight: "25px" }}>
                    {this.credentials.username}
                </div>
                <button className="btn" onClick={(e) => this.logout(e)}>
                    Log out
                </button>
            </header>
        );
    }
}
