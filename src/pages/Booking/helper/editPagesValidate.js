const validate = (values) => {
	const errors = {};

	if (values.customers.length === 0) {
		errors.customers = 'Required!';
	}

	if (!values.plot) {
		errors.plot = 'Required!';
	}

	if (!values.paymentPlan) {
		errors.paymentPlan = 'Required!';
	}

	if (values.agent && !values.commission) {
		errors.commission = `Please Enter Agent's Commission!`;
	}

	console.log('errorse', errors);
	console.log('customers', values.customers);
	return errors;
};

export default validate;
