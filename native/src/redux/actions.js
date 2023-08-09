import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATED_FAIL = 'AUTHENTICATED_FAIL';
export const AUTHENTICATED_SUCCESS = 'AUTHENTICATED_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const USER_LOADED_FAIL = 'USER_LOADED_FAIL';
export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS';
export const TECHNICIAN_DATA_SUCCESS = 'TECHNICIAN_DATA_SUCCESS';
export const TECHNICIAN_DATA_FAIL = 'TECHNICIAN_DATA_FAIL';
export const GET_RECLAMATION_DETAIL_SUCCESS = 'GET_RECLAMATION_DETAIL_SUCCESS';
export const GET_RECLAMATION_DETAIL_FAIL = 'GET_RECLAMATION_DETAIL_FAIL';

const baseURL = 'http://127.0.0.1:8000/';

export const loadUser = () => async dispatch => {
  try {
    const access = await AsyncStorage.getItem('access');

    if (access) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
        }
      };

      const response = await axios.get(`${baseURL}auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: response.data
      });
    } else {
      dispatch({
        type: USER_LOADED_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: USER_LOADED_FAIL
    });
  }
};

export const checkAuthenticated = () => async dispatch => {
  try {
    const access = await AsyncStorage.getItem('access');

    if (access) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const body = JSON.stringify({ token: access });

      const response = await axios.post(`${baseURL}auth/jwt/verify/`, body, config);

      if (response.data.code !== 'token_not_valid') {
        dispatch({
          type: AUTHENTICATED_SUCCESS
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL
        });
      }
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ username, password });

  try {
    const response = await axios.post(`${baseURL}auth/jwt/create/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export const fetchTechnicianData = (userId, config) => async dispatch => {
  try {
    const response = await fetch(`http://localhost:8000/api/technicien-reclamations/${userId}/`, config);
    const data = await response.json();

    const totalReclamations = data.length;
    const nonClosedReclamations = data.filter(reclamation => reclamation.status !== 'closed').length;

    const lastNonClosedReclamations = data.slice(0, totalReclamations);

    dispatch({
      type: TECHNICIAN_DATA_SUCCESS,
      payload: {
        totalReclamations,
        nonClosedReclamations,
        lastNonClosedReclamations,
      }
    });
  } catch (error) {
    dispatch({
      type: TECHNICIAN_DATA_FAIL,
      payload: error.message,
    });
  }
};


export const getReclamationDetail = (reclamationId, config) => async dispatch => {
  try {
    const response = await axios.get(`${baseURL}/api/reclamation-detail/${reclamationId}/`, config);
    const reclamation = response.data;

    dispatch({
      type: GET_RECLAMATION_DETAIL_SUCCESS,
      payload: reclamation,
    });
  } catch (error) {
    dispatch({
      type: GET_RECLAMATION_DETAIL_FAIL,
      payload: error.message,
    });
  }
};