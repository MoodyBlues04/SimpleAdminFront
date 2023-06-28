import React from "react";
import "./../style/NavBar.css";
import Api from "../classes/Api";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

export default class NavBar extends React.Component {
    constructor(props) {
        super();
        this.state = {
            api: new Api(props.jwt),
            events: [],
            hasErrors: false,
        };
    }

    async componentDidMount() {
        let events = await this.getEvents();
        if (events == null) {
            return;
        }

        this.setState({ events: await this.getEvents() });
    }

    async getEvents() {
        let result = await this.state.api.sendAuthorizedGet("event");
        if (this.state.api.hasError()) {
            this.setState({ hasErrors: true });
            return;
        }

        return result;
    }

    getNavItems() {
        if (this.state.events.length === 0) {
            return <LoadingSpinner />;
        }

        return this.state.events.map(function (event, i) {
            return <NavItem event={event} />;
        });
    }

    render() {
        if (this.state.api.hasError()) {
            throw this.state.api.getError();
        }

        return (
            <div className="NavBar col-3">
                <h4 style={{ marginTop: "10px" }}>Events:</h4>
                {this.getNavItems()}
                <Link className="link" to="event/create">
                    Create new Event
                </Link>
            </div>
        );
    }
}
