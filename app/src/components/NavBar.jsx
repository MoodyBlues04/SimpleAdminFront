import React from "react";
import "./../style/NavBar.css";
import Api from "../classes/Api";
import NavItem from "./NavItem";

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
                <h4>Events</h4>
                {this.state.events.map(function (event, i) {
                    return <NavItem event={event} />;
                })}
            </div>
        );
    }
}
