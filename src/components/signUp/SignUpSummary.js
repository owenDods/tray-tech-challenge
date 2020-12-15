import React from 'react';
import PropTypes from 'prop-types';

import storeShape from './utils/storeShape';

export const className = 'signUpSummary';

const SignUpSummary = ({ signUpStore }) => {

	const { name, role, email } = signUpStore;

	return (

		<div className={className}>

			<p>{name}</p>

			{role && (<p>{role}</p>)}

			<p>{email}</p>

		</div>

	);

};

SignUpSummary.propTypes = {
	signUpStore: PropTypes.shape(storeShape)
};

export default SignUpSummary;
