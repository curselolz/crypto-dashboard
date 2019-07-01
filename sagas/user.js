/* global INTEGRATOR_URL, REDIRECT_URL */
import { call, put, takeLatest } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { LOGIN_WITH_TOKEN, RESET_PASSWORD } from '../constants/auth';
import { PAUSE_PLAN, ADD_TEAM_MEMBER } from '../constants/user';
import request from '../utils/request';
import { setUser, resetUserPasswordResponse } from '../actions/auth';
import {
  addTeamMemberResponse,
  pauseSubscriptionResponse,
} from '../actions/settings';
import { showErrorMessage } from '../utils/notification-manager';

/**
 * Exchanged the Auth service token and login the user request/response handler
 */
function* loginWithToken(action) {
  try {
    const { token } = action;

    let methodToCall = `${INTEGRATOR_URL}/users/authgrant/token?provider=cognito&authcode=${token}&redirect_url=${REDIRECT_URL.replace(
      '{ORIGIN}',
      window.location.origin,
    )}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const jwtResponse = yield call(request, methodToCall, options);

    const decodedJWT = jwtDecode(jwtResponse);

    const userOpts = {
      headers: {
        Authorization: jwtResponse,
      },
    };
    methodToCall = `${INTEGRATOR_URL}/users/${decodedJWT.sub}`;
    const userResponse = yield call(request, methodToCall, userOpts);

    userResponse.jwt = jwtResponse;

    yield put(setUser(userResponse));
  } catch (ex) {
    showErrorMessage(ex);
  }
}

function* resetPassword(action) {
  try {
    const { token } = action;

    // fake url
    const methodToCall = `${INTEGRATOR_URL}/reset-password/`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const passwordResponse = yield call(request, methodToCall, options);
    yield put(resetUserPasswordResponse());
  } catch (ex) {
    showErrorMessage(ex);
  }
}

function* pauseSubscription(action) {
  try {
    const { token } = action;

    // fake url
    const methodToCall = 'http://localhost:8068/pause-subscription/';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const jwtResponse = yield call(request, methodToCall, options);

    yield put(pauseSubscriptionResponse());
  } catch (ex) {
    showErrorMessage(ex);
  }
}

function* addTeamMember(action) {
  try {
    const {
      firstName, lastName, email, status,
    } = action.payload;
    // fake url
    // let methodToCall = `${INTEGRATOR_URL}/add-members/`;
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // };

    // const jwtResponse = yield call(request, methodToCall, options);

    // const decodedJWT = jwtDecode(jwtResponse);

    // const userOpts = {
    //   headers: {
    //     Authorization: jwtResponse,
    //   },
    // };
    // methodToCall = `${INTEGRATOR_URL}/users/${decodedJWT.sub}`;
    // const userResponse = yield call(request, methodToCall, userOpts);

    // userResponse.jwt = jwtResponse;

    yield put(addTeamMemberResponse({
      firstName, lastName, email, status,
    }));
  } catch (ex) {
    showErrorMessage(ex);
  }
}

export default [
  takeLatest(LOGIN_WITH_TOKEN, loginWithToken),
  takeLatest(RESET_PASSWORD, resetPassword),
  takeLatest(PAUSE_PLAN, pauseSubscription),
  takeLatest(ADD_TEAM_MEMBER, addTeamMember),
];
