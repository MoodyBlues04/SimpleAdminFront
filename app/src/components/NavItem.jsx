import React from "react";
import "../style/NavBar.css";
import { Link } from "react-router-dom";

export default class NavItem extends React.Component {
    constructor(props) {
        super();
        this.event = props.event;
    }

    render() {
        return (
            <Link
                className="NavItem"
                key={this.event.id}
                to={`/event/${this.event.id}`}
            >
                {this.event.id} {this.event.header}
            </Link>
        );
    }
}
