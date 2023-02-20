//  If some two state variables always change together, it might be a good idea to unify them into a single state variable.

// A
// const [x, setX] = useState(0);
// const [y, setY] = useState(0);

// B
// const [position, setPosition] = useState({ x: 0, y: 0 });

import { useState } from 'react';
import { initialTravelPlan } from './places.js';

// -----------------------------
// Avoid contradictions in state
// -----------------------------
function FeedbackForm() {
  const [text, setText] = useState('');
	// 👎
	// ・If you forget to call setIsSent and setIsSending together,
	//	 you may end up in a situation where both isSending and isSent are true at the same time.
	// ・The more complex your component is, the harder it will be to understand what happened.
  // const [isSending, setIsSending] = useState(false);
  // const [isSent, setIsSent] = useState(false);

	// 👍
	// ・Since isSending and isSent should never be true at the same time,
	//	 it is better to replace them with one status state variable that may take one of three valid states: 'typing' (initial), 'sending', and 'sent':
	const [status, setStatus] = useState('typing');

  async function handleSubmit(e) {
    e.preventDefault();
    // setIsSending(true);
		setStatus('sending');
    await sendMessage(text);
		setStatus('sent');
    // setIsSending(false);
    // setIsSent(true);
  }

	const isSending = status === 'sending';
  const isSent = status === 'sent';

  if (isSent) {
    return <h1>Thanks for feedback!</h1>
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>How was your stay at The Prancing Pony?</p>
      <textarea
        disabled={isSending}
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <br />
      <button
        disabled={isSending}
        type="submit"
      >
        Send
      </button>
      {isSending && <p>Sending...</p>}
    </form>
  );
}

// Pretend to send a message.
function sendMessage(text) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  });
}

// -----------------------------
// Avoid redundant state 
// -----------------------------

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
	// 👎
	// fullName is redundant.
  // const [fullName, setFullName] = useState('');

	// 👍
	// You can always calculate fullName from firstName and lastName during render, so remove it from state.
	const fullName = firstName + ' ' + lastName;

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
    // setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
    // setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}

// -----------------------------
// Avoid duplication in state 
// -----------------------------
const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

function Menu() {
  const [items, setItems] = useState(initialItems);
	// 👎 The contents of the selectedItem is the same object as one of the items inside the items list.
	// 　 This means that the information about the item itself is duplicated in two places.
  // const [selectedItem, setSelectedItem] = useState(
  //   items[0]
  // );

	// 👍
	const [selectedId, setSelectedId] = useState(0);
	const selectedItem = items.find(item =>
    item.id === selectedId
  );

	function handleItemChange(id, e) {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What's your travel snack?</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
							// setSelectedItem(item);
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem.title}.</p>
    </>
  );
}

// -----------------------------
// Avoid deeply nested state
// -----------------------------
// If the state is too nested to update easily, consider making it “flat”.
// Here is one way you can restructure this data.
// Instead of a tree-like structure where each place has an array of its child places,
// you can have each place hold an array of its child place IDs.
// Then you can store a mapping from each place ID to the corresponding place.
function PlaceTree({
	// place,
	id,
	placesById
 }) {
  // const childPlaces = place.childPlaces;
	const place = placesById[id];
	const childIds = place.childIds;
  return (
    <li>
      {place.title}
      {/* {childPlaces.length > 0 && ( */}
			{childIds.length > 0 && (
        <ol>
          {/* {childPlaces.map(place => ( */}
					{childIds.map(childId => (
          <PlaceTree
						// key={place.id}
						// place={place}
						key={childId}
						id={childId}
						placesById={placesById}
					/>
          ))}
        </ol>
      )}
    </li>
  );
}

function TravelPlan() {
	const plan = initialTravelPlan;
  // const planets = plan.childPlaces;
  const root = plan[0];
  const planetIds = root.childIds;
  return (
    <>
      <h2>Places to visit</h2>
      <ol>
        {/* {planets.map(place => ( */}
				{planetIds.map(id => (
          <PlaceTree 
					// key={place.id}
					// place={place}
					key={id}
					id={id}
					placesById={plan}
					/>
        ))}
      </ol>
    </>
  );
}
// You can nest state as much as you like, but making it “flat” can solve numerous problems.
// It makes state easier to update, and it helps ensure you don’t have duplication in different parts of a nested object.

export { FeedbackForm, Form, Menu, TravelPlan }