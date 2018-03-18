import { combineReducers } from 'redux';

const json = (state = {}, action) => {
	switch(action.type) {
		case 'SET':
			return action.json;
		default:
			return state;
	}
}

const cellHeight = (height = 60, action) => {
	switch(action.type) {
		case 'SET_HEIGHT' : 
			return action.height;
		default:
			return height;
	}
}

const appReducer = combineReducers({json}, {cellHeight});

export default appReducer;