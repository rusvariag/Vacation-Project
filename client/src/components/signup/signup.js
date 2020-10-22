// React
import React from 'react';

// Styles
import './signup.css';

// State managment
import { connect } from 'react-redux';
import { authSignUp, onChangeSignupHandler } from '../../actions';

// Materialize CSS Components
import { TextInput, Button } from 'react-materialize';

const SignUp = ({ fields, onChangeHandler, onSubmitHandler, validation, validSignup }) => {
    const valid = Object.values(validation).reduce((acc, v) => acc && v);
    return (
        <form onSubmit={valid ? onSubmitHandler : () => { }} autoComplete="off">
            <TextInput
                id="TextInput-signup-1"
                inputClassName={validation.validFirstname ? 'white-text' : 'white-text invalid'}
                error="First name must have at least one char and be less that 50 char"
                label="First Name"
                noLayout
                value={fields.first_name}
                name="first_name"
                onChange={onChangeHandler}
            />
            <TextInput
                id="TextInput-signup-2"
                inputClassName={validation.validLastname ? 'white-text' : 'white-text invalid'}
                error="Last name must have at least one char and be less that 50 char"
                label="Last Name"
                noLayout
                value={fields.last_name}
                name="last_name"
                onChange={onChangeHandler}
            />
            <TextInput
                id="TextInput-signup-3"
                inputClassName={validation.validUsername ? 'white-text' : 'white-text invalid'}
                error="Username is in use or its blank"
                label="Username"
                noLayout
                value={fields.username}
                name="username"
                onChange={onChangeHandler}
            />
            <TextInput id="TextInput-signup-4" password inputClassName="white-text" label="Password" noLayout value={fields.password} name="password" onChange={onChangeHandler} />
            <TextInput id="TextInput-signup-5" password inputClassName="white-text" label="Password Confirm" noLayout value={fields.passwordConfirm} name="passwordConfirm" onChange={onChangeHandler} />
            {!validSignup && <div className="red-text">All fields is mandatory and password match</div>}
            <Button disabled={!valid}>Sign Up</Button>
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        fields: state.input.signup,
        validSignup: state.signals.validSignup,
        validation: {
            validFirstname: state.signals.validFirstname,
            validLastname: state.signals.validLastname,
            validUsername: state.signals.validUsername,
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmitHandler: (e) => {
            e.preventDefault();
            dispatch(authSignUp())
        },
        onChangeHandler: ({ target: { name, value } }) => dispatch(onChangeSignupHandler(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);