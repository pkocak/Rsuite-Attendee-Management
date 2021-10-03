import LocalizedStrings, {
  GlobalStrings,
  LocalizedStringsMethods,
} from "react-localization";
import { createSelector } from "reselect";
import { RootState } from "../../types";

/** APP **/
const loadingState = (state: RootState) => state.app.loading;
export const isLoadingState = createSelector(
  [loadingState],
  (loading) => loading
);

/** USER **/
const loggedInState = (state: RootState) => state.user.user;
export const loggedInSelector = createSelector(
  [loggedInState],
  (loading) => loading
);

/** SYSTEM **/
const languageState = (state: RootState) => state.system.language;
export const languageSelector = createSelector(
  [languageState],
  (language) => language
);

const themeState = (state: RootState) => state.system.theme;
export const themeSelector = createSelector([themeState], (theme) => theme);

/** LOCALE **/
const getUserLanguageState = (state: RootState) => state.system.language;
export const userLanguageState = createSelector(
  [getUserLanguageState],
  (lang) => lang
);

const returnLocolaziedString = (
  auth: GlobalStrings<string>,
  lang?: string
): LocalizedStringsMethods => {
  const l = new LocalizedStrings(auth);
  if (lang) l.setLanguage(lang);
  return l;
};

const getLocaleAttendees = (state: RootState) => state.locale.attendees;
export const getLocalizedAttendees = createSelector(
  [getLocaleAttendees, getUserLanguageState],
  (attendees, lang) => returnLocolaziedString(attendees, lang)
);

const getLocaleAuth = (state: RootState) => state.locale.auth;
export const getLocalizedAuth = createSelector(
  [getLocaleAuth, getUserLanguageState],
  (auth, lang) => returnLocolaziedString(auth, lang)
);

const getLocaleComponents = (state: RootState) => state.locale.components;
export const getLocalizedComponents = createSelector(
  [getLocaleComponents, getUserLanguageState],
  (components, lang) => returnLocolaziedString(components, lang)
);

const getLocaleErrors = (state: RootState) => state.locale.error;
export const getLocalizedErrors = createSelector(
  [getLocaleErrors, getUserLanguageState],
  (error, lang) => returnLocolaziedString(error, lang)
);

const getLocaleRegistration = (state: RootState) => state.locale.registration;
export const getLocalizedRegistration = createSelector(
  [getLocaleRegistration, getUserLanguageState],
  (registration, lang) => returnLocolaziedString(registration, lang)
);

const getLocaleSidebar = (state: RootState) => state.locale.sidebar;
export const getLocalizedSidebar = createSelector(
  [getLocaleSidebar, getUserLanguageState],
  (sidebar, lang) => returnLocolaziedString(sidebar, lang)
);
