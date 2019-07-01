import storage from 'redux-persist/lib/storage';

const persistConfig = {
  active: true,
  reducerVersion: '1.1',
  storeConfig: {
    key: 'primary',
    storage, // localstorage by the default
    whitelist: ['user', 'client'],
  },
};

export default persistConfig;
