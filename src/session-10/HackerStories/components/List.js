import styles from "./List.module.css";

function List({ stories, handleRemoveStory }) {
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
                <button type="button" onClick={() => handleRemoveStory(item)}>
                  Dismiss
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
