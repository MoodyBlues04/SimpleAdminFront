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

    async logout() {
        await this.api.sendAuthorizedPost("logout");
        if (this.api.hasError()) {
            throw this.api.getError();
        }

        localStorage.clear();
        window.location.reload();
    }

    render() {
        return (
            <header className="Header">
                <Link
                    class="navbar-brand"
                    to="/"
                    style={{ marginLeft: "20px" }}
                >
                    <img
                        src="https://i.ibb.co/Y4C4Bn2/Home-icon-svg.png"
                        width="25"
                        height="25"
                    />
                </Link>
                <Link
                    className="header-link"
                    style={{
                        marginRight: "-1000px",
                        color: "black",
                    }}
                    to="/profile"
                >
                    {this.credentials.username}
                </Link>
                <a className="btn" onClick={(e) => this.logout(e)}>
                    Log out
                </a>
            </header>
        );
    }
}
