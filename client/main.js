import React from "react";
import { render } from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import Routes from "./components/Routes";
import "../public/index.css";

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById("main")
);
