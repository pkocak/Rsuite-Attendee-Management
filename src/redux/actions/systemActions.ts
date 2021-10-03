/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { createAction } from "redux-smart-actions";

/**
 * GETTERS
 */

/**
 * SETTERS
 */
export const setLanguage = createAction("SET_LANGUAGE", (payload: string) => ({
  payload,
}));

export const setTheme = createAction(
  "SET_THEME",
  (payload: "dark" | "light") => ({
    payload,
  })
);
