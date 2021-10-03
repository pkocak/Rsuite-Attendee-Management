import firebase from "firebase/app";
import ReduxSagaFirebase from "redux-saga-firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCJdAt4mqZ4Ey6atI4RMLqwukmTSzsf-bQ",
  authDomain: "attendee-management-project.firebaseapp.com",
  databaseURL:
    "https://attendee-management-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attendee-management-project",
  storageBucket: "attendee-management-project.appspot.com",
  messagingSenderId: "499003675161",
  appId: "1:499003675161:web:3d1a1c503b79556078d088",
});

export const auth = app.auth();
export const sagaFirebase = new ReduxSagaFirebase(app);
export default app;
