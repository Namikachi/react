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