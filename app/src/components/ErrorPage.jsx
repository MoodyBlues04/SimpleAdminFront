import React from "react";

export default class ErrorPage extends React.Component {
    constructor(props) {
        super();
        this.errorMessage = props.errorMessage;
    }

    render() {
        return (
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">
                                Error code
                            </span>
                            <div className="mb-4 lead">{this.errorMessage}</div>
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
