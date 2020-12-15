import React from 'react';
import { shallow } from 'enzyme';

import FormInput, { className } from './FormInput';

describe('FormInput', () => {

	let value;
	let component;

	beforeEach(() => {

		value = 'Test Value';

		component = shallow(<FormInput />);

	});

	it('SHOULD render correctly', () => {

		expect(component.hasClass(`${className}--text`)).toBeTruthy();

		const labelContent = component.children(`.${className}__labelContent`);

		expect(labelContent.children()).toHaveLength(0);

		const input = component.children('input');

		expect(input.prop('type')).toEqual('text');
		expect(input.prop('id')).toBeUndefined();
		expect(input.prop('value')).toBeUndefined();
		expect(input.prop('checked')).toBeNull();

	});

	describe('AND its "label" prop is defined', () => {

		let label;

		beforeEach(() => {

			label = 'Test Label';

			component.setProps({ label });

		});

		it('SHOULD render additional content', () => {

			const labelContent = component.children(`.${className}__labelContent`);

			expect(labelContent.children()).toHaveLength(1);

			const labelEl = labelContent.children(`.${className}__label`);

			expect(labelEl.prop('htmlFor')).toBeUndefined();
			expect(labelEl.text()).toEqual(label);

		});

		describe('AND its "id" prop is defined', () => {

			it('SHOULD pass it to its relevant elements', () => {

				const id = 'Test-id';

				component.setProps({ id });

				const labelContent = component.children(`.${className}__labelContent`);
				const labelEl = labelContent.children(`.${className}__label`);

				expect(labelEl.prop('htmlFor')).toEqual(id);

				const input = component.children('input');

				expect(input.prop('id')).toEqual(id);

			});

		});

		describe('AND its "isRequired" prop is truthy', () => {

			it('SHOULD render additional content', () => {

				component.setProps({ isRequired: true });

				const labelContent = component.children(`.${className}__labelContent`);

				expect(labelContent.children()).toHaveLength(1);

				const labelEl = labelContent.children(`.${className}__label`);

				expect(labelEl.text()).toEqual(`${label}*`);

			});

		});

	});

	describe('AND its "error" prop is defined', () => {

		let error;

		beforeEach(() => {

			error = 'Test Error';

		});

		it('SHOULD gain an additional class', () => {

			expect(component.hasClass(`${className}--error`)).toBeFalsy();

			component.setProps({ error });

			expect(component.hasClass(`${className}--error`)).toBeTruthy();

		});

		it('SHOULD render additional content', () => {

			component.setProps({ error });

			const labelContent = component.children(`.${className}__labelContent`);

			expect(labelContent.children()).toHaveLength(1);

			const errorEl = labelContent.children(`.${className}__error`);

			expect(errorEl.text()).toEqual(error);

		});

	});

	describe('AND its "onChange" prop is defined', () => {

		let onChange;

		beforeEach(() => {

			onChange = jest.fn();

			component.setProps({ onChange });

		});

		describe('AND its input changes', () => {

			it('SHOULD call its "onChange" prop with apt args', () => {

				expect(onChange.mock.calls).toHaveLength(0);

				const input = component.children('input');

				input.prop('onChange')({ target: { value: 'New Value' } });

				expect(onChange.mock.calls).toHaveLength(1);
				expect(onChange.mock.calls[0][0]).toEqual('New Value');

			});

			describe('AND its "type" prop is "checkbox"', () => {

				beforeEach(() => {

					component.setProps({ type: 'checkbox' });

				});

				it('SHOULD call its "onChange" prop with apt args', () => {

					expect(onChange.mock.calls).toHaveLength(0);

					const input = component.children('input');

					input.prop('onChange')({ target: { value: 'New Value' } });

					expect(onChange.mock.calls).toHaveLength(1);
					expect(onChange.mock.calls[0][0]).toEqual(true);

				});

				describe('AND its "value" prop is truthy', () => {

					it('SHOULD call its "onChange" prop with apt args', () => {

						component.setProps({ value: true });

						expect(onChange.mock.calls).toHaveLength(0);

						const input = component.children('input');

						input.prop('onChange')({ target: { value: 'New Value' } });

						expect(onChange.mock.calls).toHaveLength(1);
						expect(onChange.mock.calls[0][0]).toEqual(false);

					});

				});

			});

		});

	});

	describe('AND its "value" prop is defined', () => {

		beforeEach(() => {

			component.setProps({ value });

		});

		it('SHOULD pass it to its input', () => {

			const input = component.children('input');

			expect(input.prop('value')).toEqual(value);
			expect(input.prop('checked')).toBeNull();

		});

		describe('AND its "type" prop is "checkbox"', () => {

			it('SHOULD pass it to its input', () => {

				component.setProps({ type: 'checkbox' });

				const input = component.children('input');

				expect(input.prop('value')).toEqual('');
				expect(input.prop('checked')).toBeTruthy();

			});

		});

	});

	describe('AND its "type" prop is "checkbox"', () => {

		it('SHOULD gain an additional class', () => {

			expect(component.hasClass(`${className}--checkbox`)).toBeFalsy();

			component.setProps({ type: 'checkbox' });

			expect(component.hasClass(`${className}--checkbox`)).toBeTruthy();

		});

		it('SHOULD pass it to its input', () => {

			component.setProps({ type: 'checkbox' });

			const input = component.children('input');

			expect(input.prop('type')).toEqual('checkbox');

		});

	});

});
