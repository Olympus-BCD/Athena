import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import './index.css';

import Site from './Site';
import Login from './Login';
import Register from './Register';

class SiteRouter extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path='/' component={Site} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</div>
			</Router>
		);
	}
}

export default SiteRouter;