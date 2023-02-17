// useRef is a React Hook that lets you reference a value that’s not needed for rendering.
// ・You can store information between re-renders (unlike regular variables, which reset on every render).
// ・Changing it does not trigger a re-render (unlike state variables, which trigger a re-render).
// ・The information is local to each copy of your component (unlike the variables outside, which are shared).

import { useRef } from 'react';

export default function UseRefCounter() {
  let ref = useRef(0);

  function handleClick() {
    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}