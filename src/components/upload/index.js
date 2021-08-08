import React, { Component } from "react";
import firebase, { storageRef, usersRef } from "../../utils/firebase";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.pauseRef = React.createRef();
    this.resumeRef = React.createRef();
    this.cancelRef = React.createRef();

    this.state = {
      image: null,
      url: "",
      progress: 0,
    };
  }

  componentDidMount() {
    // we can bring the pictures by putting their name - the name is the ID,
    const imageRef = usersRef.child("to_upload.jpg");
    imageRef.getDownloadURL().then((url) => {
      console.log("That is from component did mount", url);
    });
  }

  handleUpload = (e) => {
    // if the uploaded picture has the same name like upcoming one, the old one would be replaced
    e.preventDefault();
    console.log(this.state);
    //there should be added validation of course
    const { image } = this.state;
    const uploadTask = usersRef.child(`${image.name}`).put(image);

    // so we are going to have here access to three callback
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // whenever state changed
        // console.log(snapshot);
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({
          progress,
        });
        // console.log(snapshot.state);
        switch (snapshot.state) {
          case "canceled":
            console.log("user canceled");
            break;
          case "error":
            console.log("user error");
            break;
          case "paused":
            console.log("user paused");
            break;
          case "running":
            console.log("user running");
            break;
          case "success":
            console.log("user success");
            break;
          default:
            console.log("You should never see that");
        }
      },
      (error) => {
        // in case of error
        console.log(error);
        this.setState({
          progress: 0,
        });
      },
      (test) => {
        // successful
        console.log("upload done");
        console.log(test); // undefined -> so it provide "big" zero
        console.log(uploadTask.snapshot.ref);
        //access to the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          console.log(url);
        });
      }
    );

    this.pauseRef.current.addEventListener("click", () => {
      uploadTask.pause();
    });

    this.resumeRef.current.addEventListener("click", () => {
      uploadTask.resume();
    });

    this.cancelRef.current.addEventListener("click", () => {
      uploadTask.cancel();
    });

    // it work the same - reference
    // uploadTask
    //   .then(() => {
    //     console.log("filed uploaded");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

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

    //by using reference - upload task
    // usersRef
    //   .child(`${image.name}`) // it is like directory
    //   .put(image) // we are telling what to upload
    //   .then(() => {
    //     console.log("filed uploaded");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
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
          <progress value={this.state.progress} max="100" />
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

        <hr />
        <div className="form-group">
          <button className="btn btn-primary" ref={this.pauseRef}>
            PAUSE
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" ref={this.resumeRef}>
            RESUME
          </button>
        </div>
        <div className="form-group">
          <button className="btn btn-primary" ref={this.cancelRef}>
            CANCEL
          </button>
        </div>
      </>
    );
  }
}

export default Upload;
