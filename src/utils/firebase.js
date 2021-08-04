import firebase from "firebase/app";
// to get access to additional features of firebase you need to import them
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

//initialization of the app
firebase.initializeApp(firebaseConfig);

//instant of our firestore
export const db = firebase.firestore();

export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// exporting references - normal
export const carCollection = db.collection("cars");

// reference to specific document
export const siteRef = db.doc("site/business");

//reference to nested collection
export const employeeRef = db
  .collection("site")
  .doc("employees")
  .collection("admins");

//accessing collection
// snapshot - in world of firebase it is something what we are bringing from DB from FB
db.collection("cars")
  .get()
  .then((snapshot) => {
    console.log(snapshot);
    // it is not regular forEach - it is coming from FB
    snapshot.forEach((doc) => {
      // we are getting documents but still with all additional data
      console.log(doc);
      // without ID
      console.log(doc.data());
    });
  })
  .catch((e) => {
    console.log(e);
  });

export default firebase;
