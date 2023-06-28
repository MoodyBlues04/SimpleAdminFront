import React from "react";

export default class ErrorPage extends React.Component {
    constructor(props) {
        super();
        this.error = props.error;
    }

    render() {
        return (
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">
                                {this.error.code}
                            </span>
                            <div className="mb-4 lead">
                                {this.error.message}
                            </div>
                            <a href="/" className="btn btn-link">
                                Back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
