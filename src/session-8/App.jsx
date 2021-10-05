import { useState } from "react";
import styles from "./App.module.css";

function Button({ handleClick }) {
  return (
    <button onClick={handleClick} type="button">
      Toggle!
    </button>
  );
}

const Greeting = ({ greeting, isShow }) =>
  isShow ? <h1>{greeting}</h1> : null;

export default function App() {
  const [isShow, setShow] = useState(false);
  const greeting = "Welcome to React";
  const handleButtonClick = () => setShow((prev) => !prev);

  return (
    <div className={styles.container}>
      <Greeting greeting={greeting} isShow={isShow} />
      <Button handleClick={handleButtonClick} />
    </div>
  );
}

//modify to accept a handler
// pass is show to greeting
