import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";

//and that is it? with a import it would initialize a connection
import firebase from "./utils/firebase";

const dotenv = require("dotenv");
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
