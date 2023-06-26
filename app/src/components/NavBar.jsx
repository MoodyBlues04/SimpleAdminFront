import React from "react";
import "./../style/NavBar.css";
import Api from "../classes/Api";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
    constructor(props) {
        // TODO get from storage ?
        super();
        this.api = new Api(props["jwt"]);
        this.state = {
            events: [],
        };
    }

    async componentDidMount() {
        this.setState({ events: await this.getEvents() });
    }

    async getEvents() {
        return await this.api.sendAuthorizedGet("event");
    }

    render() {
        return (
            <div className="NavBar col-3">
                <h4 style={{ marginTop: "10px" }}>Events:</h4>
                {this.state.events.map(function (event, i) {
                    return <NavItem event={event} />;
                })}
                <Link to="event/create" style={{ marginTop: "10px" }}>
                    Create new Event
                </Link>
            </div>
        );
    }
}
