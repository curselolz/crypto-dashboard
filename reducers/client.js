import {
  SET_ALL_CLIENTS,
  ADD_CLIENT,
  REMOVE_CLIENT,
} from '../constants/client';

const initialState = {
  clients: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_CLIENTS:
      return { ...state, clients: action.payload };
    case ADD_CLIENT:
      return { ...state, clients: state.clients.concat([action.payload]) };
    case REMOVE_CLIENT:
      return { ...state, clients: state.clients.filter(el => action.payload !== el.email) };
    default:
      return state;
  }
};
