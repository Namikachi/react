//  If some two state variables always change together, it might be a good idea to unify them into a single state variable.

// A
// const [x, setX] = useState(0);
// const [y, setY] = useState(0);

// B
// const [position, setPosition] = useState({ x: 0, y: 0 });

import { useState } from 'react';


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


export { FeedbackForm, Form }