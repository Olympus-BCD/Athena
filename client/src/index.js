import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import SiteRouter from './site';
import App from './app';

ReactDOM.render(
	<Router>
		<div>
			<Switch>
				<Route exact path='/' component={SiteRouter} />
				<Route exact path='/login' component={SiteRouter} />
				<Route exact path='/register' component={SiteRouter} />
				<Route component={App} />
			</Switch>
		</div>
	</Router>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
