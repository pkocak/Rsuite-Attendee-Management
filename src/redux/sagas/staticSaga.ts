import { takeLatest, put } from "@redux-saga/core/effects";
import { hideLoader, showLoader } from "../actions/appActions";
import { ApiCallback } from "../../types";
import * as A from "../actions/staticActions";
import * as P from "../../types/params";
import * as O from "../../types/object";
import * as firebaseFunctions from "../../utils/firebaseFunctions";

export interface AttendeesListActionParams
  extends ApiCallback<O.AttendeeObject[]> {}

function* getAttendeesListaga({
  payload,
}: P.SagaGenericParams<AttendeesListActionParams>) {
  yield put(showLoader());
  try {
    //@ts-ignore
    const response = yield firebaseFunctions.getAttendees();
    //@ts-ignore
    const responseVal: O.AttendeeObject[] = yield response.val();
    if (response) {
      payload.onSuccess("", responseVal);
    }
  } catch (e) {
    payload.onError("");
    console.log("ERROR getAttendeesListaga", e);
  } finally {
    yield put(hideLoader());
  }
}

const systemSaga = [
  takeLatest(A.getAttendeesList.toString(), getAttendeesListaga),
];

export default systemSaga;
