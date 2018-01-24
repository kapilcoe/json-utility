import React from 'react';
import Array from './Array.jsx';
import Cell from './Cell.jsx';
import JSON from './JSON.jsx';

export default class Table extends React.Component {
	constructor(props) {
		super(props);
	}

	renderObject(json) {
		return <JSON json={json}></JSON>
	}

	render() {
		return <div className="table">
				<p className = "table-head"> TABLE </p>
				{this.renderObject(this.props.json)}
				</div>
	}
}