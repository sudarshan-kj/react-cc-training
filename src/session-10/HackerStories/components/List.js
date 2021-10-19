import styles from "./List.module.css";

function List({ stories, handleDeleteItem }) {
  return (
    <div>
      <ol>
        {stories.map(function (item, index) {
          return (
            <li key={index}>
              <span className={styles.item}>
                <a href={item.url}>{item.title}</a>
              </span>
              <span className={styles.item}>{item.author}</span>
              <span className={styles.item}>{item.num_comments}</span>
              <span className={styles.item}>{item.points}</span>
              <span>
                <button onClick={() => handleDeleteItem(item)}>Delete</button>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
export default List;
