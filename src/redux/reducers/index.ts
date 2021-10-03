import { combineReducers } from "redux";

import appReducer from "./appReducer";
import languageReducer from "./languageReducer";
import systemReducer from "./systemReducer";
import userReducer from "./userReducer";

export default combineReducers({
  app: appReducer,
  locale: languageReducer,
  system: systemReducer,
  user: userReducer,
});
