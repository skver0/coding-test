import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider } from "urql";
import "./index.css";

if (module.hot) module.hot.accept();

import App from "./App";

// Replace this with your own API key
const GITHUB_AUTH_TOKEN = "";

const client = createClient({
  url: "https://api.github.com/graphql",
  fetchOptions: {
    headers: {
      Authorization: `bearer ${GITHUB_AUTH_TOKEN}`,
    },
  },
});

ReactDOM.render(
  <Provider value={client}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
