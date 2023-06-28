import React from "react";
import Api from "../classes/Api";

export default class Signup extends React.Component {
    constructor(props) {
        super();
        this.api = new Api();
        this.setJwt = props.setJwt;
        this.setCredentials = props.setCredentials;
        this.state = {
            username: null,
            name: null,
            surname: null,
            birthday: null,
            password: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        const loginResponse = await this.api.sendPost("user", this.state);
        if (this.api.hasError()) {
            throw this.api.getError();
        }

        this.setJwt(loginResponse.access_token);
        this.setCredentialsByState();
    }

    setCredentialsByState() {
        this.setCredentials({
            username: this.state.username,
            password: this.state.password,
        });
    }

    render() {
        return (
            <div className="container" style={{ width: "30%" }}>
                <h3>Sign up</h3>
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
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter name"
                            onChange={(e) =>
                                this.setState({ name: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="surname"
                            placeholder="Enter surname"
                            onChange={(e) =>
                                this.setState({ surname: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            type="text"
                            className="form-control"
                            id="birthday"
                            placeholder="Enter birthday"
                            onChange={(e) =>
                                this.setState({ birthday: e.target.value })
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
                    <div>
                        <button
                            className="btn btn-primary"
                            type="submit"
                            style={{ marginTop: "10px" }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
