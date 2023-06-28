import React from "react";
import Api from "../classes/Api";
import LoadingSpinner from "./LoadingSpinner";

export default class Refresh extends React.Component {
    constructor(props) {
        super();
        this.state = props;
        this.api = new Api();
    }

    async refreshJwt() {
        const jwt = await this.getJwtByCredentials(this.state);
        this.state.setJwt(jwt);
    }

    async getJwtByCredentials() {
        const loginResponse = await this.api.sendPost(
            "login",
            this.state.credentials
        );

        if (this.api.hasError()) {
            throw this.api.getError();
        }

        return loginResponse.access_token;
    }

    render() {
        this.refreshJwt();
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <div style={{ marginTop: "280px" }}>
                    <LoadingSpinner />
                </div>
            </div>
        );
    }
}
