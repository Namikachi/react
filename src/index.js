import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import HelloWorld from './HelloWorld';
import IntroducingJsx from './IntroducingJsx';
import ComponentsAndProps from './ComponentsAndProps';
import StateAndLifecycle from './StateAndLifecycle';
import reportWebVitals from './reportWebVitals';

// To render a React element, first pass the DOM element to ReactDOM.createRoot(), then pass the React element to root.render():
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <HelloWorld />
    <div>{IntroducingJsx}</div>
    <ComponentsAndProps />
    <StateAndLifecycle />
  </>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
