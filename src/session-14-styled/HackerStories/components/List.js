import "./List.css";

function List({ stories, handleDeleteItem }) {
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
                <button
                  className="button button_small"
                  onClick={() => handleDeleteItem(item)}
                >
                  Delete
                </button>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default List;
