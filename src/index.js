import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route,Switch,Redirect,BrowserRouter as Router} from "react-router-dom";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Router>
		<Route component={App} />
	</Router>
	, document.getElementById('root'));

serviceWorker.unregister();
