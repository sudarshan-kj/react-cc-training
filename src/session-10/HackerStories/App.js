import List from "./components/List";
import Search from "./components/Search";
import styles from "./App.module.css";
import StateForSearch from "./components/StateForSearch";
import React, { useState, useEffect } from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import InputWithLabel from "./components/InputWithLabel";

const initStories = [
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
    objectID: 2,
  },
  {
    title: "In Search Of Lost Time",
    url: "https://redux.js.org/",
    author: "Marcel Proust",
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
  {
    title: "Ulysses",
    url: "https://reactjs.org/",
    author: "James Joyce",
    num_comments: 3,
    points: 4,
    objectID: 4,
  },
  {
    title: "100 years of solitude",
    url: "https://redux.js.org/",
    author: "Gabriel Garcia",
    num_comments: 2,
    points: 5,
    objectID: 5,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = usePersistenceState(
    "customSearchTerm",
    ""
  );
  const [stories, setStories] = useState(initStories);
  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveStory = (item) => {
    const newStories = stories.filter(
      (story) => item.objectID !== story.objectID
    );
    setStories(newStories);
  };
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleOnSearch}
        type="text"
      >
        <strong>Search For Stories</strong>
      </InputWithLabel>
      <h4>Searching for: {searchTerm} </h4>
      <List stories={filteredStories} handleRemoveStory={handleRemoveStory} />
    </div>
  );
}
export default App;
