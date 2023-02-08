// Often, several components need to reflect the same changing data.
// Sometimes, we want these two inputs to be in sync with each other.
// We recommend lifting the shared state up to their closest common ancestor.
// “lifting state up” = sharing state is accomplished by moving it up to the closest common ancestor of the components that need it
// If the Calculator owns the shared state, it becomes the “source of truth” for the current temperature in both inputs.

import { useState } from 'react';

function toCelsius(fahrenheit) {
	return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
	return (celsius * 9 / 5) + 32;
}

// It returns an empty string on an invalid temperature, and it keeps the output rounded to the third decimal place
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

function TemperatureInput(props) {
	const temperature = props.temperature;
	const scale = props.scale;
	return (
		<fieldset>
			<legend>Enter temperature in {scaleNames[scale]}:</legend>
			<input value={temperature} onChange={e => props.onTemperatureChange(e.target.value)} />
		</fieldset>
	)
}

function LiftingStateUp() {
	const [state, setState] = useState({scale: 'c', temperature: ''});
	const scale = state.scale;
	const temperature = state.temperature;
	const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
	const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
	return (
		<div>
			<TemperatureInput
				scale="c"
				temperature={celsius}
				onTemperatureChange={(temperature) => setState({scale: 'c', temperature})} />
			<TemperatureInput
				scale="f"
				temperature={fahrenheit}
				onTemperatureChange={(temperature) => setState({scale: 'f', temperature})} />
			<BoilingVerdict
				celsius={parseFloat(celsius)} />
		</div>
	);
}

export default LiftingStateUp;