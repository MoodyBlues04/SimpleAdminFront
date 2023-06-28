import React from "react";
import Api from "../classes/Api";
import LoadingSpinner from "./LoadingSpinner";

export default class Refresh extends React.Component {
    constructor(props) {
        super();
        this.state = props;
    }

    async refreshJwt() {
        const jwt = await this.getJwtByCredentials(this.state);
        console.log(jwt);
        this.state.setJwt(jwt);
    }

    async getJwtByCredentials() {
        let api = new Api();
        const loginResponse = await api.sendPost(
            "login",
            this.state.credentials
        );
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
