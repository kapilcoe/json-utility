import React from 'react';
import {validJSON} from '../utils/helpers'

export default class TextArea extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = {};
	}

	update() {
		if(validJSON(this.refs.json.value))
		this.props.onFill(JSON.parse(this.refs.json.value));
	}

	render() {
		let areaClassName = this.props.type + 'textarea';
		return <div className = {areaClassName} >
					<textarea className ="area" placeholder="ENTER JSON HERE"  ref="json" onChange = {this.update.bind(this)}></textarea>
				</div>
	}
}