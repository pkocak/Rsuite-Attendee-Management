import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useSelector } from "react-redux";
import reduxStore from "./redux/index";
import "./App.css";

import BaseScreen from "./screens/base-screen";
import { Loader } from "./components";
import { Login } from "./screens/auth";
import {
  isLoadingState,
  loggedInSelector,
  themeSelector,
} from "./redux/selectors";

import requireTheme from "./utils/RequireTheme";

const { store, persistor } = reduxStore();

function Nav() {
  const isLoading = useSelector(isLoadingState);
  const isLogged = useSelector(loggedInSelector);
  const theme = useSelector(themeSelector);

  useEffect(() => {
    requireTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {isLogged ? <BaseScreen /> : <Login />}
      {isLoading ? <Loader /> : null}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Nav />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
