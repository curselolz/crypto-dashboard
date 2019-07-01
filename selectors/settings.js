import { createSelector } from 'reselect';

const userSelector = state => state.settings;

const makeSelectResetPassword = () => createSelector(
  userSelector,
  state => state.accSettings,
);

const makeSelectCurrentPlan = () => createSelector(
  userSelector,
  state => state.currentPlan,
);

const makeSelectTeamMembers = () => createSelector(
  userSelector,
  state => state.teamMembers,
);


export {
  makeSelectResetPassword,
  makeSelectCurrentPlan,
  makeSelectTeamMembers,
};
