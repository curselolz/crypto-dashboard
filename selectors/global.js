import { createSelector } from 'reselect';

const globalSelector = state => state.global;

const makeSelectIsLoggedOutUser = () => createSelector(
  globalSelector,
  state => state.isLoggedOutUser,
);

const makeSelectIsLoading = () => createSelector(
  globalSelector,
  state => state.isLoading,
);

export { makeSelectIsLoggedOutUser, makeSelectIsLoading };
