import List from "./components/List";
import Search from "./components/Search";
import styles from "./App.module.css";
import StateForSearch from "./components/StateForSearch";
import React, { useState, useEffect } from "react";

const stories = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Karma",
    url: "https://reactjs.org/",
    author: "Sadhguru",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "In Search Of Lost Time",
    url: "https://redux.js.org/",
    author: "Marcel Proust",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Ulysses",
    url: "https://reactjs.org/",
    author: "James Joyce",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "100 years of solitude",
    url: "https://redux.js.org/",
    author: "Gabriel Garcia",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "React");
  const [filterTerm, setFilterTerm] = useState("");


  useEffect(() => {
    localStorage.setItem("searchTerm",searchTerm);
  }, [searchTerm])

  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Search searchTerm={searchTerm} onSearch={handleOnSearch} />
      <h4>Searching for: {searchTerm} </h4>
      <List stories={filteredStories} />
    </div>
  );
}
export default App;
