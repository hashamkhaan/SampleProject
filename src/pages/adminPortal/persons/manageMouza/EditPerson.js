// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useFormik } from 'formik';

import moment from 'moment';
import 'flatpickr/dist/themes/light.css';

import Spinner from '../../../../components/bootstrap/Spinner';

import baseURL from '../../../../baseURL/baseURL';
import Icon from '../../../../components/icon/Icon';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 25) {
		errors.name = 'Must be 25 characters or less';
	}

	return errors;
};

const AddCoeSubGroup = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	const _titleError = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Error Saving Record </span>
		</span>
	);

	const submitForm = (myFormik) => {
		const url = `${baseURL}/updateMouza`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(myFormik.values),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					props.refreshTableRecords();
					showNotification(_titleSuccess, res.message, 'success');

					myFormik.resetForm();
					props.handleStateEdit(false);
					setLastSave(moment());
				} else {
					showNotification(_titleError, res.message, 'danger');
					console.log('Error');
				}
			});
	};

	const formik = useFormik({
		initialValues: props.editingPersonData,
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		submitForm(formik);
		setLastSave(moment());
	};

	return (
		<div className='col-12'>
			<Card stretch tag='form' shadow='none' onSubmit={formik.handleSubmit}>
				<CardBody>
					<div className='row g-4'>
						<CardBody>
							<div className='row g-4'>
								<FormGroup id='name' label='Mouza Name' className='col-md-12'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values?.name}
										isValid={formik.isValid}
										isTouched={formik.touched.name}
										invalidFeedback={formik.errors.name}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</CardBody>
					</div>
				</CardBody>
				<CardFooter>
					<CardFooterLeft>
						<Button type='reset' color='info' isOutline onClick={formik.resetForm}>
							Reset
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							icon={isLoading ? null : 'Update'}
							isLight
							color={lastSave ? 'info' : 'success'}
							isDisable={isLoading}
							onClick={() => {
								// eslint-disable-next-line no-plusplus
								if (formik.isValid) {
									setIsLoading(true);
									submitForm(formik);
								} else {
									showNotification(
										'Provide values',
										'Please Fill Form',
										'warning',
									);
								}
							}}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading
								? (lastSave && 'Updating') || 'Updating'
								: (lastSave && 'Update') || 'Update'}
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AddCoeSubGroup;
