// One of the many great parts of React is how it makes you think about apps as you build them.
// Use the same techniques for deciding if you should create a new function or object.
// One such technique is the single responsibility principle, that is, a component should ideally only do one thing.
// If it ends up growing, it should be decomposed into smaller subcomponents.
// That’s because UI and data models tend to adhere to the same information architecture.

// Step 1: Break The UI Into A Component Hierarchy
// Step 2: Build A Static Version in React
	// The easiest way is to build a version that takes your data model and renders the UI but has no interactivity.
	// It’s best to decouple these processes because building a static version requires a lot of typing and no thinking,
	// and adding interactivity requires a lot of thinking and not a lot of typing.
	// You can build top-down or bottom-up.
	// In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up and write tests as you build.
	// The components will only have render() methods since this is a static version of your app.
	// You can see how your UI is updated and where to make changes. 
// Step 3: Identify The Minimal (but complete) Representation Of UI State
	// To make your UI interactive, you need to be able to trigger changes to your underlying data model. React achieves this with state.
	// Let’s go through each one and figure out which one is state.
	// 1. Is it passed in from a parent via props? If so, it probably isn’t state.
	// 2. Does it remain unchanged over time? If so, it probably isn’t state.
	// 3. Can you compute it based on any other state or props in your component? If so, it isn’t state.
// Step 4: Identify Where Your State Should Live
	// we need to identify which component mutates, or owns, this state.
	// ・Identify every component that renders something based on that state.
	// ・Find a common owner component (a single component above all the components that need the state in the hierarchy).
	// ・Either the common owner or another component higher up in the hierarchy should own the state.
	// ・If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.
// Step 5: Add Inverse Data Flow
	// update the states, support data flowing the other way

import {useState} from 'react';

function ProductCategoryRow(props) {
	const category = props.category;
	return (
		<tr>
			<th colSpan="2">
				{category}
			</th>
		</tr>
	);
}
	
function ProductRow(props) {
	const product = props.product;
	const name = product.stocked ?
		product.name :
		<span style={{color: 'red'}}>
			{product.name}
		</span>;

	return (
		<tr>
			<td>{name}</td>
			<td>{product.price}</td>
		</tr>
	);
}

function ProductTable(props) {
	const filterText = props.filterText;
	const inStockOnly = props.inStockOnly;

	const rows = [];
	let lastCategory = null;

	props.products.forEach((product) => {
		if (product.name.indexOf(filterText) === -1) {
			return;
		}
		if (inStockOnly && !product.stocked) {
			return;
		}
		if (product.category !== lastCategory) {
			rows.push(
				<ProductCategoryRow
					category={product.category}
					key={product.category} />
			);
		}
		rows.push(
			<ProductRow
				product={product}
				key={product.name}
			/>
		);
		lastCategory = product.category;
	});
	
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}
	
function SearchBar(props) {
	return (
		<form>
			<input
				type="text"
				placeholder="Search..."
				value={props.filterText}
				onChange={e => props.onFilterTextChange(e.target.value)}
			/>
			<p>
				<input
					type="checkbox"
					checked={props.inStockOnly}
					onChange={e => props.onInStockChange(e.target.checked)}
				/>
				{' '}
				Only show products in stock
			</p>
		</form>
	);
	}

function ThinkingInReact() {
	const [filterText, setFilterText] = useState('');
	const [inStockOnly, setInStockOnly] = useState(false);
	return (
		<div>
			<SearchBar
				filterText={filterText}
				inStockOnly={inStockOnly}
				onFilterTextChange={setFilterText}
				onInStockChange={setInStockOnly}
			/>
			<ProductTable
				products={PRODUCTS}
				filterText={filterText}
				inStockOnly={inStockOnly}
			/>
		</div>
	);
}

export default ThinkingInReact;
	
const PRODUCTS = [
	{category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
	{category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
	{category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
	{category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
	{category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
	{category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];