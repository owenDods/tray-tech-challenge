import PasswordValidator from 'password-validator';

import map from 'lodash/fp/map';
import get from 'lodash/fp/get';

const passwordSchema = new PasswordValidator();
passwordSchema.min(10).digits(1).uppercase(1).lowercase(1);

const passwordErrorMessages = {
	min: 'must be at least 10 characters long',
	digits: 'must contain at least 1 number',
	uppercase: 'must contain at least 1 uppercase letter',
	lowercase: 'must contain at least 1 lowercase letter'
};

export default password => {

	const brokenRules = passwordSchema.validate(password, { list: true });
	const passwordErrors = map(rule => get(rule, passwordErrorMessages), brokenRules);

	return passwordErrors;

};
