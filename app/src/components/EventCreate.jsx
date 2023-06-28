import React from "react";
import Api from "../classes/Api";

export default class EventCreate extends React.Component {
    constructor(props) {
        super();
        this.api = new Api(props.jwt);
        this.state = {
            header: null,
            text: null,
        };
    }

    async handleSubmit(e) {
        e.preventDefault();
        await this.api.sendAuthorizedPost("event", this.state);
        if (this.api.hasError()) {
            throw this.api.getError();
        }
        window.location.reload();
    }

    render() {
        return (
            <div className="container" style={{ width: "30%" }}>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="header">Header</label>
                        <input
                            type="text"
                            className="form-control"
                            id="header"
                            placeholder="Enter header"
                            onChange={(e) =>
                                this.setState({ header: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="text">Text</label>
                        <input
                            type="text"
                            className="form-control"
                            id="text"
                            placeholder="text"
                            onChange={(e) =>
                                this.setState({ text: e.target.value })
                            }
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginTop: "10px" }}
                    >
                        Create
                    </button>
                </form>
            </div>
        );
    }
}
