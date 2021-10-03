import { takeLatest, put, call } from "@redux-saga/core/effects";
import { hideLoader, showLoader } from "../actions/appActions";
import { ApiCallback } from "../../types";
import * as A from "../actions/userActions";
import * as P from "../../types/params";

import { sagaFirebase } from "../../firebase";

export interface LoginSagaParams extends ApiCallback {
  params: P.LoginParams;
}

function* loginSaga({ payload }: P.SagaGenericParams<LoginSagaParams>) {
  yield put(showLoader());
  try {
    //@ts-ignore
    const response = yield call(
      sagaFirebase.auth.signInWithEmailAndPassword,
      payload.params.email,
      payload.params.password
    );
    if (response) {
      yield put(
        A.setUser({
          email: response.email,
          token: response.Aa,
          uid: response.uid,
        })
      );
      payload.onSuccess("");
    }
  } catch (e) {
    payload.onError(e.message);
    console.log("ERROR loginSaga", e.message);
  } finally {
    yield put(hideLoader());
  }
}

const systemSaga = [takeLatest(A.login.toString(), loginSaga)];

export default systemSaga;
