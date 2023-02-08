// We can combine the two by making the React state be the “single source of truth”.
// Then the React component that renders a form also controls what happens in that form on subsequent user input.
// An input form element whose value is controlled by React in this way is called a “controlled component”.

import { useState } from 'react';

function Forms() {
	const [isGoing, setIsGoing] = useState(true);
	const [numberOfGuests, setNumberOfGuests] = useState(true);

	return (
		<form>
			<label>
				Is going:
				<input
					name="isGoing"
					type="checkbox"
					checked={isGoing}
					onChange={() => setIsGoing(!isGoing)} />
			</label>
			<br />
			<label>
				Number of guests:
				<input
					name="numberOfGuests"
					type="number"
					value={numberOfGuests}
					onChange={e => setNumberOfGuests(e.target.value) } />
			</label>
		</form>
	)
}

export default Forms;