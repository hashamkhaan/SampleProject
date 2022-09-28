import React, { useState } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import { updateMasterDetails } from '../../redux/purchaseLandStore/index';
// eslint-disable-next-line import/no-unresolved
import Spinner from '../../../../components/bootstrap/Spinner';
import Icon from '../../../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import baseURL from '../../../../baseURL/baseURL';
import Card, {
	CardSubTitle,
	CardTitle,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}
	if (values.personTypes.length === 0) {
		errors.personTypes = 'Please choose at least one person type';
	}
	// eslint-disable-next-line no-console
	console.log('**', values.personTypes);
	return errors;
};

const AddAgent = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
	const [state, setState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const personTypesOptions = [
		{ id: 1, person_type_id: 1, value: 1, label: 'Purchaser' },
		{ id: 2, person_type_id: 2, value: 2, label: 'Seller' },
		{ id: 3, person_type_id: 3, value: 3, label: 'Agent' },
	];
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

	// eslint-disable-next-line no-unused-vars
	const submitForm = (data) => {
		// eslint-disable-next-line no-console
		console.log('___', data);
		const url = `${baseURL}/addKhasra`;

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
					formik.resetForm();
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);

					setLastSave(moment());
					dispatch(
						updateMasterDetails([
							store.data.masterDetails.refreshDropdowns + 1,
							'refreshDropdowns',
						]),
					);
				} else {
					showNotification(_titleError, res.message, 'danger');
					setIsLoading(false);
					// eslint-disable-next-line no-console
					console.log('Error');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				showNotification('Error', err.message, 'danger');
			});
	};
	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			phone_no: '',
			cnic: '',
			address: '',
			personTypes: [],
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		// eslint-disable-next-line no-console

		submitForm(formik.values);
		setLastSave(moment());
	};
	return (
		<div className='col-auto'>
			<div className='col-auto'>
				<Button
					color='danger'
					isLight
					icon='Add'
					hoverShadow='default'
					onClick={() => {
						initialStatus();

						setState(true);
						setStaticBackdropStatus(true);
					}}>
					Add New
				</Button>
			</div>
			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size={sizeStatus}
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<ModalTitle id='exampleModalLabel'>Add Khasra</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='CheckBox' iconColor='info'>
									<CardTitle>
										Khasra <small>Role</small>
									</CardTitle>
									<CardSubTitle>Roles</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-12'>
										<FormGroup label='personTypes' id='personTypes'>
											<Select
												className='col-md-12'
												isClearable
												isMulti
												classNamePrefix='select'
												options={personTypesOptions}
												// isLoading={personTypesOptionsLoading}
												value={formik.values.personTypes}
												onChange={(val) => {
													formik.setFieldValue('personTypes', val);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.personTypes}
												invalidFeedback={formik.errors.personTypes}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.personTypes && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.personTypes}
											</p>
										)}
									</div>

									<FormGroup id='name' label=' Name' className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.name}
											isValid={formik.isValid}
											isTouched={formik.touched.name}
											invalidFeedback={formik.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='phone_no'
										label='Phone number'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.phone_no}
											isValid={formik.isValid}
											isTouched={formik.touched.phone_no}
											invalidFeedback={formik.errors.phone_no}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup id='cnic' label='CNIC' className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.cnic}
											isValid={formik.isValid}
											isTouched={formik.touched.cnic}
											invalidFeedback={formik.errors.cnic}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup id='address' label='Address' className='col-lg-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.address}
											isValid={formik.isValid}
											isTouched={formik.touched.address}
											invalidFeedback={formik.errors.address}
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
										onClick={formik.resetForm}>
										Reset
									</Button>
								</CardFooterLeft>
								<CardFooterRight>
									<Button
										className='me-3'
										icon={isLoading ? null : 'Save'}
										isLight
										color={lastSave ? 'info' : 'success'}
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading
											? (lastSave && 'Saving') || 'Saving'
											: (lastSave && 'Save') || 'Save'}
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setState(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddAgent;
