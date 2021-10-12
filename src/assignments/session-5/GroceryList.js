import React, { useState } from "react";
import styles from "./GroceryList.module.css";

const list = [
  {
    item: "Dal",
    type: "veg",
    id: 1,
  },
  {
    item: "Fish",
    type: "non-veg",
    id: 2,
  },
  {
    item: "Spinach",
    type: "veg",
    id: 3,
  },
  {
    item: "Eggs",
    type: "non-veg",
    id: 4,
  },
  {
    item: "Roti",
    type: "veg",
    id: 5,
  },
  {
    item: "Meat",
    type: "non-veg",
    id: 6,
  },
  {
    item: "Rice",
    type: "veg",
    id: 7,
  },
];

function filterOnType(arr, type) {
  return arr
    .filter((item) => item.type === type)
    .map((item) => <li key={item.id}>{item.item}</li>);
}

const GroceryList = (props) => {
  const [sortedList, setSortedList] = useState(list);

  function handleSort() {
    const sortedList = [...list.sort((a, b) => a.item.localeCompare(b.item))];
    setSortedList(sortedList);
  }

  return (
    <div className={styles.container}>
      <div className={styles.type}>
        <h3>Veg Items</h3>
        <ul>{filterOnType(list, "veg")}</ul>
        <button onClick={handleSort}>Sort</button>
      </div>
      <div className={styles.type}>
        <h3>Non Veg Items</h3>
        <ul>{filterOnType(list, "non-veg")}</ul>
      </div>
    </div>
  );
};

export default GroceryList;
