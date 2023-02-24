// Setting state triggers renders 
//	This means that for an interface to react to the event, you need to update the state.
//	In this example, when you press “send”, setIsSent(true) tells React to re-render the UI:
	// import { useState } from 'react';

	// export default function Form() {
	// 	const [isSent, setIsSent] = useState(false);
	// 	const [message, setMessage] = useState('Hi!');
	// 	if (isSent) {
	// 		return <h1>Your message is on its way!</h1>
	// 	}
	// 	return (
	// 		<form onSubmit={(e) => {
	// 			e.preventDefault();
	// 			setIsSent(true);
	// 			sendMessage(message);
	// 		}}>
	// 			<textarea
	// 				placeholder="Message"
	// 				value={message}
	// 				onChange={e => setMessage(e.target.value)}
	// 			/>
	// 			<button type="submit">Send</button>
	// 		</form>
	// 	);
	// }

	// function sendMessage(message) {
	// 	// ...
	// }

//	1. The onSubmit event handler executes.
//	2. setIsSent(true) sets isSent to true and queues a new render.
//	3. React re-renders the component according to the new isSent value.

// Rendering takes a snapshot in time 
//	When React re-renders a component:
//	1. React calls your function again.
//	2. Your function returns a new JSX snapshot.
//	3. React then updates the screen to match the snapshot you’ve returned.

//	Setting state only changes it for the next render. During the first render,
//	number was 0. This is why, in that render’s onClick handler,
//	the value of number is still 0 even after setNumber(number + 1) was called:
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
			{/* Even though you called setNumber(number + 1) three times,
			in this render’s event handler number is always 0, so you set the state to 1 three times. */}
      <button onClick={() => {
        setNumber(number + 1);
        setNumber(number + 1);
        setNumber(number + 1);
      }}>+3</button>
    </>
  )
}