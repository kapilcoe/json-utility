import { createStore } from 'redux';
import appReducers from './reducers/appReducer';
let store  = createStore(appReducers);
export default store;