// React
import React from 'react';

// Styles
import './signin.css';

// State managment
import { connect } from 'react-redux';
import { authSignIn, onChangeSigninHandler } from '../../actions';

// Materialize CSS Components
import { TextInput, Button } from 'react-materialize';

const SignIn = ({ fields: { username, password }, onSubmitHandler, onChangeHandler }) => {
    return (
        <form onSubmit={onSubmitHandler} autoComplete="off">
            <TextInput id="TextInput-signin-1" inputClassName="white-text" label="Username" noLayout value={username} name="username" onChange={onChangeHandler} />
            <TextInput id="TextInput-signin-2" password inputClassName="white-text" label="Password" noLayout value={password} name="password" onChange={onChangeHandler} />
            <Button>Sign In</Button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        fields: state.input.signin,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitHandler: (e) => {
            e.preventDefault();
            dispatch(authSignIn())
        },
        onChangeHandler: ({ target: { name, value } }) => dispatch(onChangeSigninHandler(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);