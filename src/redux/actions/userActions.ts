/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import { UserObject } from "../../types/object";
import * as SagaParams from "../sagas/userSaga";

/**
 * GETTERS
 */
export const login = createAction(
  "LOGIN",
  (payload: SagaParams.LoginSagaParams) => ({ payload })
);

/**
 * SETTERS
 */

export const logout = createAction("LOGOUT");

export const setUser = createAction("SET_USER", (payload: UserObject) => ({
  payload,
}));
