import React from "react";
import ErrorPage from "./ErrorPage";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            hasError: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { error: error, hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error: error, hasError: true });
    }

    render() {
        if (this.state.hasError) {
            console.log(this.state.error.message, this.state.error.code);
            return <ErrorPage error={this.state.error} />;
        }

        return this.props.children;
    }
}
