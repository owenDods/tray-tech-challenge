import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../formInput/FormInput';

import storeShape from './utils/storeShape';

export const className = 'signUpUserStep';

const SignUpUserStep = ({ signUpStore, updateField, errors, showErrors }) => (

	<form className={className}>

		<FormInput
			label="Name"
			value={signUpStore.name}
			onChange={value => updateField('name', value)}
			error={showErrors ? errors.name : null}
			isRequired
		/>

		<FormInput
			label="Role"
			value={signUpStore.role}
			onChange={value => updateField('role', value)}
		/>

		<FormInput
			label="Email"
			type="email"
			value={signUpStore.email}
			onChange={value => updateField('email', value)}
			error={showErrors ? errors.email : null}
			isRequired
		/>

		<FormInput
			label="Password"
			type="password"
			value={signUpStore.password}
			onChange={value => updateField('password', value)}
			error={showErrors ? errors.password : null}
			isRequired
		/>

	</form>

);

SignUpUserStep.propTypes = {
	signUpStore: PropTypes.shape(storeShape),
	updateField: PropTypes.func,
	errors: PropTypes.shape({
		name: PropTypes.string,
		email: PropTypes.string,
		password: PropTypes.string
	}),
	showErrors: PropTypes.bool
};

export default SignUpUserStep;
