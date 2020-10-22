// React
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authLoggedIn } from '../../actions';

// Styles
import './app.css';

// Router 
import { Switch, Route, Redirect } from "react-router-dom";

// State managment
import { PENDING } from '../../actions/types';

// Components
import SignIn from '../signin';
import SignUp from '../signup';
import Vacations from '../vacations';
import PrivateRoute from '../private-route';
import AuthForm from '../auth-form';
import SiteWrapper from '../site-wrapper';
import Report from '../report';

class App extends Component {

  render() {
    return (
      <div className="App">
        {
          this.props.loggedStatus === PENDING ?
            <div></div>
            :
            <Switch>

              <PrivateRoute path="/vacations">
                <SiteWrapper>
                  <Vacations />
                </SiteWrapper>
              </PrivateRoute>

              <PrivateRoute path="/reports">
                <SiteWrapper>
                  <Report />
                </SiteWrapper>
              </PrivateRoute>


              <AuthForm>
                <Route path="/login">
                  <SignIn />
                </Route>
                <Route path="/register">
                  <SignUp />
                </Route>
                <Redirect from="/" to="/login" />
              </AuthForm>

            </Switch>
        }
      </div>
    )
  };

  componentDidMount() {
    this.props.isLoggedIn();
  }
}

const mapStateToProps = (state) => {
  return {
    loggedStatus: state.signals.loggedStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isLoggedIn: () => dispatch(authLoggedIn()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);