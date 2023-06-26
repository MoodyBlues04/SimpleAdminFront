import React from "react";
import Api from "../classes/Api";
import ProfileEventItem from "./ProfileEventItem";

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

    getCreatedEventsList() {
        if (!this.state.profile.created_events) {
            return;
        }
        return this.state.profile.created_events.map(function (event, idx) {
            return <ProfileEventItem event={event} />;
        });
    }

    getJoinedEventsList() {
        if (!this.state.profile.joined_events) {
            return;
        }
        return this.state.profile.joined_events.map(function (event, idx) {
            return <ProfileEventItem event={event} />;
        });
    }

    render() {
        return (
            <div
                className="card"
                style={{ width: "22rem", height: "auto", marginTop: "20px" }}
            >
                <div className="card-body" style={{ marginBottom: "15px" }}>
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
                <div class="card-header">Created events:</div>
                <ul class="list-group list-group-flush">
                    {this.getCreatedEventsList()}
                </ul>
                <div class="card-header">Joined events:</div>
                <ul class="list-group list-group-flush">
                    {this.getJoinedEventsList()}
                </ul>
            </div>
        );
    }
}
