import React, { Component } from "react";
import firebase from "../../utils/firebase";

class LoginForm extends Component {
  state = {
    register: false,
    user: {
      email: "",
      password: "",
    },
  };

  handleForm = (e) => {
    e.preventDefault();
    const { email } = this.state.user;
    const { password } = this.state.user;
    if (this.state.register) {
      // we always have to import new service!
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [name]: value,
      },
    }));
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <button type="submit" className="btn btn-primary">
            {this.state.register ? "Register" : "Sign in"}
          </button>
        </form>
      </>
    );
  }
}

export default LoginForm;