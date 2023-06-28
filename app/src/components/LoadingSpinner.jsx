import React from "react";
import "../style/LoadingSpinner.css";

export default class LoadingSpinner extends React.Component {
    render() {
        return (
            <div className="spinner-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }
}
