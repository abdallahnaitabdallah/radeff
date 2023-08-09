import {
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_LOADED_FAIL,
  USER_LOADED_SUCCESS,
  TECHNICIAN_DATA_SUCCESS,
  TECHNICIAN_DATA_FAIL,
  GET_RECLAMATION_DETAIL_SUCCESS,
  GET_RECLAMATION_DETAIL_FAIL,
} from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  access: null,
  isAuthenticated: null,
  user: null,
  technicianData: {
    totalReclamations: 0,
    nonClosedReclamations: 0,
    lastNonClosedReclamations: [],
  },
  reclamationDetail: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      AsyncStorage.setItem('access',payload.access);

      return {
        ...state,
        access: payload.access,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      AsyncStorage.clear()
      return {
        ...state,
        access: null,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
      };
    case TECHNICIAN_DATA_SUCCESS:
      return {
        ...state,
        technicianData: {
          ...payload,
        },
      };
    case TECHNICIAN_DATA_FAIL:
      return {
        ...state,
        technicianData: {
          totalReclamations: 0,
          nonClosedReclamations: 0,
          lastNonClosedReclamations: [],
        },
        error: payload,
      };
    case GET_RECLAMATION_DETAIL_SUCCESS:
      return {
        ...state,
        reclamationDetail: payload,
      };
    case GET_RECLAMATION_DETAIL_FAIL:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
