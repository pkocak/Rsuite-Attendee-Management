import { produce } from "immer";
import { SystemReducer } from "../../types";
import * as A from "../actions/systemActions";

const initialState: SystemReducer = {
  language: "tr",
  theme: "light",
};

const settingsReducer = produce((draft: SystemReducer, action: any) => {
  switch (action.type) {
    case A.setLanguage.toString():
      draft.language = action.payload;
      break;
    case A.setTheme.toString():
      draft.theme = action.payload;
      break;
  }
}, initialState);

export default settingsReducer;
