// Pure functions only perform a calculation and nothing more.
// By strictly only writing your components as pure functions, you can avoid an entire class of baffling bugs and unpredictable behavior as your codebase grows.

// Purity: Components as formulas 
// a pure function is a function with the following characteristics:
//	It minds its own business. It does not change any objects or variables that existed before it was called.
//	Same inputs, same output. Given the same inputs, a pure function should always return the same result.


// React assumes that every component you write is a pure function.
// This means that React components you write must always return the same JSX given the same inputs:
function Recipe({ drinkers }) {
  return (
    <ol>    
      <li>Boil {drinkers} cups of water.</li>
      <li>Add {drinkers} spoons of tea and {0.5 * drinkers} spoons of spice.</li>
      <li>Add {0.5 * drinkers} cups of milk to boil and sugar to taste.</li>
    </ol>
  );
}

// When you pass drinkers={2} to Recipe, it will return JSX containing 2 cups of water. Always.
// If you pass drinkers={4}, it will return JSX containing 4 cups of water. Always.
export default function KeepingComponentsPure() {
  return (
    <section>
      <h1>Spiced Chai Recipe</h1>
      <h2>For two</h2>
      <Recipe drinkers={2} />
      <h2>For a gathering</h2>
      <Recipe drinkers={4} />
    </section>
  );
}


// wrong:The problem is that the component changed a preexisting variable while rendering.
// let guest = 0;

// function Cup() {
//   // Bad: changing a preexisting variable!
//   guest = guest + 1;
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaSet() {
//   return (
//     <>
//       <Cup />
//       <Cup />
//       <Cup />
//     </>
//   );
// }

// fixed 1:Pure functions don’t mutate variables outside of the function’s scope or objects that were created before the call
// function Cup({ guest }) {
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaSet() {
//   return (
//     <>
//       <Cup guest={1} />
//       <Cup guest={2} />
//       <Cup guest={3} />
//     </>
//   );
// }

// fixed 2
// function Cup({ guest }) {
//   return <h2>Tea cup for guest #{guest}</h2>;
// }

// export default function TeaGathering() {
//   let cups = [];
//   for (let i = 1; i <= 12; i++) {
//     cups.push(<Cup key={i} guest={i} />);
//   }
//   return cups;
// }

// side effects
// They’re things that happen “on the side”, not during rendering.
// They usually belong inside event handlers. 
// Even though event handlers are defined inside your component, they don’t run during rendering!
// So event handlers don’t need to be pure.

// Why does React care about purity?
// Your components could run in a different environment
// You can improve performance by skipping rendering components whose inputs have not changed.
// If some data changes in the middle of rendering a deep component tree, React can restart rendering without wasting time to finish the outdated render.