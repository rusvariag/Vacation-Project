// Import api services
import ApiService from '../services/api-service';

// Import actions types
import {
    MODAL_SIGNAL,
    ACTION_SIGNAL,
    AUTH_SIGNAL,
    INPUT_CLEAR,
    INPUT_INSERT_FIELDS,
    INPUT_UPDATE,
    LOCATION_SIGNAL,
    INPUT_SIGNUP_FIELDS,
    INPUT_SIGNIN_FIELDS,
    INPUT_VALIDATION_FIRSTNAME,
    INPUT_VALIDATION_LASTNAME,
    INPUT_VALIDATION_USERNAME,
    INPUT_VACATION_VALIDATION,

} from './types';

// Start services
const apiService = new ApiService();

// Actions creator
export const onChangeInsertHandler = (name, value) => {
    return (dispatch, getState) => {
        let validationStatus = true;
        switch (name) {
            case 'destination':
                // Validations: 1. length less than 100 ( database constrain ) 2. input value is string
                if (value.length <= 100 && (typeof value === 'string' || value instanceof String)) {
                    validationStatus = true;
                } else {
                    validationStatus = false;
                }
                break;
            case 'from_date':
                // Validations: 1. Here in case i find what to validate
                validationStatus = true;
                break;
            case 'to_date':
                // Validations: 1. Here in case i find what to validate
                validationStatus = true;
                break;
            case 'price':
                // Validations: 1. Price is decimal number an d not partly string
                if (Number(value) || value.trim().length === 0) {
                    validationStatus = true;
                } else {
                    validationStatus = false;
                }
                break;
            case 'description':
                // Validations: Here in case i find what to validate
                validationStatus = true;
                break;
            case 'picture':
                // Validations: 1. Picture is less that 2083 chars 2. Picture is string
                if (value.length <= 2083 && (typeof value === 'string' || value instanceof String)) {
                    validationStatus = true;
                } else {
                    validationStatus = false;
                }
                break;
            default:
                break;
        }
        dispatch({ type: INPUT_VACATION_VALIDATION, payload: { field: name, value: validationStatus } });
        dispatch({ type: INPUT_INSERT_FIELDS, payload: { name, value } });
    }
}

export const onChangeSigninHandler = (name, value) => {
    return {
        type: INPUT_SIGNIN_FIELDS,
        payload: { name, value }
    }
}

export const onChangeSignupHandler = (name, value) => {
    return async (dispatch, getState) => {
        switch (name) {
            case 'first_name':
                if (value.length <= 50 && value.trim().length !== 0) {
                    dispatch({ type: INPUT_VALIDATION_FIRSTNAME, payload: true });
                } else {
                    dispatch({ type: INPUT_VALIDATION_FIRSTNAME, payload: false });
                }
                break;
            case 'last_name':
                if (value.length <= 50 && value.trim().length !== 0) {
                    dispatch({ type: INPUT_VALIDATION_LASTNAME, payload: true });
                } else {
                    dispatch({ type: INPUT_VALIDATION_LASTNAME, payload: false });
                }
                break;
            case 'username':
                try {
                    const { data: { count } } = await apiService.authIsValidUsername({ username: value });
                    if (value.length <= 100 && count === 0 && value.trim().length !== 0) {
                        dispatch({ type: INPUT_VALIDATION_USERNAME, payload: true });
                    } else {
                        dispatch({ type: INPUT_VALIDATION_USERNAME, payload: false });
                    }
                } catch (err) {

                }
                break;
            default:
                break;
        }
        dispatch({ type: INPUT_SIGNUP_FIELDS, payload: { name, value } });
    };
}

export const onModalHandler = () => {
    return {
        type: MODAL_SIGNAL
    }
}

export const onActionHandler = (action) => {
    return {
        type: ACTION_SIGNAL,
        payload: action
    }
}

export const onAuthHandler = (action) => {
    return {
        type: AUTH_SIGNAL,
        payload: action
    }
}

export const onUpdateFillHandler = (data) => {
    return {
        type: INPUT_UPDATE,
        payload: data
    }
}

export const onClearInputsHandler = () => {
    return {
        type: INPUT_CLEAR
    }
}

export const onPageLocationChange = (location) => {
    return {
        type: LOCATION_SIGNAL,
        payload: location,
    }
}