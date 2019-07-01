import { createSelector } from 'reselect';

const userSelector = state => state.user;

const makeSelectUserId = () => createSelector(
  userSelector,
  state => state.userId,
);

const makeSelectEmail = () => createSelector(
  userSelector,
  state => state.emailAddress,
);
const makeSelectFirstName = () => createSelector(
  userSelector,
  state => state.firstName,
);

const makeSelectLastName = () => createSelector(
  userSelector,
  state => state.lastName,
);

const makeSelectJWT = () => createSelector(
  userSelector,
  state => state.jwt,
);

const makeSelectStripeChargeId = () => createSelector(
  userSelector,
  state => state.stripeChargeId,
);

const makeSelectCurrentPlan = () => createSelector(
  userSelector,
  state => state.currentPlan,
);

export {
  makeSelectUserId,
  makeSelectEmail,
  makeSelectFirstName,
  makeSelectLastName,
  makeSelectJWT,
  makeSelectStripeChargeId,
  makeSelectCurrentPlan,
};
