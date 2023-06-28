import React from "react";
import withRouter from "./WithRouter";
import Api from "../classes/Api";
import EventJoinedUser from "./EventJoinedUser";
import LoadingSpinner from "./LoadingSpinner";

class Event extends React.Component {
    constructor(props) {
        super();
        this.credentials = props.credentials;
        this.state = {
            api: new Api(props.jwt),
            event: null,
        };
    }

    async componentDidMount() {
        await this.setEvent();
    }

    async componentDidUpdate(prevProps) {
        if (this.props.params.id !== prevProps.params.id) {
            await this.setEvent();
        }
    }

    async getEvent() {
        return this.state.api.sendAuthorizedGet(
            `event/${this.props.params.id}`
        ); // TODO event class
    }

    async joinEvent() {
        await this.state.api.sendAuthorizedPost(
            `event/${this.state.event.id}/join`
        );
        await this.setEvent();
    }

    async cancelEvent() {
        await this.state.api.sendAuthorizedPost(
            `event/${this.state.event.id}/cancel`
        );
        await this.setEvent();
    }

    async deleteEvent() {
        await this.state.api.sendAuthorizedDelete(
            `event/${this.state.event.id}`
        );
        window.location.href = "../../";
    }

    async setEvent() {
        this.setState({ event: await this.getEvent() });
    }

    isAlreadyJoinedEvent() {
        if (!this.state.event.joined_users) {
            return false;
        }

        let joinedUsers = this.state.event.joined_users;
        for (let i = 0; i < joinedUsers.length; i++) {
            if (joinedUsers[i].username === this.credentials.username) {
                return true;
            }
        }

        return false;
    }

    isEventCreator() {
        if (!this.state.event.creator) {
            return false;
        }

        return this.credentials.username === this.state.event.creator.username;
    }

    getJoinEventButton() {
        if (this.isAlreadyJoinedEvent()) {
            return (
                <button
                    className="btn btn-danger"
                    style={{ position: "absolute", bottom: 10 }}
                    onClick={(e) => this.cancelEvent()}
                >
                    Cancel
                </button>
            );
        }
        return (
            <button
                className="btn btn-primary"
                onClick={(e) => this.joinEvent()}
                style={{ position: "absolute", bottom: 10 }}
            >
                Join
            </button>
        );
    }

    getDeleteEventButton() {
        if (!this.isEventCreator()) {
            return;
        }

        return (
            <button
                className="btn btn-danger"
                style={{ position: "absolute", bottom: 10, left: 90 }}
                onClick={(e) => this.deleteEvent()}
            >
                Delete
            </button>
        );
    }

    getJoinedUsersList() {
        if (!this.state.event.joined_users) {
            return;
        }
        return this.state.event.joined_users.map(function (user, idx) {
            return <EventJoinedUser user={user} />;
        });
    }

    render() {
        if (this.state.api.hasError()) {
            throw this.state.api.getError();
        }

        if (!this.state.event) {
            return <LoadingSpinner />;
        }

        return (
            <div
                className="card"
                style={{ width: "18rem", height: "300px", marginTop: "20px" }}
            >
                <div className="card-body">
                    <h5 className="card-title">{this.state.event.header}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                        {this.state.event.id}
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                        Creator: {this.state.event.creator.username}
                    </h6>
                    <p className="card-text">{this.state.event.text}</p>

                    <div class="card-header">Joined users:</div>
                    <ul class="list-group list-group-flush">
                        {this.getJoinedUsersList()}
                    </ul>

                    {this.getJoinEventButton()}
                    {this.getDeleteEventButton()}
                </div>
            </div>
        );
    }
}

export default withRouter(Event);
