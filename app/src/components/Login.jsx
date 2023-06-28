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
            rememberCredentials: false,
        };
    }

    async handleSubmit(e) {
        try {
            e.preventDefault();
            const loginResponse = await this.login();
            if (this.api.hasError()) {
                throw this.api.getError();
            }

            this.setJwt(loginResponse.access_token);
            this.setCredentials(
                this.state,
                this.getCredentialsExpirationTime()
            );
        } catch (error) {
            throw error;
        }
    }

    async login() {
        return this.api.sendPost("login", {
            username: this.state.username,
            password: this.state.password,
        });
    }

    /**
     * @returns expiration time in seconds
     */
    getCredentialsExpirationTime() {
        return this.rememberCredentials ? 3600 * 24 * 10 : 3600;
    }

    render() {
        return (
            <div className="container" style={{ width: "30%" }}>
                <h3>Log in</h3>
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
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            onChange={(e) =>
                                this.setState({
                                    rememberCredentials:
                                        !this.state.rememberCredentials,
                                })
                            }
                        />
                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        >
                            Remember me
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                    >
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
