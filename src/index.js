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

// so it is checking if the user is logged in and if we have the user
// got it, we do not store the information about user in application but because it is in form of subscription
// we are getting it from "up-stream"
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    console.log(user.email);
    console.log(user.uid);
  } else {
    console.log("no user");
  }
});
