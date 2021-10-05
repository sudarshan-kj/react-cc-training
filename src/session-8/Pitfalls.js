//pitfall 1

const Button = (onClick, children) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);

















//How would we log the props. We will have to add a body, just to add a console.log statement
const Button = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);





















//React props key is undefined

//1:
const List = ({ users }) => (
  <ul>
    {users.map((user) => (
      <Item key={user.id}>{user.name}</Item>
    ))}
  </ul>
);

const Item = ({ children }) => <p>{children}</p>;

//2:

const List = ({ users }) => (
  <ul>
    {users.map((user) => (
      <Item key={user.id}>{user.name}</Item>
    ))}
  </ul>
);

const Item = ({ key, children }) => (
  <p>
    {key} {children}
  </p>
);

//3:

const List = ({ users }) => (
  <ul>
    {users.map((user) => (
      <Item key={user.id} id={user.id}>
        {user.name}
      </Item>
    ))}
  </ul>
);

const Item = ({ id, children }) => (
  <p>
    {id} {children}
  </p>
);
