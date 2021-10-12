import React from "react";

//1: Create a List Component that renders a list of items from an array. The list could be any list of your choice.

const carBrands = ["Mercedes", "Audi", "BMW"];

const ArrayList = () => (
  <div>
    <ul>
      {carBrands.map((carBrand) => (
        <li>{carBrand}</li>
      ))}
    </ul>
  </div>
);

export default ArrayList;
