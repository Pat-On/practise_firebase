import { render } from "@testing-library/react";
import React, { Component } from "react";
import firebase, {
  storageRef,
  usersCollection,
  usersRef,
} from "../../utils/firebase";

import { Link } from "react-router-dom";

class ListUploads extends Component {
  state = {
    images: null,
  };

  componentDidMount() {
    this.handleGetAll();
  }

  // getting all
  handleGetAll = () => {
    // fetching the lists from the reference to the fire store:  const usersRef = storageRef.child("/images/users/");
    usersRef.listAll().then((data) => {
      let imagesArray = []; //emtpy array
      //   data.items.forEach((itemRef) => {
      //     // console.log(itemRef);
      //     imagesArray.push(itemRef);
      //   });
      data.items.forEach((itemRef) => {
        // console.log(itemRef);
        itemRef.getDownloadURL().then((url) => {
          imagesArray.push({
            name: itemRef.name,
            link: url,
          });
          this.setState({ images: imagesArray });
        });
      });
      //   this.setState({ images: imagesArray });
    });
  };

  // delete
  handleDelete = (name) => {
    usersRef
      .child(name)
      .delete()
      .then(() => {
        console.log("delete");

        this.handleGetAll();
      });
  };

  render() {
    return (
      <>
        {this.state.images
          ? this.state.images.map((item, index) => (
              <div key={index}>
                <strong>{item.name}</strong> -
                <Link to={{ pathname: item.link }} target="_blank">
                  Open It
                </Link>{" "}
                -
                <button onClick={() => this.handleDelete(item.name)}>
                  DELETE
                </button>
              </div>
            ))
          : null}
      </>
    );
  }
}

export default ListUploads;
