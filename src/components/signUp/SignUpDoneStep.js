import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import SignUpSummary from './SignUpSummary';

import storeShape from './utils/storeShape';

export const className = 'signUpDoneStep';

const SignUpDoneStep = ({ signUpStore }) => {

	useEffect(() => {

		console.log(signUpStore);

	}, []);

	return (

		<div className={className}>

			<h2>&#x2713;</h2>

			<SignUpSummary signUpStore={signUpStore} />

			<p>Please verify your email address, you should have received an email from us already!</p>

		</div>

	);

};

SignUpDoneStep.propTypes = {
	signUpStore: PropTypes.shape(storeShape)
};

export default SignUpDoneStep;
