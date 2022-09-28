// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
// ** Axios Imports
import Axios from 'axios';
import Select from 'react-select';
import Spinner from '../../../../components/bootstrap/Spinner';
import baseURL from '../../../../baseURL/baseURL';
import Icon from '../../../../components/icon/Icon';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
	CardTitle,
	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};
	if (!values.mouza_id) {
		errors.mouza_id = 'Required';
	}
	if (!values.khasra_no) {
		errors.khasra_no = 'Required';
	}

	return errors;
};

const AddKhasra = (props) => {
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

	const formikAddPurchaser = useFormik({
		// eslint-disable-next-line react/destructuring-assignment
		initialValues: props.editingKhasraData,
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});
	const [mouza_options, setmouza_options] = useState([]);

	const submitForm = (data) => {
		const url = `${baseURL}/updateKhasra`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(data),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					formikAddPurchaser.resetForm();
					// eslint-disable-next-line react/destructuring-assignment
					props.refreshTableRecords();
					// eslint-disable-next-line react/destructuring-assignment
					props.handleStateEdit(false);
					showNotification(_titleSuccess, res.message, 'success');

					setLastSave(moment());
				} else {
					setIsLoading(false);
					showNotification(_titleError, res.message, 'danger');
					console.log('Error');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				showNotification('Error', err.message, 'danger');
			});
	};

	useEffect(() => {
		Axios.get(`${baseURL}/getMouzas`)
			.then((response) => {
				const rec = response.data.mouzas.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setmouza_options(rec);
				//   setLoading(false)
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<Card stretch tag='form' onSubmit={formikAddPurchaser.handleSubmit}>
			<CardBody>
				<div className='row g-4'>
					<FormGroup id='mouza_id' label='mouza Name' className='col-md-12'>
						<Select
							className='col-md-11'
							isClearable
							isDisabled
							classNamePrefix='select'
							options={mouza_options}
							value={mouza_options.find(
								(c) => c.value === formikAddPurchaser.values.mouza_id,
							)}
							// value={formikAddPurchaser.values.mouza_id}
							onChange={(val) => {
								formikAddPurchaser.setFieldValue('mouza_id', val.id);
							}}
						/>
					</FormGroup>
					<FormGroup id='khasra_no' label='Khasra number' className='col-md-12'>
						<Input
							onChange={formikAddPurchaser.handleChange}
							onBlur={formikAddPurchaser.handleBlur}
							value={formikAddPurchaser.values.khasra_no}
							isValid={formikAddPurchaser.isValid}
							isTouched={formikAddPurchaser.touched.khasra_no}
							invalidFeedback={formikAddPurchaser.errors.khasra_no}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<CardLabel>
						<CardTitle>Total Land in Khasra </CardTitle>
					</CardLabel>
					<FormGroup id='kanal' label='kanal' className='col-md-12'>
						<Input
							type='number'
							min='0'
							onWheel={(e) => e.target.blur()}
							onChange={formikAddPurchaser.handleChange}
							onBlur={formikAddPurchaser.handleBlur}
							value={formikAddPurchaser.values.kanal}
							isValid={formikAddPurchaser.isValid}
							isTouched={formikAddPurchaser.touched.kanal}
							invalidFeedback={formikAddPurchaser.errors.kanal}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='marla' label='marla' className='col-md-12'>
						<Input
							type='number'
							min='0'
							onWheel={(e) => e.target.blur()}
							onChange={formikAddPurchaser.handleChange}
							onBlur={formikAddPurchaser.handleBlur}
							value={formikAddPurchaser.values.marla}
							isValid={formikAddPurchaser.isValid}
							isTouched={formikAddPurchaser.touched.marla}
							invalidFeedback={formikAddPurchaser.errors.marla}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='sarsai' label='sarsai' className='col-md-12'>
						<Input
							type='number'
							min='0'
							onWheel={(e) => e.target.blur()}
							onChange={formikAddPurchaser.handleChange}
							onBlur={formikAddPurchaser.handleBlur}
							value={formikAddPurchaser.values.sarsai}
							isValid={formikAddPurchaser.isValid}
							isTouched={formikAddPurchaser.touched.sarsai}
							invalidFeedback={formikAddPurchaser.errors.sarsai}
							validFeedback='Looks good!'
						/>
					</FormGroup>
					<FormGroup id='feet' label='feet ' className='col-md-12'>
						<Input
							type='number'
							min='0'
							onWheel={(e) => e.target.blur()}
							onChange={formikAddPurchaser.handleChange}
							onBlur={formikAddPurchaser.handleBlur}
							value={formikAddPurchaser.values.feet}
							isValid={formikAddPurchaser.isValid}
							isTouched={formikAddPurchaser.touched.feet}
							invalidFeedback={formikAddPurchaser.errors.feet}
							validFeedback='Looks good!'
						/>
					</FormGroup>
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterLeft>
					<Button
						type='reset'
						color='info'
						isOutline
						onClick={formikAddPurchaser.resetForm}>
						Reset
					</Button>
				</CardFooterLeft>
				<CardFooterRight>
					<Button
						icon={isLoading ? null : 'Save'}
						isLight
						color={lastSave ? 'info' : 'success'}
						isDisable={isLoading}
						onClick={() => {
							// eslint-disable-next-line no-plusplus
							if (formikAddPurchaser.isValid) {
								setIsLoading(true);
								submitForm(formikAddPurchaser.values);
							} else {
								showNotification('Provide values', 'Please Fill Form', 'warning');
							}
						}}>
						{isLoading && <Spinner isSmall inButton />}
						{isLoading
							? (lastSave && 'Saving') || 'Saving'
							: (lastSave && 'Save') || 'Save'}
					</Button>
				</CardFooterRight>
			</CardFooter>
		</Card>
	);
};

export default AddKhasra;
