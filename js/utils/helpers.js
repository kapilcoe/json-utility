import painter from './painter';
import _ from 'lodash';

const ARRAY_MULTIPLIER = 5;
const OBJECT_MULTIPLIER = 5;
export function getDataType(data) {
	return Array.isArray(data) ? 'array' : (typeof(data) === 'object') ? 'object' : 'primitive';
}

export function validJSON(json) {
	if(!json) return false;
	try{
		JSON.parse(json);
		return true;
	} catch(e) {
		return false;
	}
}
export function drawCell(ctx, height, width, x, y, object, isKey, fontSize) {
	painter.drawRectangle(ctx, height, width, x, y, object, isKey, fontSize);
}

var calculateRowHeight = function(object, totalHeight) {
	var cellCount = 0;
	var arrayCount = 0;
	var objectCount = 0;
	var type = getDataType(object);
	if(type === 'array') {
		_.each(object, function(val) {
			if(getDataType(val) === 'array') {
				cellCount += val.length;
			} else if(getDataType(val) === 'object') {
				cellCount += Object.keys(val).length;
			} else {
				cellCount ++;
			}
		})
	} else {
		_.forOwn(object, function(val, key) {
			if(getDataType(val) === 'array') {
				cellCount += val.length;
			} else if(getDataType(val) === 'object') {
				cellCount += Object.keys(val).length;
			} else {
				cellCount ++;
			}
		})
	}

	var cellHeight = totalHeight/cellCount;
	return _.map(object, function(val) {if(getDataType(val) === 'array') {return val.length * cellHeight} else if( getDataType(val) === 'object'){return Object.keys(val).length * cellHeight} else{ return cellHeight }});
}

export function drawObject(ctx, height, width, x, y, object) {
	var heights = calculateRowHeight(object, height);
	var keyFont = _.min(heights);
	var keyWidth = 0.2 * width;
	var valueWidth = 0.8 * width;
	var index = 0;
	_.forOwn(object, function(value, key) {
		var typeOfValue = getDataType(value);
		switch(typeOfValue) {
			case 'primitive': {
				drawCell(ctx, heights[index], keyWidth, x, y, key, true, keyFont);
				drawCell(ctx, heights[index], valueWidth, x + keyWidth, y, value);
				y = y + heights[index];
				break;
			}				
			case 'object' : {
				drawCell(ctx, heights[index], keyWidth, x, y, key, true, keyFont);
				drawObject(ctx, heights[index], valueWidth, x + keyWidth, y, value);
				y = y + heights[index];
				break;
			}
			case 'array' : {
				drawCell(ctx, heights[index], keyWidth, x, y, key, true, keyFont);
				drawArray(ctx, heights[index], valueWidth, x + keyWidth, y, value);
				y = y + heights[index];
				break;
			}
		}
		index ++;
	})
}

export function drawArray(ctx, height, width, x, y, object) {
	var heights = calculateRowHeight(object, height);
	_.each(object, function(value, index) {
		var typeOfValue = getDataType(value, index);
		switch(typeOfValue) {
			case 'primitive': {
				drawCell(ctx, heights[index], width, x, y, value);
				y = y + heights[index];
				break;
			}				
			case 'object' : {
				drawObject(ctx, heights[index], width, x, y, value);
				y = y + heights[index];
				break;
			}
			case 'array' : {
				drawArray(ctx, heights[index], width, x, y, value);
				y = y + heights[index];
				break;
			}
				
		}
	})
}


export function drawTable(ctx, height, width, object) {
	var type = getDataType(object);
	switch(type) {
		case 'primitive': 
			drawCell(ctx, height, width, 0, 0, object);
			break;
		case 'object':
			drawObject(ctx, height, width, 0, 0, object);
			break;
		case 'array':
			drawArray(ctx, height, width, 0, 0, object);
	}
}
