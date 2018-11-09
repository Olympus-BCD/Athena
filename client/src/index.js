import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import SiteRouter from './site';
import App from './app';

ReactDOM.render(
	<Router>
		<div>
			<Route path='/' component={SiteRouter} />
			<Route path='/organization' component={App} />
		</div>
	</Router>
	, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
