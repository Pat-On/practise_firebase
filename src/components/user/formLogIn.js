import React, { Component } from "react";
import firebase, { usersCollection } from "../../utils/firebase";

class FormLogIn extends Component {
  state = {
    register: false,
    // register: true,
    user: {
      email: "steve@gmail.com",
      password: "12345678",
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
        .then((user) => {
          this.handleStoreRegisterUser(user);

          console.log(user);

          // firebase.auth().currentUser.sendEmailVerification() -> if you do not have user object you have to fetch it again from db

          user.user.sendEmailVerification().then(() => {
            console.log("mail sent");
          });
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

  // getting  information about the user
  handleGetUser = () => {
    let getUser = firebase.auth().currentUser;
    if (getUser) {
      // big weird object of user -> plenty of properties and methods
      // we can modify the user by the methods provided on user object
      // console.log(getUser);
      getUser.getIdToken().then((res) => {
        console.log(res);
      });
      getUser.getIdTokenResult().then((res) => {
        console.log(res);
      });
    } else {
      console.log(" no user");
    }
  };

  handleStoreRegisterUser = (data) => {
    // data in that case are going to be information about the user and the account what he created
    // so there is no special method to do it, we have to just create pipe to connect the user authentication or additional information
    // to save them in db
    usersCollection
      .doc(data.user.uid)
      .set({
        email: data.user.email,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // very simple way of login out
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("user logged out");
      });
  };

  handleUpdateProfile = () => {
    // to proceed any actions You need access to the user objects where You have these methods.
    let getUser = firebase.auth().currentUser;
    console.log("I got here");
    // we can add basic things to user object like displayed name and the link url to photo
    // this information are stored in bahind scene so You are not going to see them inside the admin panel in firebase inside user list
    getUser
      .updateProfile({
        displayName: "Steve",
        photoURL: "https://somethingsomwhere.com/photo.jpeq",
      })
      .then(() => {
        console.log(getUser);
        console.log("I got here");
      });
  };

  handleUpdateEmail = () => {
    let getUser = firebase.auth().currentUser;
    // another way it will refresh everything and authorize us
    // it is not going to take place inside user but in auth - it is update for email
    let credential = firebase.auth.EmailAuthProvider.credential(
      // You can use it inside the popup where You would get this information - here just demo
      "newemail@gmail.com",
      "12345678"
    );
    if (getUser) {
      //                email
      // interesting it is not going to allow you to change email if you are not freshly logged in
      // undefined it is mean that update was successfully
      // getUser.updateEmail("newemail@gmail.com").then((res) => {
      //   console.log(res);
      // });

      // method inside the user so there is user object and authentication object
      getUser.reauthenticateWithCredential(credential).then((res) => {
        getUser.updateEmail("steve@gmail.com");
      });
    }
  };

  handleGoogleSignin = () => {
    // /creating the EmailAuthProvider
    const provider = new firebase.auth.GoogleAuthProvider(); // is it going to create instance of it
    firebase
      .auth()
      // we are going to provide pop up of it
      .signInWithPopup(provider)
      .then((result) => {
        // store on FIRESTORE
        this.handleStoreRegisterUser(result);
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
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
        <hr />
        <button onClick={() => this.handleLogout()}>Log out</button>
        <hr />
        <button onClick={() => this.handleGetUser()}>Ask about the user</button>
        <hr />
        <button onClick={() => this.handleUpdateEmail()}>
          Update user email
        </button>
        <hr />
        <button onClick={() => this.handleUpdateProfile()}>
          Update user profile
        </button>
        <hr />
        <button onClick={() => this.handleGoogleSignin()}>
          Google sign in
        </button>
      </>
    );
  }
}

export default FormLogIn;
