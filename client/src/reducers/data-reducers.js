// Imports
import { combineReducers } from 'redux';

// Import types
import {
    FOLLOW,
    FOLLOWS,
    VACATIONS,
    VACATIONS_CREATE,
    VACATIONS_DELETE,
    VACATIONS_UPDATE,
} from '../actions/types';

// init States
const initVacationsState = [];
const initFollowsState = [];

// Reducers [ Reducer must be a pure function so i cant use helper functions]
const follows = (state = initFollowsState, { type, payload }) => {
    switch (type) {
        case FOLLOWS:
            return payload;
        default:
            return state;
    }
}

const vacations = (state = initVacationsState, { type, payload }) => {
    switch (type) {
        case VACATIONS:
            return [...payload]
        case FOLLOW:
            return state.map(item => item.id === payload.id ? { ...payload } : { ...item });
        case VACATIONS_DELETE:
            return state.filter(item => item.id !== payload);
        case VACATIONS_CREATE:
            return [...state, payload];
        case VACATIONS_UPDATE:
            return state.map(item => item.id === payload.id ? { ...payload } : { ...item });
        default:
            return state;
    }
}

export default combineReducers({ follows, vacations });