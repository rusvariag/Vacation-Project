// Import types
import { SIGNIN, SIGNUP, LOGGED, LOGOUT } from '../actions/types';

// init States
const initState = {
    user: {},
    isAuthenticated: false,
};

// Reducers
export default (state = initState, { type, payload }) => {
    switch (type) {
        case SIGNIN:
            return { ...state, ...payload };
        case LOGOUT:
            return { ...state, ...payload };
        case SIGNUP:
            return state;
        case LOGGED:
            return state;
        default:
            return state;
    }
}