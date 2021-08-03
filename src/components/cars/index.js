import React, { useEffect, useState } from "react";
import { db, siteRef, employeeRef } from "../../utils/firebase";
import { firebaseLooper } from "../../utils/tools";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    db.collection("cars")
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
    </>
  );
};

export default Cars;
