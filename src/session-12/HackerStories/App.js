import List from "./components/List";
import Search from "./components/Search";
import styles from "./App.module.css";
import StateForSearch from "./components/StateForSearch";
import React, { useState, useEffect, useReducer } from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import InputWithLabel from "./components/InputWithLabel";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "STORIES_FETCH_FAILURE":
      return { ...state, data: [], isLoading: false, isError: true };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter((i) => action.payload.objectID !== i.objectID),
      };
    default:
      throw new Error();
  }
};

function App() {
  const [searchTerm, setSearchTerm] = usePersistenceState(
    "customSearchTerm",
    ""
  );

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}react`)
      .then((res) => res.json())
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits,
        });
      })
      .catch(() => {
        dispatchStories({ type: "STORIES_FETCH_FAILURE" });
      });
  }, []);

  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onHandleDeleteItem = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  const filteredStories = stories.data.filter((story) =>
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
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={filteredStories} handleDeleteItem={onHandleDeleteItem} />
      )}
      {stories.isError && <p>Something went wrong..</p>}
    </div>
  );
}
export default App;
