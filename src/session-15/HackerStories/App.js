import List from "./components/List";
import "./App.css";
import {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  createContext,
} from "react";
import usePersistenceState from "./hooks/usePersistenceState";
import axios from "axios";
import SearchForm from "./components/SearchForm";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

export const LabelContext = createContext(null);

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

const getNumberOfComments = (stories) => {
  return stories.reduce((sum, item) => sum + item.num_comments, 0);
};

function App() {
  console.log("1: Rendering App Component");
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

  const onHandleDeleteItem = useCallback((item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  });

  const numberOfcomments = useMemo(
    () => getNumberOfComments(stories.data),
    [stories]
  );

  return (
    <div className="container">
      <div className="card">
        <h1 className="headline-primary">
          My Hacker Stories {numberOfcomments} comments
        </h1>
        <LabelContext.Provider value={{ deleteLabel: "Remove" }}>
          <SearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
          />
          {stories.isLoading ? (
            <p>Loading...</p>
          ) : (
            <List
              stories={stories.data}
              handleDeleteItem={onHandleDeleteItem}
            />
          )}
        </LabelContext.Provider>
        {stories.isError && <p>Something went wrong..</p>}
      </div>
    </div>
  );
}
export default App;
