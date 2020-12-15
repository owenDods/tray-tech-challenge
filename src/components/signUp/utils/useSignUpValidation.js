import { useState, useEffect } from 'react';
import { validate as isValidEmail } from 'email-validator';

import keys from 'lodash/fp/keys';
import forEach from 'lodash/fp/forEach';
import pick from 'lodash/fp/pick';
import values from 'lodash/fp/values';

import getPasswordErrors from '../../utils/getPasswordErrors';

const validateName = (value = '') => {

	if (!value.length) {

		return 'A name is required';

	}

	return '';

};
const validateEmail = value => {

	if (!isValidEmail(value)) {

		return 'A valid email is required';

	}

	return '';

};
const validatePassword = value => {

	const passwordErrors = getPasswordErrors(value);

	if (passwordErrors.length) {

		return `A password must ${passwordErrors.join(', ')}`;

	}

	return '';

};

const validationMethods = {
	name: validateName,
	email: validateEmail,
	password: validatePassword
};
const requiredFields = keys(validationMethods);

const getErrorsForSignUpStore = store => {

	const errors = {};

	forEach(requiredField => {

		const error = validationMethods[requiredField](store[requiredField]);

		if (error) {

			errors[requiredField] = error;

		}

	}, requiredFields);

	return errors;

};

export default store => {

	const [ showErrors, setShowErrors ] = useState(false);
	const [ errors, setErrors ] = useState({});

	const requiredValues = values(pick(requiredFields, store));
	useEffect(() => {

		const newErrors = getErrorsForSignUpStore(store);

		setErrors(newErrors);

	}, requiredValues);

	return [ showErrors, setShowErrors, errors ];

};
