import React, { Component } from "react";
import firebase, { storageRef, usersRef } from "../../utils/firebase";

class Upload extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
  };

  handleUpload = (e) => {
    e.preventDefault();
    console.log(this.state);
    //there should be added validation of course
    const { image } = this.state;

    // without using reference
    // storageRef
    //   .child(`/images/users/${image.name}`) // it is like directory
    //   .put(image) // we are telling what to upload
    //   .then(() => {
    //     console.log("filed uploaded");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    //by using reference
    usersRef
      .child(`${image.name}`) // it is like directory
      .put(image) // we are telling what to upload
      .then(() => {
        console.log("filed uploaded");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState({
        image,
      });
    }
    e.preventDefault();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <label>File</label>
            <input
              className="form-control"
              type="file"
              onChange={this.handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Upload File
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default Upload;
