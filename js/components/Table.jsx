import React from 'react';
import ArrayList from './Array.jsx';
import Cell from './Cell.jsx';
import JSON from './JSON.jsx';
import {getDataType, drawTable, validJSON, populateHeight} from '../utils/helpers';


export default class Table extends React.Component {
	constructor(props) {
		super(props);
		this.ctx = null;
		this.height = 0;
		this.previousHeight = 0;
	}

	componentWillUpdate(nextProps) {
	}

	drawTable() {
			var canvasElement = document.getElementById("myCanvas");
			if(canvasElement) { 
				var ctx = canvasElement.getContext("2d");
				ctx.clearRect(0,0, 1100, 1600);
				populateHeight(this.props.json);
				console.log(this.props.json);
				drawTable(ctx, 60 , 1000, this.props.json);
			}
			
	}

	draw() {
		setTimeout(this.drawTable.bind(this),0);
	}


	render() {
		return <div className="table">
				<p className = "table-head"> TABLE </p>
				<canvas id="myCanvas" width="1500" height="1000"></canvas>

				{this.draw()}
				</div>
	}
}