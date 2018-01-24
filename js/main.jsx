import React from 'react';
import Header from './components/header.jsx';
import Body from './components/body.jsx';
import Footer from './components/footer.jsx';

export default class Main extends React.Component {
	constructor() {
		super();
	}

	render() {
		return <div>
					<Header></Header>
					<Body></Body>
					<Footer></Footer>
				</div>
		
	}
}