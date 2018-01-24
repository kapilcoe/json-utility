import { combineReducers } from 'redux';

const json = (state = {}, action) => {
	switch(action.type) {
		case 'SET':
			return action.json;
		default:
			return state;
	}
}

const appReducer = combineReducers({json});

export default appReducer;