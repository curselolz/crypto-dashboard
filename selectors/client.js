import { createSelector } from 'reselect';

const clientSelector = state => state.client;

const makeSelectClients = () => createSelector(
  clientSelector,
  state => state.clients,
);

export { makeSelectClients };
