function List({ stories }) {
  return (
    <div>
      <ul>
        {stories.map(function (item) {
          return (
            <li>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>{item.author}</span>
              <span>{item.num_comments}</span>
              <span>{item.points}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default List;
