// ■ State is similar to props, but it is private and fully controlled by the component.
// Components need to “remember” things: the current input value, the current image, the shopping cart. In React, this kind of component-specific memory is called state.

// ----- before -----
//	- We call root.render() to change the rendered output
//	it misses a crucial requirement: the fact that the Clock sets up a timer and updates the UI every second should be an implementation detail of the Clock.

// const root = ReactDOM.createRoot(document.getElementById('root'));

// function Clock(props) {
//   return (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {props.date.toLocaleTimeString()}.</h2>
//     </div>
//   );
// }

// function tick() {
//   // Ideally we want to write this once and have the Clock update itself:
//   root.render(<Clock date={new Date()} />);
// }

// setInterval(tick, 1000);

// ----- after -----
import React from 'react';
class StateAndLifecycle extends React.Component {
	// Class components should always call the base constructor with props.
	constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

	// it runs after the component output has been rendered to the DOM
	componentDidMount() {
		this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

	// it is invoked immediately before a component is unmounted and destroyed
  componentWillUnmount() {
		clearInterval(this.timerID);
  }

	tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

// this component is truly isolated. Each component sets up its own timer and updates independently.

export default StateAndLifecycle

// ■ How to modify state
// Wrong
// this.state.comment = 'Hello';

// Correct
// this.setState({comment: 'Hello'});

// Wrong : This code may fail to update the counter
//         Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state.
// this.setState({
//   counter: this.state.counter + this.props.increment,
// });

// ■ State Updates May Be Asynchronous
// Correct : That function will receive the previous state as the first argument, and the props at the time the update is applied as the second argument:
// this.setState((state, props) => ({
//   counter: state.counter + props.increment
// }));

// Correct
// this.setState(function(state, props) {
//   return {
//     counter: state.counter + props.increment
//   };
// });

// ■ The useState Hook
//	1. A state variable to retain the data between renders.
//	2. A state setter function to update the variable and trigger React to render the component again.
// In React, useState, as well as any other function starting with ”use”, is called a Hook.
// Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page). 


