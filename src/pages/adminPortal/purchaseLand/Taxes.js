// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useFormik } from 'formik';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Button from '../../../components/bootstrap/Button';
import NewTaxesRepeater from './NewTaxesRepeater';
import NewExpensesRepeater from './NewExpensesRepeater';
import ViewTaxesRecords from './modals/ViewTaxesRecords';
import ViewExpensesRecords from './modals/ViewExpensesRecords';

const validate = (values) => {
	const errors = {};
	if (!values.validationFirstName) {
		errors.validationFirstName = 'Required';
	} else if (values.validationFirstName.length > 15) {
		errors.validationFirstName = 'Must be 15 characters or less';
	}

	if (!values.validationLastName) {
		errors.validationLastName = 'Required';
	} else if (values.validationLastName.length > 20) {
		errors.validationLastName = 'Must be 20 characters or less';
	}

	if (!values.validationCustomUsername) {
		errors.validationCustomUsername = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.validationCustomUsername)) {
		errors.validationCustomUsername = 'Invalid email address';
	}

	if (!values.validationCity) {
		errors.validationCity = 'Please provide a valid city.';
	}

	if (!values.validationState) {
		errors.validationState = 'Please select a valid state.';
	}

	if (!values.validationZip) {
		errors.validationZip = 'Please provide a valid zip.';
	} else if (values.validationZip.length !== 5) {
		errors.validationZip = 'Must be 5 characters';
	}

	if (!values.validationDesc) {
		errors.validationDesc = 'Please provide a valid Desc.';
	} else if (values.validationDesc.length < 20) {
		errors.validationDesc = `Must be 20 characters or more, but currently ${values.validationDesc.length} characters`;
	}

	if (!values.validationRadios) {
		errors.validationRadios = 'You must choose one before posting.';
	}

	if (!values.validationCheck) {
		errors.validationCheck = 'You must agree before submitting.';
	}

	return errors;
};

const ValidationPage = () => {
	const formik = useFormik({
		initialValues: {
			validationFirstName: '',
			validationLastName: '',
			validationCustomUsername: '',
			validationCity: '',
			validationState: '',
			validationZip: '',
			validationDesc: '',
			validationRadios: '',
			validationCheck: false,
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div className='row'>
			<div className='col-12'>
				<Card stretch tag='form' noValidate onSubmit={formik.handleSubmit}>
					<div className='mx-auto' style={{ width: 200 }}>
						<CardHeader>
							<CardLabel>
								<CardTitle>Taxes Details</CardTitle>
							</CardLabel>
						</CardHeader>
					</div>
					<CardBody>
						<div className='row g-4'>
							<NewTaxesRepeater />
						</div>
						<div className='row g-4'>
							<FormGroup className='col-md-6' label='	Total Taxes Paid'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>PKR</InputGroupText>
									<Input
										readOnly
										id='validationtotal_amount'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.validationtotal_amount}
									/>
									{/* <ViewTaxesRecords /> */}
								</InputGroup>
							</FormGroup>
						</div>
					</CardBody>
					<div className='mx-auto' style={{ width: 200 }}>
						<CardHeader>
							<CardLabel>
								<CardTitle>Expenses Details</CardTitle>
							</CardLabel>
						</CardHeader>
					</div>
					<CardBody>
						<div className='row g-4'>
							<NewExpensesRepeater />
						</div>
						<div className='row g-4'>
							<FormGroup className='col-md-6' label='	Total Expenses '>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>PKR</InputGroupText>
									<Input
										readOnly
										id='validationtotal_amount'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.validationtotal_amount}
									/>
									{/* <ViewExpensesRecords /> */}
								</InputGroup>
							</FormGroup>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterLeft>
							<Button type='reset' color='info' isOutline onClick={formik.resetForm}>
								Reset
							</Button>
						</CardFooterLeft>
						<CardFooterRight>
							{/* <Button
								type='submit'
								color='primary'
								isDisable={!formik.isValid && !!formik.submitCount}>
								Submit form
							</Button> */}
						</CardFooterRight>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default ValidationPage;
