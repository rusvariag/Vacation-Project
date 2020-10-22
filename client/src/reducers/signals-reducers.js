// Import types
import {
    PENDING,
    SIGNIN_SIGNAL,
    SIGNUP_SIGNAL,
    LOGOUT_SIGNAL,
    LOGGED_SIGNAL,
    FOLLOW_SIGNAL,
    UNFOLLOW_SIGNAL,
    VACATIONS_SIGNAL,
    VACATIONS_SELECT_SIGNAL,
    VACATIONS_CREATE_SIGNAL,
    VACATIONS_DELETE_SIGNAL,
    VACATIONS_UPDATE_SIGNAL,
    MODAL_SIGNAL,
    ACTION_SIGNAL,
    ACTION_INSERT,
    LOCATION_SIGNAL,
    AUTH_SIGNIN,
    AUTH_SIGNAL,
    INPUT_VALIDATION_FIRSTNAME,
    INPUT_VALIDATION_LASTNAME,
    INPUT_VALIDATION_USERNAME,
    INPUT_SIGNUP_VALIDATION,
    INPUT_VACATION_VALIDATION
} from '../actions/types';

// init States
const initState = {
    // Auth signals
    signinStatus: PENDING,
    signupStatus: PENDING,
    logoutStatus: PENDING,
    loggedStatus: PENDING,

    // Vacation following signal
    followStatus: PENDING,
    unfollowStatus: PENDING,

    // Get all vacation signal
    vacationsStatus: PENDING,

    // Vacation manipulation signal
    vacationSelectStatus: PENDING,
    vacationCreateStatus: PENDING,
    vacationDeleteStatus: PENDING,
    vacationUpdateStatus: PENDING,

    isModalOpen: false,
    actionStatus: ACTION_INSERT,
    authStatus: AUTH_SIGNIN,
    location: '/vacations',

    validFirstname: true,
    validLastname: true,
    validUsername: true,

    validSignup: true,

    validVacationInput: {
        destination: true,
        from_date: true,
        to_date: true,
        price: true,
        description: true,
        picture: true,
    }
};

// Reducers
export default (state = initState, { type, payload }) => {
    switch (type) {
        case SIGNIN_SIGNAL:
            return { ...state, signinStatus: payload };
        case SIGNUP_SIGNAL:
            return { ...state, signupStatus: payload };
        case LOGOUT_SIGNAL:
            return { ...state, logoutStatus: payload };
        case LOGGED_SIGNAL:
            return { ...state, loggedStatus: payload };
        case FOLLOW_SIGNAL:
            return { ...state, followStatus: payload };
        case UNFOLLOW_SIGNAL:
            return { ...state, unfollowStatus: payload };
        case VACATIONS_SIGNAL:
            return { ...state, vacationsStatus: payload };
        case VACATIONS_SELECT_SIGNAL:
            return { ...state, vacationSelectStatus: payload };
        case VACATIONS_CREATE_SIGNAL:
            return { ...state, vacationCreateStatus: payload };
        case VACATIONS_DELETE_SIGNAL:
            return { ...state, vacationDeleteStatus: payload };
        case VACATIONS_UPDATE_SIGNAL:
            return { ...state, vacationUpdateStatus: payload };
        case MODAL_SIGNAL:
            return { ...state, isModalOpen: !state.isModalOpen };
        case ACTION_SIGNAL:
            return { ...state, actionStatus: payload };
        case LOCATION_SIGNAL:
            return { ...state, location: payload };
        case AUTH_SIGNAL:
            return { ...state, authStatus: payload };
        case INPUT_VALIDATION_FIRSTNAME:
            return { ...state, validFirstname: payload };
        case INPUT_VALIDATION_LASTNAME:
            return { ...state, validLastname: payload };
        case INPUT_VALIDATION_USERNAME:
            return { ...state, validUsername: payload };
        case INPUT_SIGNUP_VALIDATION:
            return { ...state, validSignup: payload };
        case INPUT_VACATION_VALIDATION:
            const inputVacationValidation = { ...state.validVacationInput, ...{ [payload.field]: payload.value } }
            return { ...state, ...{ validVacationInput: inputVacationValidation } };
        default:
            return state;
    }
}
