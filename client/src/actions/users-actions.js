// Import api services
import ApiService from '../services/api-service';
import history from '../services/history';

// Import actions types
import {
    SIGNIN,
    LOGOUT,
    PENDING,
    SUCCESS,
    FAILURE,
    SIGNIN_SIGNAL,
    SIGNUP_SIGNAL,
    LOGOUT_SIGNAL,
    LOGGED_SIGNAL,
    INPUT_SIGNUP_VALIDATION,
    AUTH_SIGNAL,
    AUTH_SIGNIN,
    INPUT_CLEAR,
} from './types';

// Start services
const apiService = new ApiService();

// Actions creator
export const authLoggedIn = () => {
    return async dispatch => {
        try {
            dispatch({ type: LOGGED_SIGNAL, payload: PENDING });
            const { data } = await apiService.authIsLogged();
            dispatch({ type: LOGGED_SIGNAL, payload: SUCCESS });
            dispatch({ type: SIGNIN, payload: { isAuthenticated: true, user: data } });
            history.push('/vacations');
        } catch (err) {
            dispatch({ type: LOGGED_SIGNAL, payload: FAILURE });
            dispatch({ type: LOGOUT, payload: { isAuthenticated: false } })
            history.push('/login');
        }
    };
}

export const authSignIn = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SIGNIN_SIGNAL, payload: PENDING });
            const { data } = await apiService.authSignIn(getState().input.signin);
            dispatch({ type: SIGNIN_SIGNAL, payload: SUCCESS });
            dispatch({ type: SIGNIN, payload: { isAuthenticated: true, user: data } })
            history.push('/vacations');
        } catch (err) {
            dispatch({ type: SIGNIN_SIGNAL, payload: FAILURE });
            history.push('/login');
        }
    };
}

export const authSignUp = () => {
    return async (dispatch, getState) => {
        const { first_name, last_name, username, password, passwordConfirm } = getState().input.signup
        if (first_name.trim().length === 0 || last_name.trim().length === 0 || username.trim().length === 0 || password.trim().length === 0 || password !== passwordConfirm) {
            dispatch({ type: INPUT_SIGNUP_VALIDATION, payload: false });
        } else {
            try {
                dispatch({ type: INPUT_SIGNUP_VALIDATION, payload: true });
                dispatch({ type: SIGNUP_SIGNAL, payload: PENDING });
                await apiService.authSignUp(getState().input.signup);
                dispatch({ type: SIGNUP_SIGNAL, payload: SUCCESS });
            } catch (err) {
                dispatch({ type: SIGNUP_SIGNAL, payload: FAILURE });
            } finally {
                dispatch({ type: AUTH_SIGNAL, payload: AUTH_SIGNIN });
                dispatch({ type: INPUT_CLEAR });
                history.push('/login');
            }
        }
    };
}

export const authSignOut = () => {
    return async dispatch => {
        try {
            dispatch({ type: LOGOUT_SIGNAL, payload: PENDING });
            await apiService.authSignOut();
            dispatch({ type: LOGOUT_SIGNAL, payload: SUCCESS });
        } catch (err) {
            dispatch({ type: LOGOUT_SIGNAL, payload: FAILURE });
        } finally {
            dispatch({ type: LOGOUT, payload: { isAuthenticated: false, user: {} } })
            history.push('/login');
        }
    };
}