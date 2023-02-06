// A “key” is a special string attribute you need to include when creating lists of elements.
// Keys help React identify which items have changed, are added, or are removed.
// The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.
// Most often you would use IDs from your data as keys
// When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort
// ※ We don’t recommend using indexes for keys if the order of items may change.

// Keys serve as a hint to React but they don’t get passed to your components.
// If you need the same value in your component, pass it explicitly as a prop with a different name:

// You need to give each array item a key — a string or a number that uniquely identifies it among other items in that array:

// A well-chosen key provides more information than the position within the array. Even if the position changes due to reordering, the key lets React identify the item throughout its lifetime.

function ListItem(props) {
  // Wrong! There is no need to specify the key here:
  // <li key={value.toString()}>

  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function ListsAndKeys(props) {
  const numbers = props.numbers;
  // A good rule of thumb is that elements inside the map() call need keys.
  const listItems = numbers.map((number) =>
    // Wrong! The key should have been specified here:
    // <ListItem value={number} />

    // Correct! Key should be specified inside the array.
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

export default ListsAndKeys