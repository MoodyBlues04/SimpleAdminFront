import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import "./../style/Authorize.css";

export default class Authorize extends React.Component {
    constructor(props) {
        super();
        this.props = props;
        this.state = {
            isLogin: true,
        };
    }

    handleLoginClick() {
        this.setState({
            isLogin: !this.state.isLogin,
        });
    }

    getAuthorizeType() {
        return this.state.isLogin ? "Sign up" : "Log in";
    }

    getAuthComponent() {
        return this.state.isLogin ? (
            <Login {...this.props} />
        ) : (
            <Signup {...this.props} />
        );
    }

    render() {
        return (
            <div className="authorize-wrapper">
                {this.getAuthComponent()}

                <a className="btn" onClick={(e) => this.handleLoginClick()}>
                    {this.getAuthorizeType()}
                </a>
            </div>
        );
    }
}
