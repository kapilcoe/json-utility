import React from 'react';
import _ from 'lodash';
import Cell from './Cell.jsx';
import ArrayList from './Array.jsx';

export default class JSON extends React.Component {
	constructor(props) {
		super(props);
		this.rows = [];
	}

	renderObject(object) {
		let rows = this.rows;
		_.forOwn(object, function(value, key) {
			var keyElement = <Cell type = "key" content={key}></Cell>;
			var valueType = typeof(value) === 'string' || typeof(value) === 'number' ? 'primitive' : (_.isArray(value) ? 'array' : 'object');
			var valueElement;
			switch(valueType) {
				case 'primitive':
					valueElement = <Cell content = {value}></Cell>
					break;
				case 'array':
					valueElement = <ArrayList array = {value}></ArrayList>
					break;
				case 'object': 
					valueElement = <JSON json = {value}></JSON> 
					break;
			}
			var row = <div className = "row">{keyElement}{valueElement}</div>
			rows.push(row);
		})
	}

	render() {
		return <div className="json">
				{ this.renderObject(this.props.json) }
				{_.each(this.rows, function(row){
					{row};
				})}
				</div>
	}
}