import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import map from 'lodash/fp/map';

import WizardStepStatus from './WizardStepStatus';

export const className = 'wizard';
const transitionTimeouts = {
	enter: 600,
	exit: 300
};

const Wizard = ({ index, name, steps = [], progessLabel = 'Next', handleProgress }) => {

	const hasNextChild = index < (steps.length - 1);
	const StepComponent = steps[index].component;
	const stepNames = map('name', steps);

	return (

		<div className={className}>

			<WizardStepStatus name={name} stepNames={stepNames} index={index} />

			<TransitionGroup className={`${className}__content`}>

				<CSSTransition
					timeout={transitionTimeouts}
					classNames={className}
					key={`${className}-${name}-${index}`}
					appear
					in
				>

					{cloneElement(<StepComponent />, steps[index].props)}

				</CSSTransition>

			</TransitionGroup>

			<CSSTransition
				timeout={transitionTimeouts}
				classNames={`${className}__progressButton`}
				in={hasNextChild}
				unmountOnExit
			>

				<button
					type="button"
					className={`${className}__progressButton`}
					onClick={handleProgress}
				>

					{progessLabel}

				</button>

			</CSSTransition>

		</div>

	);

};

Wizard.propTypes = {
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	steps: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		component: PropTypes.func
	})).isRequired,
	progessLabel: PropTypes.string,
	handleProgress: PropTypes.func
};

export default Wizard;
