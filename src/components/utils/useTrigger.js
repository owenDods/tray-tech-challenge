import { useState, useEffect } from 'react';

const useTrigger = () => {

	const [ trigger, setTrigger ] = useState(false);
	const activateTrigger = () => setTrigger(true);
	useEffect(() => {

		if (trigger) {

			setTrigger(false);

		}

	}, [ trigger, setTrigger ]);

	return [ trigger, activateTrigger ];

};

export default useTrigger;
