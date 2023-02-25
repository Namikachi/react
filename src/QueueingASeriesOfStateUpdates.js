// React waits until all code in the event handlers has run before processing your state updates.

import { useState } from 'react';

export default function Counter() {
	const [number, setNumber] = useState(0);

	return (
		<>
			<h1>{number}</h1>
			<button onClick={() => {

				// the number will be 1.
				// setNumber(number + 1);
				// setNumber(number + 1);
				// setNumber(number + 1);

				// n => n + 1 is called an updater function.
				// the number will be 3.
				// setNumber(n => n + 1);
				// setNumber(n => n + 1);
				// setNumber(n => n + 1);

				// the number will be 6.
				// setNumber(number + 5);
        // setNumber(n => n + 1);

				// the number will be 42.
				setNumber(number + 5);
        setNumber(n => n + 1);
        setNumber(42);
			}}>+3</button>
		</>
	)
}
