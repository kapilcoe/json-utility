import React from 'react';
import ArrayList from './Array.jsx';
import Cell from './Cell.jsx';
import JSON from './JSON.jsx';
import {getDataType} from '../utils/helpers';
import { drawTable } from '../utils/helpers';
import { validJSON} from '../utils/helpers';

export default class Table extends React.Component {
	constructor(props) {
		super(props);
		this.ctx = null;
		this.height = 0;
		this.previousHeight = 0;
	}

	componentWillUpdate(nextProps) {
		this.height = 60 * (getDataType(nextProps.json) === 'array' ? nextProps.json.length : Object.keys(nextProps.json).length);
	}

	drawTable() {
			var canvasElement = document.getElementById("myCanvas");
			if(canvasElement) { 
				var ctx = canvasElement.getContext("2d");
				ctx.clearRect(0,0, 1100, 1600);
				this.previousHeight = this.height;
				drawTable(ctx, this.height , 1000, this.props.json);
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