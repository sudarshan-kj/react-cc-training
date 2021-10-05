function List({ stories, name, component: Component }) {
  return (
    <div>
      <h1>Name is: {name} </h1>
      <ul>
        {stories.map(function (item) {
          //Split the following into an Item component
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
      {<Component />}
    </div>
  );
}
export default List;
