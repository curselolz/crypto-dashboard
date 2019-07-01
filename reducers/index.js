/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';
import userReducer from './user';
import clientReducer from './client';
import settingsReducer from './settings';
import { RESET_USER } from '../constants/auth';
import { GET_ALL_CLIENTS, SET_ALL_CLIENTS } from '../constants/client';

// Initial routing state
const globalInitialState = {
  location: null,
  isServerAvailable: true,
  isLoading: false,
  isLoggedOutUser: false,
};

function globalReducer(state = globalInitialState, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        isLoading: true,
      };
    case SET_ALL_CLIENTS:
      return {
        ...state,
        isLoading: false,
      };
    case RESET_USER:
      return {
        ...state,
        isLoggedOutUser: !!action.isLoggedOutUser,
      };
    default:
      return state;
  }
}

/**
 * Creates the main reducer
 */
export default function createReducer() {
  return combineReducers({
    global: globalReducer,
    user: userReducer,
    client: clientReducer,
    settings: settingsReducer,
  });
}
