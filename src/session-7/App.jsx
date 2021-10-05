import List from "./components/List";
import Search from "./components/Search";
import styles from "./App.module.css";
import StateForSearch from "./components/StateForSearch";

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
];

function App() {
  return (
    <div className={styles.container}>
      <StateForSearch />
    </div>
  );
}
export default App;
