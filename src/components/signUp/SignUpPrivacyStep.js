import React from 'react';
import PropTypes from 'prop-types';

import FormInput from '../formInput/FormInput';

import storeShape from './utils/storeShape';

export const className = 'signUpPrivacyStep';

const SignUpPrivacyStep = ({ signUpStore, updateField }) => (

	<form className={className}>

		<FormInput
			type="checkbox"
			label="Receive updates about Tray.io product by email"
			id={`${className}-email-updates`}
			value={signUpStore.receiveUpdates}
			onChange={value => updateField('receiveUpdates', value)}
		/>

		<FormInput
			type="checkbox"
			label="Receive communicaiton by email for other products created by the Tray.io team"
			id={`${className}-email-updates-other`}
			value={signUpStore.receiveUpdatesOther}
			onChange={value => updateField('receiveUpdatesOther', value)}
		/>

	</form>

);

SignUpPrivacyStep.propTypes = {
	signUpStore: PropTypes.shape(storeShape),
	updateField: PropTypes.func
};

export default SignUpPrivacyStep;
