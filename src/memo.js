// memo lets you skip re-rendering a component when its props are unchanged.
// Wrap a component in memo to get a memoized version of that component.
// parameters
//	Component: The component that you want to memoize.
//	optional arePropsEqual: A function that accepts two arguments: the component’s previous props, and its new props. It should return true if the old and new props are equal
// returns
//	memo returns a new React component.

// React will not always re-render it when its parent is being re-rendered unless its props have changed.
// Even when a component is memoized, it will still re-render when its own state changes. Memoization only has to do with props that are passed to the component from its parent.
import { createContext, memo, useContext, useState } from 'react';

function Memo() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  return (
    <>
      <label>
        Name{': '}
        <input value={name} onChange={e => setName(e.target.value)} />
      </label>
      <label>
        Address{': '}
        <input value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <GreetingMemo name={name} />
    </>
  );
}

const GreetingMemo = memo(function Greeting({ name }) {
  console.log('Greeting was rendered at', new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('Hello');
  return (
    <>
      <h3>{greeting}{name && ', '}{name}!</h3>
      <GreetingSelector value={greeting} onChange={setGreeting} />
    </>
  );
});

function GreetingSelector({ value, onChange }) {
  return (
    <>
      <label>
        <input
          type="radio"
          checked={value === 'Hello'}
          onChange={e => onChange('Hello')}
        />
        Regular greeting
      </label>
      <label>
        <input
          type="radio"
          checked={value === 'Hello and welcome'}
          onChange={e => onChange('Hello and welcome')}
        />
        Enthusiastic greeting
      </label>
    </>
  );
}

// 
const ThemeContext = createContext(null);

function MyApp() {
  const [theme, setTheme] = useState('dark');

  function handleClick() {
    setTheme(theme === 'dark' ? 'light' : 'dark'); 
  }

  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={handleClick}>
        Switch theme
      </button>
      <GreetingMyApp name="Taylor" />
    </ThemeContext.Provider>
  );
}

const GreetingMyApp = memo(function Greeting({ name }) {
  console.log("Greeting was rendered at", new Date().toLocaleTimeString());
  const theme = useContext(ThemeContext);
  return (
    <h3 className={theme}>Hello, {name}!</h3>
  );
});


export { Memo, MyApp }


// Note that Object.is(3, 3) is true, but Object.is({}, {}) is false.
// React compares old and new props by shallow equality:
// If you create a new object or array each time the parent is re-rendered, even if the individual elements are each the same, React will still consider it to be changed. 
// If the prop is an object, prevent the parent component from re-creating that object every time by using useMemo.

// function GroupsLanding({ person }) {
//   const hasGroups = person.groups !== null;
//   return <CallToAction hasGroups={hasGroups} />;
// }

// const CallToAction = memo(function CallToAction({ hasGroups }) {
//   // ...
// });
