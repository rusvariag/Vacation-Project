// Imports
import { combineReducers } from 'redux';

// Import types
import {
    INPUT_CLEAR,
    INPUT_INSERT_FIELDS,
    INPUT_UPDATE,
    INPUT_SIGNUP_FIELDS,
    INPUT_SIGNIN_FIELDS,
} from '../actions/types';

// Init data
const initState = {
    // Input fields
    destination: '',
    from_date: '',
    to_date: '',
    price: '',
    description: '',
    picture: '',
};

const initAuthSignupState = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    passwordConfirm: '',
}

const initAuthSigninState = {
    username: '',
    password: '',
}

// Reducers
const fields = (state = initState, { type, payload }) => {
    switch (type) {
        case INPUT_CLEAR:
            return { ...initState };
        case INPUT_INSERT_FIELDS:
            return { ...state, ...{ [payload.name]: payload.value } };
        case INPUT_UPDATE:
            return { ...state, ...payload };
        default:
            return state;
    }
}

const signup = (state = initAuthSignupState, { type, payload }) => {
    switch (type) {
        case INPUT_CLEAR:
            return { ...state, ...initAuthSignupState };
        case INPUT_SIGNUP_FIELDS:
            const { name, value } = payload;
            return { ...state, ...{ [name]: value } };
        default:
            return state;
    }
}

const signin = (state = initAuthSigninState, { type, payload }) => {
    switch (type) {
        case INPUT_CLEAR:
            return { ...state, ...initAuthSigninState };
        case INPUT_SIGNIN_FIELDS:
            const { name, value } = payload;
            return { ...state, ...{ [name]: value } };
        default:
            return state;
    }
}

export default combineReducers({ fields, signup, signin });