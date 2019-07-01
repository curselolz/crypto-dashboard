import {
  LOGIN_WITH_TOKEN,
  SET_USER,
  RESET_USER,
  RESET_PASSWORD,
  RESET_PASSWORD_RESPONSE,

} from '../constants/auth';

/**
 * Login the user with the auth token
 *
 * @param {string} token - Token to exchange
 *
 * @returns {object} - Action object of type LOGIN_WITH_TOKEN
 */
export const loginWithToken = token => ({
  type: LOGIN_WITH_TOKEN,
  token,
});

/**
 * Clean the current user data in store
 *
 * @param {bollean?} isLoggedOutUser - Flag to determine whether or not log out the user
 *
 * @returns {object} - Action object of type RESET_USER
 */
export const resetUser = isLoggedOutUser => ({
  type: RESET_USER,
  isLoggedOutUser,
});


export const resetUserPassword = () => ({
  type: RESET_PASSWORD,
});

export const resetUserPasswordResponse = () => ({
  type: RESET_PASSWORD_RESPONSE,
});

/**
 * Updates the user info in store
 *
 * @param {object} param0 - User details object
 * @param {number} param0.userNumber - ID of the user
 * @param {string} param0.firstName - Firstname of the user
 * @param {string} param0.lastName - Lastname of the user
 * @param {string} param0.planType - User purchase plan
 * @param {string} param0.emailAddress - User email
 * @param {string} param0.jwt - User JWT
 * @param {string} param0.stripeChargeId - Stripe Charge Id
 *
 * @return {object} - An action object with a type of SET_USER
 */
export function setUser({
  userNumber,
  firstName,
  lastName,
  planType,
  emailAddress,
  jwt,
  stripeChargeId,
}) {
  return {
    type: SET_USER,
    userNumber,
    firstName,
    lastName,
    planType,
    emailAddress,
    jwt,
    stripeChargeId,
  };
}
