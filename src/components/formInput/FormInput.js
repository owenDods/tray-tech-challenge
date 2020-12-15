import React from 'react';
import PropTypes from 'prop-types';

export const className = 'formInput';

const FormInput = ({ type = 'text', label = '', id, value, onChange, error, isRequired }) => {

	const isCheckbox = type === 'checkbox';
	const handleChange = ({ target: { value: newValue } }) => {

		if (onChange) {

			const formattedNewValue = isCheckbox ? (!value) : newValue;

			onChange(formattedNewValue);

		}

	};

	let styleClass = `${className} ${className}--${type}`;
	styleClass = error ? `${styleClass} ${className}--error` : styleClass;

	return (

		<div className={styleClass}>

			<div className={`${className}__labelContent`}>

				{label && (

					<label className={`${className}__label`} htmlFor={id}>

						{label}

						{isRequired && (<span className={`${className}__required`}>*</span>)}

					</label>

				)}

				{error && (<label className={`${className}__error`}>{error}</label>)}

			</div>

			<input
				type={type}
				id={id}
				value={isCheckbox ? '' : value}
				onChange={handleChange}
				checked={isCheckbox ? !!value : null}
			/>

		</div>

	);

};

FormInput.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	id: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.bool
	]),
	onChange: PropTypes.func,
	error: PropTypes.string,
	isRequired: PropTypes.bool
};

export default FormInput;
