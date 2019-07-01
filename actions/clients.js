import {
  INVITE_CLIENT,
  ADD_CLIENT,
  GET_ALL_CLIENTS,
  SET_ALL_CLIENTS,
  RESEND_INVITE,
  REMOVE_CLIENT,
} from '../constants/client';

export const addDataInviteUser = ({ name, lastName, email }) => ({
  type: INVITE_CLIENT,
  payload: {
    name,
    lastName,
    email,
  },
});

export const responseDataInvite = (name, lastName, email) => ({
  type: ADD_CLIENT,
  payload: {
    name,
    lastName,
    email,
  },
});

export const getUserClients = () => ({
  type: GET_ALL_CLIENTS,
});

export const setUserClients = clients => ({
  type: SET_ALL_CLIENTS,
  payload: clients,
});

export const resendInvite = email => ({
  type: RESEND_INVITE,
  payload: email,
});

export const removeClient = email => ({
  type: REMOVE_CLIENT,
  payload: email,
});
