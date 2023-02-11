// By using useEffect Hook, you tell React that your component needs to do something after render.
// Does useEffect run after every render? Yes!
import React, { useState, useEffect, useRef } from 'react';

function UsingTheEffectHook() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default UsingTheEffectHook;

// two types of logic inside React components
// Rendering code (introduced in Describing the UI)
// lives at the top level of your component. This is where you take the props and state, transform them, and return the JSX you want to see on the screen. Rendering code must be pure. Like a math formula, it should only calculate the result, but not do anything else.
// Event handlers (introduced in Adding Interactivity)
// are nested functions inside your components that do things rather than just calculate them. An event handler might update an input field, submit an HTTP POST request to buy a product, or navigate the user to another screen. Event handlers contain “side effects” (they change the program’s state) and are caused by a specific user action (for example, a button click or typing).
// Effects run at the end of the rendering process after the screen updates.
// Keep in mind that Effects are typically used to “step out” of your React code and synchronize with some external system. This includes browser APIs, third-party widgets, network, and so on. 

// How to write effects
// To write an Effect, follow these three steps:
// 1. Declare an Effect. By default, your Effect will run after every render.
// 2. Specify the Effect dependencies. Most Effects should only re-run when needed rather than after every render. For example, a fade-in animation should only trigger when a component appears. Connecting and disconnecting to a chat room should only happen when the component appears and disappears, or when the chat room changes. You will learn how to control this by specifying dependencies.
// 3. Add cleanup if needed. Some Effects need to specify how to stop, undo, or clean up whatever they were doing. For example, “connect” needs “disconnect”, “subscribe” needs “unsubscribe”, and “fetch” needs either “cancel” or “ignore”. You will learn how to do this by returning a cleanup function.

function VideoPlayer({ src, isPlaying }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  
  // You can tell React to skip unnecessarily re-running the Effect by specifying an array of dependencies as the second argument to the useEffect call.
  // Specifying [isPlaying] as the dependency array tells React that it should skip re-running your Effect if isPlaying is the same as it was during the previous render. 
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
}

function VideoComponent() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <VideoPlayer
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
}

// useEffect(() => {
//   // This runs after every render
// });

// useEffect(() => {
//   // This runs only on mount (when the component appears)
// }, []);

// useEffect(() => {
//   // This runs on mount *and also* if either a or b have changed since the last render
// }, [a, b]);

function ChatRoom() {
  useEffect(() => {
    const connection = createConnection();
    connection.connect();

    // React will call your cleanup function each time before the Effect runs again, and one final time when the component unmounts (gets removed).
    // If your Effect subscribes to something, the cleanup function should unsubscribe
    // If your Effect animates something in, the cleanup function should reset the animation to the initial values
    return () => {
      connection.disconnect();
    };
  
  // The code inside the Effect does not use any props or state, so your dependency array is [] (empty). This tells React to only run this code when the component “mounts”, i.e. appears on the screen for the first time.
  }, []);
  return <h1>Welcome to the chat!</h1>;
}

function createConnection() {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}

// In development React remounts every component once immediately after its initial mount.
// In production, you would only see "✅ Connecting..." printed once. Remounting components only happens in development to help you find Effects that need cleanup.


// React always cleans up the previous render’s Effect before the next render’s Effect.
// This is why even if you type into the input fast, there is at most one timeout scheduled at a time.
function Playground() {
  const [text, setText] = useState('a');

  useEffect(() => {
    function onTimeout() {
      console.log('⏰ ' + text);
    }

    console.log('🔵 Schedule "' + text + '" log');
    const timeoutId = setTimeout(onTimeout, 3000);

    return () => {
      console.log('🟡 Cancel "' + text + '" log');
      clearTimeout(timeoutId);
    };
  }, [text]);

  return (
    <>
      <label>
        What to log:{' '}
        <input
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </label>
      <h1>{text}</h1>
    </>
  );
}

function PuttingItAllTogether() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(!show)}>
        {show ? 'Unmount' : 'Mount'} the component
      </button>
      {show && <hr />}
      {show && <Playground />}
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function onTick() {
      setCount(c => c + 1);
    }

    const intervalId = setInterval(onTick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return <h1>{count}</h1>;
}

// To trigger the bug, things need to happen in this order:
// Selecting 'Bob' triggers fetchBio('Bob')
// Selecting 'Taylor' triggers fetchBio('Taylor')
// Fetching 'Taylor' completes before fetching 'Bob'
// The Effect from the 'Taylor' render calls setBio('This is Taylor’s bio')
// Fetching 'Bob' completes
// The Effect from the 'Bob' render calls setBio('This is Bob’s bio')

// Bugs like this are called race conditions because two asynchronous operations are “racing” with each other, and they might arrive in an unexpected order.
// function Page() {
//   const [person, setPerson] = useState('Alice');
//   const [bio, setBio] = useState(null);
//   useEffect(() => {
       // for cleaning up
//     let ignore = false;
//     setBio(null);
//     fetchBio(person).then(result => {
         // for cleaning up
//       if (!ignore) {
//         setBio(result);
//       }
//     });
       // clean up
//     return () => {
//       ignore = true;
//     }
//   }, [person]);

//   return (
//     <>
//       <select value={person} onChange={e => {
//         setPerson(e.target.value);
//       }}>
//         <option value="Alice">Alice</option>
//         <option value="Bob">Bob</option>
//         <option value="Taylor">Taylor</option>
//       </select>
//       <hr />
//       <p><i>{bio ?? 'Loading...'}</i></p>
//     </>
//   );
// }

// To fix this race condition, add a cleanup function:
// Selecting 'Bob' triggers fetchBio('Bob')
// Selecting 'Taylor' triggers fetchBio('Taylor') and cleans up the previous (Bob’s) Effect
// Fetching 'Taylor' completes before fetching 'Bob'
// The Effect from the 'Taylor' render calls setBio('This is Taylor’s bio')
// Fetching 'Bob' completes
// The Effect from the 'Bob' render does not do anything because its ignore flag was set to true

export { VideoComponent, ChatRoom, PuttingItAllTogether, Counter }