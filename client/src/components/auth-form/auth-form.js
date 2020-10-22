// React
import React from 'react';

// Styles
import './auth-form.css';

// State managment
import { connect } from 'react-redux';
import { AUTH_SIGNIN, AUTH_SIGNUP } from '../../actions/types';
import { onAuthHandler } from '../../actions';

// Router 
import { Link } from "react-router-dom";

// Materialize CSS Components
import { Row, Col } from 'react-materialize';

const AuthForm = ({ authStatus, onToggleHandler, children }) => {
    return (
        <div className="auth-container">
            <div className="container section auth-form">
                <Row>
                    <Col s={0} l={6} className="side-bar teal lighten-2 center-align">
                        <img className="vacation" src="./img/I_need_vacation.svg" alt="vacation" />
                    </Col>
                    <Col s={12} l={6} className="blue-grey darken-3 center-align">
                        <Row className="auth-input-part">
                            <Col s={12} xl={10} offset="xl1">
                                <div className="auth-nav">
                                    <Link onClick={() => onToggleHandler(AUTH_SIGNIN)} className={authStatus === AUTH_SIGNIN ? 'auth-link auth-link-active' : 'auth-link'} to="/login">Sign In</Link>
                                    &nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;
                                    <Link onClick={() => onToggleHandler(AUTH_SIGNUP)} className={authStatus === AUTH_SIGNUP ? 'auth-link auth-link-active' : 'auth-link'} to="/register">Sign Up</Link>
                                </div>
                                {children}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        authStatus: state.signals.authStatus
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onToggleHandler: (status) => dispatch(onAuthHandler(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);