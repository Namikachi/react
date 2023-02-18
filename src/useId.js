// useId is a React Hook for generating unique IDs that can be passed to accessibility attributes.
// useId should not be used to generate keys in a list. Keys should be generated from your data.


import { useId } from 'react';

function PasswordField() {
  // A component may be rendered more than once on the page—but IDs have to be unique! Instead of hardcoding an ID, you can generate a unique ID with useId:
  const passwordHintId = useId();
  return (
    <>
      <label>
        Password:
        <input
          type="password"
          // aria-describedby="password-hint"
          aria-describedby={passwordHintId}
        />
      </label>
      {/* id="password-hint" */}
      <p id={passwordHintId}>
        The password should contain at least 18 characters
      </p>
    </>
  );
}

export default function UseId() {
  return (
    <>
      <h2>Choose password</h2>
      <PasswordField />
      <h2>Confirm password</h2>
      <PasswordField />
    </>
  );
}