// React events are named using camelCase, rather than lowercase.
// With JSX you pass a function as the event handler, rather than a string.
// You cannot return false to prevent default behavior in React. You must call preventDefault explicitly.
// Event handler functions:
//	・Are usually defined inside your components.
//	・Have names that start with handle, followed by the name of the event.
// By convention, it is common to name event handlers as handle followed by the event name. You’ll often see
// By convention, event handler props should start with on, followed by a capital letter.


// html
// <button onclick="activateLasers()">
//   Activate Lasers
// </button>

// React
// <button onClick={activateLasers}>
//   Activate Lasers
// </button>

function Button({ onClick, children }) {
  return (
    <button onClick={e => {
      e.stopPropagation();
      onClick();
    }}>
      {children}
    </button>
  );
}

function HandlingEvents() {
  return (
		<>
			<div className="Toolbar" onClick={() => {
				alert('You clicked on the toolbar!');
			}}>
				<Button onClick={() => alert('Playing!')}>
					Play Movie
				</Button>
				<Button onClick={() => alert('Uploading!')}>
					Upload Image
				</Button>
			</div>

			{/* Capture phase events */}
			<div onClickCapture={() => { /* this runs first */ }}>
				<button onClick={e => e.stopPropagation()} />
				<button onClick={e => e.stopPropagation()} />
			</div>

			{/* Preventing default behavior */}
			<form onSubmit={e => {
				e.preventDefault();
				alert('Submitting!');
			}}>
				<input />
				<button>Send</button>
			</form>
		</>
  );
}


// Maybe you want to log every click to analytics, regardless of the propagation logic. You can do this by adding Capture at the end of the event name:
// Each event propagates in three phases:
// 1. It travels down, calling all onClickCapture handlers.
// 2. It runs the clicked element’s onClick handler.
// 3. It travels upwards, calling all onClick handlers.
// Capture events are useful for code like routers or analytics, but you probably won’t use them in app code.

// e.stopPropagation() stops the event handlers attached to the tags above from firing.
// e.preventDefault() prevents the default browser behavior for the few events that have it.

export default HandlingEvents
