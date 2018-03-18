import painter from './painter';
import _ from 'lodash';

export function getDataType(data) {
	return Array.isArray(data) ? 'array' : (typeof(data) === 'object') ? 'object' : 'primitive';
}

function populateArrayWithHeight(array) {
	_.forEach(array, function(val) {
		if(getDataType(val) === 'array') {
			populateArrayWithHeight(val);
		}
		if(getDataType(val) === 'object') {
			populateObjectWithHeight(val);
		}
	});
	var count = 0;
	_.forEach(array, function(val) {
		if(getDataType(val) === 'primitive') {
			count++;
		} else {
			count+=Object.getPrototypeOf(val).h;
		}
	});
	Object.getPrototypeOf(array).h = count;
}

function populateObjectWithHeight(object) {
	_.forOwn(object, function(val, key){
		if(getDataType(val) === 'object') {
			populateObjectWithHeight(val);
		}
		if(getDataType(val) === 'array') {
			populateArrayWithHeight(val)
		}
	});
	var count = 0;
	_.forOwn(object, function(val, key) {
		if(getDataType(val) === 'primitive') {
			count++;
		} else {
			count+=Object.getPrototypeOf(val).h;
		}
	});
	Object.getPrototypeOf(object).h = count;
}

export function populateHeight(json) {
	switch(getDataType(json)) {
		case 'array' :
			populateArrayWithHeight(json); 
			break;
		case 'object' :
			populateObjectWithHeight(json);
			break;
	}
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


var cellHeight = 60;
export function drawObject(ctx, height, width, x, y, object) {
	var keyFont = 12;
	var keyWidth = 0.2 * width;
	var valueWidth = 0.8 * width;
	var index = 0;
	_.forOwn(object, function(value, key) {
		var typeOfValue = getDataType(value);
		switch(typeOfValue) {
			case 'primitive': {
				drawCell(ctx, cellHeight, keyWidth, x, y, key, true, keyFont);
				drawCell(ctx, cellHeight, valueWidth, x + keyWidth, y, value);
				y = y + cellHeight;
				break;
			}				
			case 'object' : {
				drawCell(ctx, cellHeight * Object.getPrototypeOf(value).h, keyWidth, x, y, key, true, keyFont);
				drawObject(ctx, cellHeight * Object.getPrototypeOf(value).h, valueWidth, x + keyWidth, y, value);
				y = y + cellHeight * Object.getPrototypeOf(value).h;
				break;
			}
			case 'array' : {
				drawCell(ctx, cellHeight * Object.getPrototypeOf(value).h, keyWidth, x, y, key, true, keyFont);
				drawArray(ctx, cellHeight * Object.getPrototypeOf(value).h, valueWidth, x + keyWidth, y, value);
				y = y + Object.getPrototypeOf(value).h;
				break;
			}
		}
		index ++;
	})
}

export function drawArray(ctx, height, width, x, y, object) {
	_.each(object, function(value, index) {
		var typeOfValue = getDataType(value, index);
		switch(typeOfValue) {
			case 'primitive': {
				drawCell(ctx, cellHeight, width, x, y, value);
				y = y + cellHeight;
				break;
			}				
			case 'object' : {
				drawObject(ctx, cellHeight * Object.getPrototypeOf(value).h, width, x, y, value);
				y = y + Object.getPrototypeOf(value).h;
				break;
			}
			case 'array' : {
				drawArray(ctx, cellHeight * Object.getPrototypeOf(value).h, width, x, y, value);
				y = y + cellHeight * Object.getPrototypeOf(value).h;
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
			drawObject(ctx, Object.getPrototypeOf(object).height * height, width, 0, 0, object);
			break;
		case 'array':
			drawArray(ctx, Object.getPrototypeOf(object).height * height, width, 0, 0, object);
	}
}
