import List from "./components/List";
import styles from "./App.module.css";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import SearchForm from "./components/SearchForm";

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
  const [url, setUrl] = useState(`${API_ENDPOINT}react`);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  }

  const handleSearchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      let response = await fetch(url);
      response = await response.json();
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: response.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleSearchStories();
  }, [handleSearchStories]);

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const onHandleDeleteItem = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  return (
    <div className={styles.container}>
      <SearchForm
        searchTerm={searchTerm}
        onSearchSubmit={handleSearchSubmit}
        onSearchInput={handleSearchInput}
      />
      <h4>Searching for: {searchTerm} </h4>
      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={stories.data} handleDeleteItem={onHandleDeleteItem} />
      )}
      {stories.isError && <p>Something went wrong..</p>}
    </div>
  );
}
export default App;
