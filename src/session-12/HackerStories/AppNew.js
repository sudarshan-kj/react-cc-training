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
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
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

  const handleOnSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    fetch(`${API_ENDPOINT}react`) // B
      .then((response) => response.json()) // C
      .then((result) => {
        dispatchStories({
          type: "STORIES_FETCH_SUCCESS",
          payload: result.hits, // D
        });
        console.log("Result is", result.hits);
      })
      .catch(() => dispatchStories({ type: "STORIES_FETCH_FAILURE" }));
  }, []);

  const onHandleDeleteItem = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
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
      {stories.isError && <p>Something went wrong ...</p>}
      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List stories={filteredStories} onRemoveItem={onHandleDeleteItem} />
      )}
    </div>
  );
}
export default App;
