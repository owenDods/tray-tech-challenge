import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import SignUp from '../signUp/SignUp';

export const className = 'app';

const App = () => (

	<div className={className}>

		<Router>

			<Switch>

				<Route path="/signUp/:step" component={SignUp} />

				<Route path="/">

					<Redirect to="/signUp/0" />

				</Route>

			</Switch>

		</Router>

	</div>

);

export default App;
