import { all } from "redux-saga/effects";

import staticSaga from "./staticSaga";
import userSaga from "./userSaga";

export function* rootSaga() {
  yield all([...staticSaga, ...userSaga]);
}
