import React from 'react';

export default class TextArea extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let areaClassName = this.props.type + 'textarea';
		return <div className = {areaClassName} >
					<div className ="area" placeholder="ENTER JSON HERE" ></div>
				</div>
	}
}