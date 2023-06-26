import React from "react";
import Api from "../classes/Api";

export default class Profile extends React.Component {
    constructor(props) {
        super();
        this.api = new Api(props.jwt);
        this.state = {
            profile: {},
        };
    }

    async componentDidMount() {
        this.setState({ profile: await this.getProfile() });
    }

    async getProfile() {
        return await this.api.sendAuthorizedGet("profile");
    }

    render() {
        return (
            <div
                className="card"
                style={{ width: "22rem", height: "300px", marginTop: "20px" }}
            >
                <div className="card-body">
                    <h5 className="card-title">
                        {this.state.profile.username}
                    </h5>
                    <p className="card-text">
                        <div>Name: {this.state.profile.name}</div>
                        <div>Surname: {this.state.profile.surname}</div>
                        <div>
                            Birthday:{" "}
                            {this.state.profile.birthday ||
                            !this.state.profile.username
                                ? this.state.profile.birthday
                                : "not set"}
                        </div>
                    </p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <a href="#" className="card-link">
                            Card link
                        </a>
                    </li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Vestibulum at eros</li>
                </ul>
            </div>
        );
    }
}
