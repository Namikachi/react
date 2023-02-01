// to describe what the UI should look like
// to describe what you want to see on the screen
// Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called “components” that contain both.
// React doesn’t require using JSX
// most people find it helpful as a visual aid when working with UI inside the JavaScript code.
// It also allows React to show more useful error and warning messages.
// By default, React DOM escapes any values embedded in JSX before rendering them.
//	Thus it ensures that you can never inject anything that’s not explicitly written in your application.
//	Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.
// ※ XSS attacks enable attackers to inject client-side scripts into web pages viewed by other users.

// As the Web became more interactive, logic increasingly determined content.
// JavaScript was in charge of the HTML! This is why in React, rendering logic and markup live together in the same place—components.

// <></> = Fragment = <Fragment><Fragment/>

function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const IntroducingJsx = (
  <h2>
    Hello, {formatName(user)}!
  </h2>
);

export default IntroducingJsx;

