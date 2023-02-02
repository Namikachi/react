// This function is a valid React component because it accepts a single “props” object argument with data and returns a React element. We call such components “function components” because they are literally JavaScript functions.
// Props are Read-Only
// React lets you create components, reusable UI elements for your app.
// a React component is a JavaScript function that you can sprinkle with markup.
// Never define a component inside another component. Because it can be very slow and causes bugs.
// React components are regular JavaScript functions except:
//  1. Their names always begin with a capital letter.
//  2. They return JSX markup.

// function Welcome(props) {
//   return <h1>Hello, {props.name}</h1>;
// }

// ES6
// class Welcome extends React.Component {
//   render() {
//     return <h1>Hello, {this.props.name}</h1>;
//   }
// }

// function Profile(props) {
//   return (
//     <div className="card">
//       <Avatar {...props} />
//     </div>
//   );
// }

// When you nest content inside a JSX tag, the parent component will receive that content in a prop called children.
// For example, the Card component below will receive a children prop set to <Avatar /> and render it in a wrapper div:

function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

export default function ComponentsAndProps() {
  return (
    <Card>
      <p>Good Morning</p>
    </Card>
  );
}
// Props are read-only snapshots in time: every render receives a new version of props.
// You can’t change props. When you need interactivity, you’ll need to set state.

// Don’t try to “change props”. When you need to respond to the user input (like changing the selected color),
// you will need to “set state”, which you can learn about in State: A Component’s Memory.