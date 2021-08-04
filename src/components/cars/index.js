import React, { useEffect, useState } from "react";
import { db, siteRef, employeeRef } from "../../utils/firebase";
import { firebaseLooper } from "../../utils/tools";
import Form from "./forms";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    db.collection("cars")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        const cars = firebaseLooper(snapshot);
        console.log(cars);
        setCars((prevState) => {
          return cars;
        });
        // snapshot.forEach((doc) => {
        //   console.log(doc.data());
        //   console.log(doc.id);
        // });
      })
      .catch((e) => {
        console.log(e);
      });
    //get doc by id
    db.collection("cars")
      .doc("0SWgXHhXk2rUbR1IwEUO")
      .get()
      .then((snapshot) => {
        console.log(snapshot.data());
      });

    siteRef.get().then((querySnapshot) => {
      console.log(querySnapshot.data());
      //   console.log(snapshot); the same
    });
    employeeRef.get().then((querySnapshot) => {
      const employee = firebaseLooper(querySnapshot);
      console.log(employee);
      //   console.log(snapshot); the same
    });
  }, []);

  const getAllCars = () => {
    db.collection("cars")
      // where // operator // and equal to what
      .where("color", "!=", "red")
      .get()
      .then((snapshot) => {
        // console.log(snapshot.data()); //wrong
        const cars = firebaseLooper(snapshot);
        cars.forEach((item) => console.log(item)); // printing each item
        console.log(firebaseLooper(snapshot)); // printing array
      });

    db.collection("cars")
      // where // operator // and equal to what
      .where("price", ">=", 1000)
      .where("price", "<=", 5000)
      .get()
      .then((snapshot) => {
        // console.log(snapshot.data()); //wrong
        const cars = firebaseLooper(snapshot);
        cars.forEach((item) => console.log(item)); // printing each item
        console.log(firebaseLooper(snapshot)); // printing array
      });

    db.collection("cars")
      // by what and asc or desc
      .orderBy("price", "desc") //asc
      .get()
      .then((snapshot) => {
        // console.log(snapshot.data()); //wrong
        const cars = firebaseLooper(snapshot);
        cars.forEach((item) => console.log(item)); // printing each item
        console.log(firebaseLooper(snapshot)); // printing array
      });
  };

  const handleCarData = (cars) => {
    return cars
      ? cars.map((data, i) => (
          <tr key={i}>
            <th>{data.id}</th>
            <th>{data.brand}</th>
            <th>{data.color}</th>
            <th>{data.price}</th>
          </tr>
        ))
      : null;
  };

  return (
    <>
      <Form />
      <table className="table table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{handleCarData(cars)}</tbody>
      </table>
      <button onClick={getAllCars}>Fetch Cars</button>
    </>
  );
};

export default Cars;
