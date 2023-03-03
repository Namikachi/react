// How declarative UI programming differs from imperative UI programming
// How to enumerate the different visual states your component can be in
// How to trigger the changes between the different visual states from code

// ↓↓↓↓↓ example of imperative UI programming ↓↓↓↓↓
// it gets exponentially more difficult to manage in more complex systems.

// async function handleFormSubmit(e) {
//   e.preventDefault();
//   disable(textarea);
//   disable(button);
//   show(loadingMessage);
//   hide(errorMessage);
//   try {
//     await submitForm(textarea.value);
//     show(successMessage);
//     hide(form);
//   } catch (err) {
//     show(errorMessage);
//     errorMessage.textContent = err.message;
//   } finally {
//     hide(loadingMessage);
//     enable(textarea);
//     enable(button);
//   }
// }
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


// In React, you don’t directly manipulate the UI—meaning you don’t enable, disable, show, or hide components directly.
// Instead, you declare what you want to show, and React figures out how to update the UI.
// ex) telling the driver where you want to go instead of telling them exactly where to turn

// Thinking about UI declaratively
// 1.Identify your component’s different visual states - First, you need to visualize all the different “states” of the UI the user might see:
// 2.Determine what triggers those state changes - Human inputs, Computer inputs - you must set state variables to update the UI.
// 3.Represent the state in memory using useState
// 4.Remove any non-essential state variables - reduce duplication, and avoid unintended meanings.
//    Your goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see.
//    Does this state cause a paradox? Is the same information available in another state variable already? Can you get the same information from the inverse of another state variable?
// 5.Connect the event handlers to set the state
export default function Form({
  // Try 'submitting', 'error', 'success':
  status = 'empty'
}) {
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form>
        <textarea disabled={
          status === 'submitting'
        } />
        <br />
        <button disabled={
          status === 'empty' ||
          status === 'submitting'
        }>
          Submit
        </button>
        {status === 'error' &&
          <p className="Error">
            Good guess but a wrong answer. Try again!
          </p>
        }
      </form>
      </>
  );
}