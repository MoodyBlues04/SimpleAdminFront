import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import "./../style/Authorize.css";

export default class Authorize extends React.Component {
    constructor(setJwt) {
        super();
        this.setJwt = setJwt;
        this.state = {
            isLogin: false,
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
            <Login setJwt={this.setJwt} />
        ) : (
            <Signup setJwt={this.setJwt} />
        );
    }

    render() {
        return (
            <div className="authorize-wrapper">
                <button onClick={(e) => this.handleLoginClick()}>
                    {this.getAuthorizeType()}
                </button>

                {this.getAuthComponent()}
            </div>
        );
    }
}
