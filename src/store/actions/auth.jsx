import axios from 'axios';
import { LOGIN_URL, REGISTRATION_URL } from '../../constants';
import {
	AUTH_FAIL,
	AUTH_LOGOUT,
	AUTH_START,
	AUTH_SUCCESS,
} from '../actionTypes';

export const logout = () => (dispatch) => {
	localStorage.removeItem('token');
	localStorage.removeItem('user');
	dispatch({ type: AUTH_LOGOUT });
};

export const login = (email, password) => (dispatch) => {
	dispatch({ type: AUTH_START });
	axios
		.post(LOGIN_URL, {
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

export const register = (first_name, last_name, email, password, dob) => (
	dispatch
) => {
	dispatch({ type: AUTH_START });
	axios
		.post(REGISTRATION_URL, {
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

export const autoLogin = () => (dispatch) => {
	dispatch({ type: AUTH_START });
	const authenticated = localStorage.getItem('token');
	const user = JSON.parse(localStorage.getItem('user'));
	if (authenticated)
		dispatch({ type: AUTH_SUCCESS, authenticated: true, user });
	else dispatch({ type: AUTH_FAIL, error: null });
};
