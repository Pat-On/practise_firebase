import React, { Component } from "react";
import Form from "./form";
import FormLogIn from "./formLogIn";

class Login extends Component {
  render() {
    return (
      <>
        <h1>Register</h1>
        <Form />
        <hr />
        <h1>Login</h1>
        <FormLogIn />
      </>
    );
  }
}

export default Login;
