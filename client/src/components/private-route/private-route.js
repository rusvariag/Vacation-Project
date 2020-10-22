// React
import React from 'react';

// State managment
import { connect } from 'react-redux';

// Router
import { Route, Redirect, } from "react-router-dom";

const PrivateRoute = (props) => {
    return (
        <Route render={({ location }) =>
            props.isAuthenticated ? (props.children) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: location }
                }} />
            )} />
    );
}

const mapStateToProps = state => {
    return { isAuthenticated: state.auth.isAuthenticated }
}

export default connect(mapStateToProps, null)(PrivateRoute);