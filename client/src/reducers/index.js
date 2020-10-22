// Imports
import { combineReducers } from 'redux';

// Reducers
import auth from './auth-reducers';
import signals from './signals-reducers';
import data from './data-reducers';
import input from './input-reducers';

// Combine reducers
export default combineReducers({ auth, data, signals, input });
