/**
 * RSUITE ATTENDEE MANAGEMENT PANEL
 *
 * @author Mehmet Polat KOÇAK <mehmetpolatkocak@gmail.com>
 * @format
 * @flow strict-local
 */

import { GlobalStrings } from "react-localization";
import { UserObject } from "./object";

export interface RootState {
  app: AppReducer;
  locale: LanguageReducer;
  system: SystemReducer;
  user: UserReducer;
}

export interface AppReducer {
  loading: boolean;
}

export interface LanguageReducer {
  attendees: GlobalStrings<string>;
  auth: GlobalStrings<string>;
  components: GlobalStrings<string>;
  error: GlobalStrings<string>;
  registration: GlobalStrings<string>;
  sidebar: GlobalStrings<string>;
}

export interface SystemReducer {
  language: string;
  theme: "dark" | "light";
}

export interface UserReducer {
  user?: UserObject;
}

export interface ApiCallback<PayloadType = never>
  extends ApiSuccess<PayloadType>,
    ApiError {}
export interface ApiSuccess<PayloadType = never> {
  onSuccess: (message: string, payload?: PayloadType) => void;
}
export interface ApiError {
  onError: (message: string) => void;
}
