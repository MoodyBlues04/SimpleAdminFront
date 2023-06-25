import React from "react";
import Api from "../classes/api";

export default class Signup extends React.Component {
    constructor(setJwt) {
        super();
        this.api = new Api();
        this.setJwt = setJwt;
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
        const loginResponse = await this.api.sendPost("user", {
            username: this.state.username,
            name: this.state.name,
            surname: this.state.surname,
            birthday: this.state.birthday,
            password: this.state.password,
        });
        this.setJwt(loginResponse["access_token"]);
    }

    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            this.setState({ username: e.target.value })
                        }
                    />
                </label>
                <label>
                    <p>Name</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            this.setState({ name: e.target.value })
                        }
                    />
                </label>
                <label>
                    <p>Surname</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            this.setState({ surname: e.target.value })
                        }
                    />
                </label>
                <label>
                    <p>Birthday</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            this.setState({ birthday: e.target.value })
                        }
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={(e) =>
                            this.setState({ password: e.target.value })
                        }
                    />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        );
    }
}
