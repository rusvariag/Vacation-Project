// Import api services
import ApiService from '../services/api-service';
import io from 'socket.io-client';

// Import actions types
import {
	PENDING,
	SUCCESS,
	FAILURE,
	VACATIONS,
	VACATIONS_CREATE,
	VACATIONS_DELETE,
	VACATIONS_UPDATE,
	VACATIONS_SIGNAL,
	VACATIONS_SELECT_SIGNAL,
	VACATIONS_CREATE_SIGNAL,
	VACATIONS_DELETE_SIGNAL,
	VACATIONS_UPDATE_SIGNAL,
	FOLLOW,
	FOLLOWS,
	FOLLOW_SIGNAL,
	UNFOLLOW_SIGNAL,
} from './types';

// Start services
const apiService = new ApiService();
const socket = io.connect('http://localhost:3000');

// Helper functions
const prepareVacation = (vacation) => {
	vacation.from_date = new Date(vacation.from_date);
	vacation.to_date = new Date(vacation.to_date);
	vacation.follow = !!vacation.follow;
	vacation.picture = vacation.picture || 'https://upload.wikimedia.org/wikipedia/commons/5/5a/No_image_available_500_x_500.svg';
	return vacation;
};

const vacationSelect = async (dispatch, id) => {
	dispatch({ type: VACATIONS_SELECT_SIGNAL, payload: PENDING });
	try {
		const { data } = await apiService.vacationSelect(id);
		dispatch({ type: VACATIONS_SELECT_SIGNAL, payload: SUCCESS });
		return data;
	} catch (err) {
		dispatch({ type: VACATIONS_SELECT_SIGNAL, payload: FAILURE });
	}
};

// Action creators
export const vacations = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: VACATIONS_SIGNAL, payload: PENDING });
			const { data } = await apiService.vacations();
			dispatch({ type: VACATIONS_SIGNAL, payload: SUCCESS });
			dispatch({ type: VACATIONS, payload: data.map((item) => prepareVacation(item)) });
		} catch (err) {
			dispatch({ type: VACATIONS_SIGNAL, payload: FAILURE });
		}
	};
};

export const vacationCreate = () => {
	return async (dispatch, getState) => {
		try {
			dispatch({ type: VACATIONS_CREATE_SIGNAL, payload: PENDING });
			const res = await apiService.vacationCreate(getState().input.fields);
			socket.emit('vacationCreate', res.data.insertId);
			const data = await vacationSelect(dispatch, res.data.insertId);
			dispatch({ type: VACATIONS_CREATE_SIGNAL, payload: SUCCESS });
			dispatch({ type: VACATIONS_CREATE, payload: prepareVacation(data) });
		} catch (err) {
			dispatch({ type: VACATIONS_CREATE_SIGNAL, payload: FAILURE });
		}
	};
};

export const vacationDelete = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: VACATIONS_DELETE_SIGNAL, payload: PENDING });
			await apiService.vacationDelete(id);
			socket.emit('vacationDelete', id);
			dispatch({ type: VACATIONS_DELETE_SIGNAL, payload: SUCCESS });
			dispatch({ type: VACATIONS_DELETE, payload: id });
		} catch (err) {
			dispatch({ type: VACATIONS_DELETE_SIGNAL, payload: FAILURE });
		}
	};
};

export const vacationUpdate = () => {
	return async (dispatch, getState) => {
		const id = getState().input.fields.id;
		try {
			dispatch({ type: VACATIONS_UPDATE_SIGNAL, payload: PENDING });
			await apiService.vacationUpdate(id, getState().input.fields);
			socket.emit('vacationUpdate', id);
			const data = await vacationSelect(dispatch, id);
			dispatch({ type: VACATIONS_UPDATE_SIGNAL, payload: SUCCESS });
			dispatch({ type: VACATIONS_UPDATE, payload: prepareVacation(data) });
		} catch (err) {
			dispatch({ type: VACATIONS_UPDATE_SIGNAL, payload: FAILURE });
		}
	};
};

export const follows = () => {
	return async (dispatch) => {
		try {
			dispatch({ type: FOLLOW_SIGNAL, payload: PENDING });
			const { data } = await apiService.follows();
			dispatch({ type: FOLLOW_SIGNAL, payload: SUCCESS });
			dispatch({ type: FOLLOWS, payload: data });
		} catch (err) {
			dispatch({ type: FOLLOW_SIGNAL, payload: FAILURE });
		}
	};
};

export const followCreate = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: FOLLOW_SIGNAL, payload: PENDING });
			await apiService.followCreate(id);
			dispatch({ type: FOLLOW_SIGNAL, payload: SUCCESS });
			const data = await vacationSelect(dispatch, id);
			dispatch({ type: FOLLOW, payload: prepareVacation(data) });
		} catch (err) {
			dispatch({ type: FOLLOW_SIGNAL, payload: FAILURE });
		}
	};
};

export const followDelete = (id) => {
	return async (dispatch) => {
		try {
			dispatch({ type: UNFOLLOW_SIGNAL, payload: PENDING });
			await apiService.followDelete(id);
			dispatch({ type: UNFOLLOW_SIGNAL, payload: SUCCESS });
			const data = await vacationSelect(dispatch, id);
			dispatch({ type: FOLLOW, payload: prepareVacation(data) });
		} catch (err) {
			dispatch({ type: UNFOLLOW_SIGNAL, payload: FAILURE });
		}
	};
};

export const socketInit = () => {
	return (dispatch) => {
		socket.on('vacationDelete', (id) => {
			dispatch({ type: VACATIONS_DELETE, payload: id });
		});
		socket.on('vacationCreate', async (id) => {
			const data = await vacationSelect(dispatch, id);
			dispatch({ type: VACATIONS_CREATE, payload: prepareVacation(data) });
		});
		socket.on('vacationUpdate', async (id) => {
			const data = await vacationSelect(dispatch, id);
			dispatch({ type: VACATIONS_UPDATE, payload: prepareVacation(data) });
		});
	};
};
