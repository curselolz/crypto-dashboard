import { all } from 'redux-saga/effects';
import client from './client';
import user from './user';
/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([
    ...client,
    ...user,
  ]);
}
