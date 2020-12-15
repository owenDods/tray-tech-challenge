import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
	MemoryRouter,
	Route
} from 'react-router-dom';

import map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';

import Wizard from '../wizard/Wizard';
import { initialState as signUpStore } from './utils/useSignUpStore';

import SignUp, { className, signUpSteps } from './SignUp';

describe('SignUp', () => {

	let errorsObject;
	let component;

	beforeEach(() => {

		errorsObject = {
			name: 'A name is required',
			email: 'A valid email is required',
			password: 'A password must must be at least 10 characters long, must contain at least 1 number, must contain at least 1 uppercase letter, must contain at least 1 lowercase letter'
		};

		component = mount(

			<MemoryRouter initialEntries={[ '/signUp/0' ]}>

				<Route path="/signUp/:step" component={SignUp} />

			</MemoryRouter>

		);

	});

	it('SHOULD render correctly', () => {

		let wizard = component.find(Wizard);

		expect(wizard.prop('index')).toEqual(0);
		expect(wizard.prop('name')).toEqual(className);

		let expectedSteps = map(signUpStep => (

			{
				...signUpStep,
				props: {
					signUpStore,
					errors: errorsObject,
					showErrors: false
				}
			}

		), signUpSteps);
		let omittedSteps = map(step => (

			{ ...step, props: omit('updateField', step.props) }

		), wizard.prop('steps'));
		expect(omittedSteps).toEqual(expectedSteps);

		act(() => {

			wizard.prop('steps')[0].props.updateField('name', 'Test Name');

		});

		component.update();

		wizard = component.find(Wizard);

		const expectedStore = { ...signUpStore, name: 'Test Name' };
		expectedSteps = map(signUpStep => (

			{
				...signUpStep,
				props: {
					signUpStore: expectedStore,
					errors: omit('name', errorsObject),
					showErrors: false
				}
			}

		), signUpSteps);
		omittedSteps = map(step => (

			{ ...step, props: omit('updateField', step.props) }

		), wizard.prop('steps'));
		expect(omittedSteps).toEqual(expectedSteps);

	});

	describe('AND its Wizard\'s "handleProgress" prop is called whilst there are errors present', () => {

		it('SHOULD update its "showErrors" within its Wizard\'s "steps" prop', () => {

			let wizard = component.find(Wizard);

			act(() => {

				wizard.prop('handleProgress')();

			});

			component.update();

			wizard = component.find(Wizard);

			const expectedSteps = map(signUpStep => (

				{
					...signUpStep,
					props: {
						signUpStore,
						errors: errorsObject,
						showErrors: true
					}
				}

			), signUpSteps);
			const omittedSteps = map(step => (

				{ ...step, props: omit('updateField', step.props) }

			), wizard.prop('steps'));
			expect(omittedSteps).toEqual(expectedSteps);

		});

	});

	describe('AND its Wizard\'s "handleProgress" prop is called whilst there are no errors present', () => {

		it('SHOULD cause a redirect', () => {

			component = mount(

				<MemoryRouter>

					<SignUp />

					<Route path="/signUp/1">

						<h1>New Route</h1>

					</Route>

				</MemoryRouter>

			);

			expect(component.find('h1')).toHaveLength(0);

			let wizard = component.find(Wizard);

			act(() => {

				wizard.prop('steps')[0].props.updateField('name', 'Test Name');
				wizard.prop('steps')[0].props.updateField('email', 'test@test.com');
				wizard.prop('steps')[0].props.updateField('password', 'Abcde12345');

			});

			component.update();

			wizard = component.find(Wizard);

			act(() => {

				wizard.prop('handleProgress')();

			});

			component.update();

			expect(component.find('h1').text()).toEqual('New Route');

		});

	});

	describe('AND its "step" route param is not 0 whilst errors are present', () => {

		it('SHOULD cause a redirect', () => {

			component = mount(

				<MemoryRouter initialEntries={[ '/signUp/1' ]}>

					<Route path="/signUp/:step" component={SignUp} />

				</MemoryRouter>

			);

			const wizard = component.find(Wizard);

			expect(wizard.prop('index')).toEqual(0);

		});

	});

});
