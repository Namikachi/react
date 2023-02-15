// useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
// Call useMemo at the top level of your component to cache a calculation between re-renders:

// useMemo(calculateValue, dependencies) 
//	A calculation function that takes no arguments, like () =>, and returns what you wanted to calculate.
//	A list of dependencies including every value within your component that’s used inside your calculation.


// import { useMemo } from 'react';

// function TodoList({ todos, tab }) {
//   const visibleTodos = useMemo(
//     () => filterTodos(todos, tab),
//     [todos, tab]
//   );
//   // ...
// }