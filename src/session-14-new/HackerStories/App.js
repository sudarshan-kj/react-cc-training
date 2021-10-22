import List from "./components/List";
import React, { useState, useEffect, useReducer, useCallback } from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import axios from "axios";
import SearchForm from "./components/SearchForm";
import "./App.css";

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
    "react"
  );

  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

  const handleFetchStories = useCallback(async () => {
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const response = await axios.get(url);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: response.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const onHandleDeleteItem = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  return (
    <div className="container">
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
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
