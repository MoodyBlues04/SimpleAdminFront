import React from "react";
import Api from "../classes/Api";

export default class Login extends React.Component {
    constructor(props) {
        super();
        this.api = new Api();
        this.setJwt = props.setJwt;
        this.setCredentials = props.setCredentials;
        this.state = {
            username: null,
            password: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        const loginResponse = await this.api.sendPost("login", this.state);
        console.log(loginResponse);
        this.setJwt(loginResponse["access_token"]);
        this.setCredentialsByState();
    }

    setCredentialsByState() {
        this.setCredentials(this.state);
    }

    render() {
        return (
            <div className="container" style={{ width: "30%" }}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            onChange={(e) =>
                                this.setState({ username: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={(e) =>
                                this.setState({ password: e.target.value })
                            }
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
