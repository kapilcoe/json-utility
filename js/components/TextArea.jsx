import React from 'react';

export default class TextArea extends React.Component {
	constructor(props) {
		super(props);
		this.textInput = {};
	}

	render() {
		let areaClassName = this.props.type + 'textarea';
		return <div className = {areaClassName} >
					<textarea className ="area" placeholder="ENTER JSON HERE"  ref={(input) => { this.textInput = input; }}></textarea>
				</div>
	}
}