// Containment
function Contacts() {
	return <></>
}

function Chat() {
	return <></>
}

function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}

function CompositionVsInheritance() {
	return (
		<SplitPane
			left={<Contacts />}
			right={<Chat />} />
	);
}

export default CompositionVsInheritance