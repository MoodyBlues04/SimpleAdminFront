import React from "react";
import withRouter from "./WithRouter";
import Api from "../classes/Api";

class Event extends React.Component {
    constructor(props) {
        super();
        this.credentials = props.credentials;
        this.api = new Api(props.jwt);
        this.state = {
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
        return this.api.sendAuthorizedGet(`event/${this.props.params.id}`); // TODO event class
    }

    async joinEvent() {
        this.api.sendAuthorizedPost(`event/${this.state.event.id}/join`);
        await this.setEvent();
        window.location.reload();
    }

    async cancelEvent() {
        this.api.sendAuthorizedPost(`event/${this.state.event.id}/cancel`);
        await this.setEvent();
        window.location.reload();
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
            if (joinedUsers[i].username == this.credentials.username) {
                return true;
            }
        }

        return false;
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

    render() {
        if (!this.state.event) {
            // TODO так же везде. а лучше загрузку
            return <div></div>;
        }

        console.log(this.state.event);

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
                    {this.getJoinEventButton()}
                </div>
            </div>
        );
    }
}

export default withRouter(Event);
