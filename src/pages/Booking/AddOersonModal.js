import React, { useState } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import moment from 'moment';
import Spinner from '../../components/bootstrap/Spinner';
import Icon from '../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Card, {
	CardSubTitle,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import showNotification from '../../components/extras/showNotification';
import baseURL from '../../baseURL/baseURL';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}
	if (!values.father) {
		errors.father = 'This field is required';
	}
	// if (values.personTypes.length === 0) {
	//  errors.personTypes = 'Please choose at least one person type';
	// }
	// eslint-disable-next-line no-console
	console.log('**', values.personTypes);
	return errors;
};

const AddCustomer = () => {
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
		console.log('___ i m in Subform with data :::::::::', data);
		const url = `${baseURL}/addProfile`;

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
					// dispatch(
					//  updateMasterDetails([
					//      store.data.masterDetails.refreshDropdowns + 1,
					//      'refreshDropdowns',
					//  ]),
					// );
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
			father: '',
			tell_office: '',
			Emg_contact: '',
			email: '',
			nominee: '',
			relationship: '',
			nomineeCNIC: '',
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
			<br />
			<div className='col-auto'>
				<Icon
					icon='PersonAdd'
					className='mb-0 text-info h2'
					onClick={() => {
						initialStatus();

						setState(true);
						setStaticBackdropStatus(true);
					}}
				/>
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
					<ModalTitle id='exampleModalLabel'>Add Customer Details</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='CheckBox' iconColor='info'>
									<CardSubTitle>Fill out all below fields</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup
										id='name'
										label=' Name Mr / Mrs / Miss'
										className='col-md-12'>
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
										id='father'
										label='Name of Father / Husband'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.father}
											isValid={formik.isValid}
											isTouched={formik.touched.father}
											invalidFeedback={formik.errors.father}
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

									<FormGroup id='phone_no' label='Cell No' className='col-md-12'>
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

									<FormGroup
										id='tell_office'
										label='Tel (Office)'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.tell_office}
											isValid={formik.isValid}
											isTouched={formik.touched.tell_office}
											invalidFeedback={formik.errors.tell_office}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='Emg_contact'
										label='Emergency Contact'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.Emg_contact}
											isValid={formik.isValid}
											isTouched={formik.touched.Emg_contact}
											invalidFeedback={formik.errors.Emg_contact}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup id='email' label='Email' className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.email}
											isValid={formik.isValid}
											isTouched={formik.touched.email}
											invalidFeedback={formik.errors.email}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup id='nominee' label='Nominee' className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.nominee}
											isValid={formik.isValid}
											isTouched={formik.touched.nominee}
											invalidFeedback={formik.errors.nominee}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='relationship'
										label='Relationship'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.relationship}
											isValid={formik.isValid}
											isTouched={formik.touched.relationship}
											invalidFeedback={formik.errors.relationship}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='nomineeCNIC'
										label='CNIC of Nominee'
										className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.nomineeCNIC}
											isValid={formik.isValid}
											isTouched={formik.touched.nomineeCNIC}
											invalidFeedback={formik.errors.nomineeCNIC}
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

export default AddCustomer;
