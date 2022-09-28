// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import moment from 'moment';
import Axios from 'axios';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';

import Spinner from '../../../components/bootstrap/Spinner';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
} from '../../../components/bootstrap/Card';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import showNotification from '../../../components/extras/showNotification';
import baseURL from '../../../baseURL/baseURL';
import Select from '../../../components/bootstrap/forms/Select';

const validate = (values) => {
	const errors = {};

	if (!values.name) {
		errors.name = 'PLease provide name';
	}

	if (!values.Email) {
		errors.Email = 'PLease provide Email Address';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
		errors.Email = 'Invalid email address';
	}

	if (!values.password) {
		errors.password = 'PLease Select Company ID';
	}

	return errors;
};

const AddRole = () => {
	const [GetCompanyIDs, setGetCompanyIDs] = useState([]);

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

	const submitForm = (data) => {
		console.log('Data from formik::::::::', data);
		const url = `${baseURL}/register`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				name: data.name,
				email: data.Email,
				password: data.password,
				role_id: GetAdminID,
				company_id: GetCompanyID,
			}),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);
				console.log('res::::::', res);
				if (res.status === 'ok') {
					// props.setRefreshAccountsView(props.refreshAccountsView + 1);
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);
					setLastSave(moment());
				} else if (res.email[0] === 'The email has already been taken.') {
					showNotification(_titleError, res.email[0], 'danger');
				} else {
					showNotification(_titleError, res.message, 'danger');
					console.log('Error');
				}
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

	const formikAddRoles = useFormik({
		initialValues: {
			name: '',
			Email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});

	const [GetRoles, setGetRoles] = useState([]);
	useEffect(() => {
		Axios.get(`${baseURL}/getCompanies`)
			.then((response) => {
				console.log('getCompanies::::::::', response.data);
				const rec0 = response.data.companies.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetCompanyIDs(rec0);
				console.log('getCompanies:: Array::::::::', rec0);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getRoles`)
			.then((response) => {
				console.log('getRoles::::::::', response.data);
				const rec = response.data.roles.map(({ id, role }) => ({
					id,
					value: id,
					label: role,
				}));
				setGetRoles(rec);
				console.log('getRoles Array::::::::', rec);
			})
			.catch((err) => console.log(err));
	}, []);

	const [GetAdminID, setGetAdminID] = useState(GetRoles.value);
	const [GetCompanyID, setGetCompanyID] = useState(GetCompanyIDs.value);
	// const postData = () => {
	// 		fetch(`${baseURL}/register`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				name,
	// 				email,
	// 				password: Password,
	// 				role_id: GetAdminID,
	// 				company_id: GetCompanyID,
	// 			}),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				console.log('res:::::::::', data);
	// 				if (data.message === 'Account created Successfully') {
	// 					toast('Account created Successfully!');
	// 					navigate('/roleAdmin/listAdmins');
	// 				} else if (data.email[0] === 'The email has already been taken.') {
	// 					toast('The email has already been taken!');
	// 				} else {
	// 					toast('Admin did not add, Please try again ');
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				console.log('ERROR :::: ', err);
	// 			});

	// };

	console.log(GetAdminID, GetCompanyID);
	return (
		<>
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
				Add New Person
			</Button>

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
					<ModalTitle id='exampleModalLabel'>Add New Person</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formikAddRoles.handleSubmit}>
							<CardBody>
								<div className='row g-4'>
									<FormGroup id='name' label='Name' className='col-md-12'>
										<Input
											onChange={formikAddRoles.handleChange}
											onBlur={formikAddRoles.handleBlur}
											value={formikAddRoles.values.name}
											isValid={formikAddRoles.isValid}
											isTouched={formikAddRoles.touched.name}
											invalidFeedback={formikAddRoles.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='Email'
										label='Email'
										className='col-md-12'
										type='email'
										placeholder='Email'>
										<Input
											onChange={formikAddRoles.handleChange}
											onBlur={formikAddRoles.handleBlur}
											value={formikAddRoles.values.Email}
											isValid={formikAddRoles.isValid}
											isTouched={formikAddRoles.touched.Email}
											invalidFeedback={formikAddRoles.errors.Email}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup
										id='password'
										label='Password'
										className='col-md-12'
										type='password'
										placeholder='password'>
										<Input
											onChange={formikAddRoles.handleChange}
											onBlur={formikAddRoles.handleBlur}
											value={formikAddRoles.values.password}
											isValid={formikAddRoles.isValid}
											isTouched={formikAddRoles.touched.password}
											invalidFeedback={formikAddRoles.errors.password}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup
										id='roleID'
										label='Select Role'
										className='col-md-12'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											list={GetRoles}
											value={GetRoles.label}
											onChange={(e) => {
												setGetAdminID(e.target.value);
											}}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup
										id='companyID'
										label='Select Company'
										className='col-md-12'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											list={GetCompanyIDs}
											value={GetCompanyIDs.name}
											// value={formikAddRoles.values.mouza_id}
											onChange={(e) => {
												setGetCompanyID(e.target.value);
											}}
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
										onClick={formikAddRoles.resetForm}>
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
											if (formikAddRoles.isValid) {
												setIsLoading(true);
												submitForm(formikAddRoles.values);
											} else {
												showNotification(
													'Pease Provide values!',
													'Please Fill Form!',
													'warning',
												);
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
		</>
	);
};

export default AddRole;
