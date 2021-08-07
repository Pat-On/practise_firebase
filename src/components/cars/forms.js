import React, { Component } from "react";
import firebase, { db, firebaseTimestamp } from "../../utils/firebase";

class Form extends Component {
  state = {
    brand: "",
    color: "",
    price: "",
    available: "",
  };

  componentDidMount() {
    db.collection("cars")
      .doc("pKdehJ7tqPK4AlDv61F1")
      .update({
        // "dealers.sandiego": true,        .arrayRemove('Awesome)
        tags: firebase.firestore.FieldValue.arrayUnion("Awesome"), // You can not send the same element twice - unique values
        // if you would add one manually and in case you would delete both
        // You can do multiple updates! it work nice
        dealerrs: {
          virginia: true,
          washington: false,
          california: true,
          virginia2: true,
          washington2: false,
          california2: true,
          virginia22: true,
          washington22: false,
          california22: true,
        },
      })
      .then((data) => {
        // we are going to get undefined in that case - what is fine in that case
        // console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    // arrays once saved You can not change their values. You can create them or delete them or push values
    // You need to get entire array -> do change -> and push again entire array
  }

  handleForm = (e) => {
    e.preventDefault();
    // add to the db
    // db.collection("cars")
    //   .add({
    //     ...this.state,
    //     available: this.state.available === "true" ? true : false,
    //     price: parseInt(this.state.price),
    //     createdAt: firebaseTimestamp(),
    //   })
    //   .then((data) => {
    //     //if you are going to get id that mean everything is ok
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // db.collection("cars")
    //   //   .doc("whateverID") //here is going to be id if not specified it will randomize the id
    //   .doc()
    //   .set({
    //     ...this.state,
    //     available: this.state.available === "true" ? true : false,
    //     price: parseInt(this.state.price),
    //     createdAt: firebaseTimestamp(),
    //   })
    //   .then((data) => {
    //     // we are going to get undefined in that case - what is fine in that case
    //     console.log(data);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    // **********************************************************
    // update
    // db.collection("cars")
    //   .doc("whateverID")
    //   .update({
    //     ...this.state,
    //     available: this.state.available === "true" ? true : false,
    //     price: parseInt(this.state.price),
    //   });

    //
    db.collection("cars")
      .doc("pKdehJ7tqPK4AlDv61F1")
      // .set({
      .update({
        ...this.state,
        available: this.state.available === "true" ? true : false,
        price: parseInt(this.state.price),
        createdAt: firebaseTimestamp(),
        dealerrs: {
          virginia: true,
          washington: false,
          california: true,
        },
        tags: ["good", "comfortable", "expensive"],
      })
      .then((data) => {
        // we are going to get undefined in that case - what is fine in that case
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form onSubmit={(e) => this.handleForm(e)}>
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Color</label>
            <input
              type="text"
              className="form-control"
              name="color"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="text"
              className="form-control"
              name="price"
              onChange={(e) => this.changeHandler(e)}
            ></input>
          </div>

          <div className="form-group">
            <label>Available ?:</label>
            <select
              className="form-control"
              name="available"
              onChange={(e) => this.changeHandler(e)}
            >
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <hr />
      </>
    );
  }
}

// db.collection("cars")
//   .doc("pKdehJ7tqPK4AlDv61F1")
//   .onSnapshot((doc) => {
//     console.log("Current data", doc.data());
//   });

// if you are going to subscribe to something you need to unsubscribe because it would always run
// const carsSubscriprion = db.collection("cars").onSnapshot((querySnapshot) => {
//   querySnapshot.docChanges().forEach((change) => {
//     if (change.type === "added") {
//       console.log("added:", change.doc.data());
//     }
//     if (change.type === "modified") {
//       console.log("modified:", change.doc.data());
//     }
//     if (change.type === "removed") {
//       console.log("removed:", change.doc.data());
//     }
//   });
// });

//  You have to do : carsSubscription() to do cancel of subscription

export default Form;
