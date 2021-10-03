/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

export interface SagaGenericParams<Type> {
  type: string;
  payload: Type;
}

/** USER **/
export type LoginParams = {
  email: string;
  password: string;
};

/** STATIC **/
