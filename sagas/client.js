/* global INTEGRATOR_URL */
import { takeLatest, put, call } from 'redux-saga/effects';
import request from '../utils/request';
import {
  INVITE_CLIENT,
  GET_ALL_CLIENTS,
  RESEND_INVITE,
  REMOVE_CLIENT,
} from '../constants/client';
import {
  setUserClients,
  removeClient as removeClientAction,
} from '../actions/clients';
import { showErrorMessage, showSuccessMessage } from '../utils/notification-manager';

function* fetchUserClients() {
  try {
    const methodToCall = `${INTEGRATOR_URL}/users/customers`;

    const response = yield call(request, methodToCall);

    yield put(setUserClients(response));
  } catch (ex) {
    console.log(ex);
    showErrorMessage(ex.message);
  }
}

function* fetchInviteUser(action) {
  try {
    const { name, lastName, email } = action.payload;
    const methodToCall = `${INTEGRATOR_URL}/users/customers/permissions/cpa/request`;

    const formData = new FormData();

    formData.append('customerFirstName', name);
    formData.append('customerLastName', lastName);
    formData.append('customerEmail', email);

    const options = {
      method: 'POST',
      body: formData,
    };

    yield call(request, methodToCall, options);

    yield put(responseDataInvite(name, lastName, email));
  } catch (ex) {
    console.log(ex);
    showErrorMessage(ex.message);
  }
}

function* resendInvite(action) {
  try {
    const email = action.payload;
    const methodToCall = `${INTEGRATOR_URL}/users/customers/permissions/cpa/request`;

    const formData = new FormData();

    formData.append('customerEmail', email);

    const options = {
      method: 'PUT',
      body: formData,
    };

    yield call(request, methodToCall, options);
    showSuccessMessage('Invite has been successfully re-sent!');
  } catch (ex) {
    console.log(ex);
    showErrorMessage(ex.message);
  }
}

function* removeClient(action) {
  const { email } = action.payload;

  try {
    // fake url
    const methodToCall = `${INTEGRATOR_URL}/users/remove`;

    const response = yield call(request, methodToCall);

    yield put(removeClientAction(email));
  } catch (ex) {
    console.log(ex);
    showErrorMessage(ex.message);
  }
}

export default [
  takeLatest(INVITE_CLIENT, fetchInviteUser),
  takeLatest(GET_ALL_CLIENTS, fetchUserClients),
  takeLatest(RESEND_INVITE, resendInvite),
  takeLatest(REMOVE_CLIENT, removeClient),
];
