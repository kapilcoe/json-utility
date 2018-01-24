import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main.jsx';
import { Provider } from 'react-redux';
import store from './store';
var div = document.getElementById('app');

ReactDOM.render(
	<Provider store = {store}>
		<Main />
	</Provider>, 
	div
);