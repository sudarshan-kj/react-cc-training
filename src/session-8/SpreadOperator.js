//props spread

const Title = ({ title }) => <h1>{title}</h1>;

const Description = ({ description }) => <p>{description}</p>;

const Greeting = ({ subject, description }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description description={description} />
  </div>
);

export default function App() {
  const greeting = {
    subject: "React",
    description: "Your component library for ...",
    type: "library",
  };

  return (
    <div>
      <Greeting {...greeting}/>
    </div>
  );
}




















//props spread with rest

const Greeting = ({ subject, ...other }) => (
  <div>
    <Title title={`Welcome to ${subject}`} />
    <Description {...other} />
  </div>
);

//in chrome dev tools, we will now be looking at the cloning objects



















//with default value

const Greeting = ({ subject = "Introduction to Programming", description }) => {
  return (
    <div>
      <Title title={`Welcome to ${subject}`} />
      <Description description={description} />
    </div>
  );
};

















// this is the react way!

Greeting.defaultProps = {
  subject: "Earth",
};























//children prop

const Button = ({ onClick, children }) => (
  <button onClick={onClick} type="button">
    {children}
  </button>
);

//children as function -> Render prop
