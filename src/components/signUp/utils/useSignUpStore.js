import { useReducer } from 'react';

export const initialState = {
	name: '',
	role: '',
	email: '',
	password: '',
	receiveUpdates: false,
	receiveUpdatesOther: false
};

const UPDATE_SIGN_UP_FIELD = 'UPDATE_SIGN_UP_FIELD';
const updateSignUpField = (field, value) => ({
	type: UPDATE_SIGN_UP_FIELD,
	field,
	value
});

const reducer = (state, action) => {

	switch (action.type) {

		case UPDATE_SIGN_UP_FIELD:

			return {
				...state,
				[action.field]: action.value
			};

		default:

			return state;

	}

};

export default () => {

	const [ state, dispatch ] = useReducer(reducer, initialState);
	const updateField = (field, value) => dispatch(updateSignUpField(field, value));

	return [ state, updateField ];

};
