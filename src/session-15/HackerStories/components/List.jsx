import { memo, useContext } from "react";
import { LabelContext } from "../App";
import "./List.css";

const List = memo(({ stories, handleDeleteItem }) => {
  return (
    <div>
      <ol>
        {stories.map(function (item, index) {
          return (
            <li key={index}>
              <span className="item">
                <a className="title" href={item.url}>
                  {item.title}
                </a>
              </span>
              <span className="item">{item.author}</span>
              <span className="item">{item.num_comments}</span>
              <span className="item">{item.points}</span>
              <span>
                <DeleteButton onClickHandler={() => handleDeleteItem(item)} />
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
});

const DeleteButton = ({ label, onClickHandler }) => {
  const deleteLabelContextValue = useContext(LabelContext);
  return (
    <button className="button button_small" onClick={onClickHandler}>
      {deleteLabelContextValue.deleteLabel}
    </button>
  );
};

export default List;
