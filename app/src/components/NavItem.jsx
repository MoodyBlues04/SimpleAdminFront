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
            <div className="NavItem" key={this.event.id}>
                <Link
                    to={`/event/${this.event.id}`}
                    style={{ textDecoration: "none" }}
                >
                    <div>
                        {this.event.id} {this.event.header}
                    </div>
                </Link>
            </div>
        );
    }
}
