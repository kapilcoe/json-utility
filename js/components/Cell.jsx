import React from 'react';

export default class Cell extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var clsName = this.props.type === 'key' ? 'key' : 'value';
		return <div className = {clsName}>
					{this.props.content.toString()}
				</div>
	}
}