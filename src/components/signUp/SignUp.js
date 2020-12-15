import React from 'react';
import { useParams, Redirect } from 'react-router-dom';

import getOr from 'lodash/fp/getOr';
import map from 'lodash/fp/map';
import isEmpty from 'lodash/fp/isEmpty';

import Wizard from '../wizard/Wizard';
import SignUpUserStep from './SignUpUserStep';
import SignUpPrivacyStep from './SignUpPrivacyStep';
import SignUpDoneStep from './SignUpDoneStep';

import useTrigger from '../utils/useTrigger';
import useSignUpStore from './utils/useSignUpStore';
import useSignUpValidation from './utils/useSignUpValidation';

export const className = 'signUp';
export const signUpSteps = [
	{
		name: 'User',
		component: SignUpUserStep,
		props: {}
	},
	{
		name: 'Privacy',
		component: SignUpPrivacyStep,
		props: {}
	},
	{
		name: 'Done',
		component: SignUpDoneStep,
		props: {}
	}
];

const SignUp = () => {

	const [ signUpStore, updateField ] = useSignUpStore();
	const [ showErrors, setShowErrors, errors ] = useSignUpValidation(signUpStore);
	const hasErrors = !isEmpty(errors);

	const step = Number(getOr(0, 'step', useParams()));
	const [ triggerNext, triggerProgress ] = useTrigger();
	const handleProgress = () => {

		if (hasErrors) {

			setShowErrors(true);

		} else {

			setShowErrors(false);
			triggerProgress();

		}

	};

	const shouldRedirectToFirstStep = hasErrors && (step !== 0);
	if (shouldRedirectToFirstStep) {

		return (<Redirect push to="/signUp/0" />);

	}

	const stepProps = { signUpStore, updateField, errors, showErrors };
	const signUpStepsWithProps = map(signUpStep => (

		{ ...signUpStep, props: stepProps }

	), signUpSteps);

	return (

		<div className={className}>

			<Wizard
				index={step}
				name={className}
				handleProgress={handleProgress}
				steps={signUpStepsWithProps}
			/>

			{triggerNext && (<Redirect push to={`/signUp/${step + 1}`} />)}

		</div>

	);

};

export default SignUp;
