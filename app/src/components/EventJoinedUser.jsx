import React from "react";

export default class EventJoinedUser extends React.Component {
    constructor(props) {
        super();
        this.user = props.user;
    }

    render() {
        return (
            <div
                style={{ textDecoration: "none", textAlign: "center" }}
                class="list-group-item"
            >
                <div>
                    {this.user.id} {this.user.username}
                </div>
            </div>
        );
    }
}
