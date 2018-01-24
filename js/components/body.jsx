import React from 'react';
import { connect } from 'react-redux';
import TextArea from './TextArea.jsx';
import PrettyJSON from './PrettyJSON.jsx';
import Table from './Table.jsx';

class Body extends React.Component {
	constructor(props) {
		super(props);
		this.json  = {
			"id": "0001",
			"type": "donut",
			"name": "Cake",
			"ppu": 0.55,
			"batters":
				{
					"batter":
						[
							{ "id": "1001", "type": "Regular" },
							{ "id": "1002", "type": "Chocolate" },
							{ "id": "1003", "type": "Blueberry" },
							{ "id": "1004", "type": "Devil's Food" }
						]
				},
			"topping":
				[
					{ "id": "5001", "type": "None" },
					{ "id": "5002", "type": "Glazed" },
					{ "id": "5005", "type": "Sugar" },
					{ "id": "5007", "type": "Powdered Sugar" },
					{ "id": "5006", "type": "Chocolate with Sprinkles" },
					{ "id": "5003", "type": "Chocolate" },
					{ "id": "5004", "type": "Maple" }
				]
		}

	}

	onFill(json) {
		let {dispatchSet} = this.props;
		dispatchSet({type: 'SET'}, json);

	}

	render(){
		 
		return	<div className = 'body'>
					<div>
						<TextArea type="input" onFill={this.onFill} />
						<PrettyJSON type = "result" json = {this.json}/>
					</div>
					<br/>
					<hr/>
					<br/>
					<Table json={this.json} />
				</div>
		
	}
}

const mapStateToProps = state => {
	return {
		json: state.json
	}
}

const mapDispatchToProps = dispatch => {
	return {
		dispatchSet: (action) => { dispatch(action) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);