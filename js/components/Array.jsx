import React from 'react';
import _ from 'lodash';
import JSON from './JSON.jsx';
import Cell from './Cell.jsx';
import { getDataType } from '../utils/helpers';

export default class ArrayList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var renderElement = function(element) {
		var valueElement;
		var elementType = getDataType(element);
			switch(elementType) {
				case 'primitive':
					valueElement = <Cell content = {element}></Cell>
					break;
				case 'array':
					valueElement = <ArrayList array = {element}></ArrayList>
					break;
				case 'object': 
					valueElement = <JSON json = {element}></JSON> 
					break;
			}
		return valueElement;
	}
		return <div className = 'array'>
				{_.map(this.props.array, function(element){
					return renderElement(element)
				})}
				</div>
	}
}