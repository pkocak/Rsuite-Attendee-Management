/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";
import * as SagaParams from "../sagas/staticSaga";

/**
 * GETTERS
 */

/**
 * SETTERS
 */
export const getAttendeesList = createAction(
  "GET_ATTENDEES_LIST",
  (payload: SagaParams.AttendeesListActionParams) => ({ payload })
);
