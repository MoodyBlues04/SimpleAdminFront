import React from "react";
import { Link } from "react-router-dom";
import "../style/Hoverable.css";

export default class ProfileEventItem extends React.Component {
    constructor(props) {
        super();
        this.event = props.event;
    }

    render() {
        return (
            <Link
                to={`/event/${this.event.id}`}
                style={{ textDecoration: "none", textAlign: "center" }}
                class="list-group-item hoverable"
            >
                <div>
                    {this.event.id} {this.event.header}
                </div>
            </Link>
        );
    }
}
