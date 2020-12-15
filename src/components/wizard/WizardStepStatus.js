import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/fp/map';

export const className = 'wizardStepStatus';

const stepClassName = `${className}__stepName`;
const getStepClassName = (stepNames, stepName, index) => (

	stepNames[index] === stepName ? `${stepClassName} ${stepClassName}--active` : stepClassName

);

const WizardStepStatus = ({ name, stepNames, index }) => (

	<div className={className}>

		{map.convert({ cap: false })((stepName, i) => (

			<label
				key={`${className}-${name}-${i}`}
				className={getStepClassName(stepNames, stepName, index)}
			>

				{stepName}

			</label>

		), stepNames)}

	</div>

);

WizardStepStatus.propTypes = {
	name: PropTypes.string.isRequired,
	stepNames: PropTypes.arrayOf(PropTypes.string),
	index: PropTypes.number
};

export default WizardStepStatus;
