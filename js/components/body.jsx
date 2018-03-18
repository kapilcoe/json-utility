import React from 'react';
import { connect } from 'react-redux';
import TextArea from './TextArea.jsx';
import PrettyJSON from './PrettyJSON.jsx';
import Table from './Table.jsx';

class Body extends React.Component {
	constructor(props) {
		super(props);
	}


	onFill(json) {
		let {dispatchSet} = this.props;
		dispatchSet({type: 'SET', json});

	}

	render(){
		 
		return	<div className = 'body'>
					<div>
						<TextArea type="input" onFill={this.onFill.bind(this)} />
						<PrettyJSON type = "result" json = {this.props.json}/>
					</div>
					<br/>
					<hr/>
					<br/>
					<Table json = {this.props.json} cellHeight={this.props.cellHeight}/>
				</div>
		
	}
}

const mapStateToProps = state => {
	return {
		json: state.json,
		cellHeight: state.height
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchSet: (action) => { dispatch(action) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);