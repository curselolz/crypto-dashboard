/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import { persistStore, persistReducer } from 'redux-persist';
import createReducer from './reducers';
import sagas from './sagas';
import persistConfig from './persist-config';

export const reducers = createReducer();

const updateReducers = (store) => {
  const { reducerVersion } = persistConfig;

  const rehydrate = () => {
    store.getState();
  };
  let persistor;

  // Check to ensure latest reducer version
  try {
    const localVersion = localStorage.getItem('reducerVersion');
    if (localVersion !== reducerVersion) {
      // Purge store if changed version
      if (!localVersion) {
        persistor = persistStore(store, null, rehydrate);
      } else {
        persistor = persistStore(store, null, rehydrate).purge();
      }
      localStorage.setItem('reducerVersion', reducerVersion);
    } else {
      persistor = persistStore(store, null, rehydrate);
    }
  } catch (ex) {
    persistor = persistStore(store, null, rehydrate);
    localStorage.setItem('reducerVersion', reducerVersion);
  }

  return persistor;
};

const addEnhancers = (rootReducer, rootSaga, history) => {
  const sagaMiddleware = createSagaMiddleware();

  // Redux Configuration
  const middleware = [
    logger,
    sagaMiddleware,
    routerMiddleware(history),
  ];
  const enhancers = [
    applyMiddleware(...middleware),
  ];

  const store = createStore(rootReducer, compose(...enhancers));

  // configure persistStore and check reducer version number
  const persistor = updateReducers(store);

  // kick off root saga
  const sagasManager = sagaMiddleware.run(rootSaga);

  return {
    store,
    persistor,
    sagasManager,
    sagaMiddleware,
  };
};

export default function configureStore(history) {
  const finalReducers = persistReducer(persistConfig.storeConfig, reducers);

  let {
    store, persistor, sagasManager, sagaMiddleware,
  } = addEnhancers(
    finalReducers,
    sagas,
    history,
  );

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = persistReducer(persistConfig.storeConfig, require('./').reducers);
      store.replaceReducer(nextRootReducer);
      const newYieldedSagas = require('./sagas').default;
      sagasManager.cancel();
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas);
      });
    });
  }

  return {
    store,
    persistor,
  };
}
