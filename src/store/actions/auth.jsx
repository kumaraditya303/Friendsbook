import axios from 'axios';
import {
	AUTH_FAIL,
	AUTH_LOGOUT,
	AUTH_SUCCESS,
	AUTH_START,
} from '../actionTypes';

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	return {
		type: AUTH_LOGOUT,
	};
};

export const login = (email, password) => {
	return (dispatch) => {
		dispatch({ type: AUTH_START });
		axios
			.post('/api/login/', {
				username: email,
				password,
			})
			.then((res) => {
				const token = res.data.token;
				const user = JSON.stringify(res.data.user);
				localStorage.setItem('user', user);
				localStorage.setItem('token', token);
				dispatch({ type: AUTH_SUCCESS, authenticated: true, user });
			})
			.catch((error) => {
				dispatch({ type: AUTH_FAIL, error });
			});
	};
};

export const register = (first_name, last_name, email, password, dob) => {
	return (dispatch) => {
		dispatch({ type: AUTH_START });
		axios
			.post('/api/register/', {
				first_name,
				last_name,
				email,
				password,
				dob,
			})
			.then((res) => {
				if (res.status === 201) dispatch(login(email, password));
			})
			.catch((error) => {
				dispatch({ type: AUTH_FAIL, error });
			});
	};
};

export const autoLogin = () => {
	return (dispatch) => {
		dispatch({ type: AUTH_START });
		const authenticated = localStorage.getItem('token');
		const user = JSON.parse(localStorage.getItem('user'));
		if (authenticated)
			dispatch({ type: AUTH_SUCCESS, authenticated: true, user });
		else dispatch({ type: AUTH_FAIL });
	};
};
