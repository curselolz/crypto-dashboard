/* global STRIPE_KEY */
/**
 * index.js
 *
 * This is the entry file for the application.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory as createHistory } from 'history';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from 'react-stripe-elements';
import {
  faSync,
  faRedo,
  faCheckCircle,
  faCaretUp,
  faCaretDown,
  faCreditCard,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

import App from './pages';

import configureStore from './configure-store';

import '../public/img/favicon.png';

library.add(faSync, faRedo, faCheckCircle, faCaretUp, faCaretDown, faCreditCard, faTrash);

// Create redux store with history
const history = createHistory();
export const { store, persistor } = configureStore(history);
const MOUNT_NODE = document.getElementById('TaxTokenApp');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StripeProvider apiKey={STRIPE_KEY}>
        <App />
      </StripeProvider>
    </PersistGate>
  </Provider>,
  MOUNT_NODE,
);
