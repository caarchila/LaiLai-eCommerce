import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./app.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Store from "./store/store";
import { Provider } from "react-redux";

//Axios Global IP
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "localhost:8080";

const store = Store();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
