// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// ** Axios Imports
import Axios from 'axios';
import Select from 'react-select';
import { updateMasterDetails } from '../../redux/purchaseLandStore/index';
import Spinner from '../../../../components/bootstrap/Spinner';
import baseURL from '../../../../baseURL/baseURL';
import Icon from '../../../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
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

const AddKhasra = () => {
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
					formikAddPurchaser.resetForm();
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

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};

	const formikAddPurchaser = useFormik({
		initialValues: {
			mouza_id: '',
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});
	const [mouza_options, setmouza_options] = useState([]);
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
	}, [store.data.masterDetails.refreshDropdowns]);

	return (
		<div className='col-auto'>
			<div className='col-auto'>
				<Icon
					icon='ClipboardPlus'
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
					<ModalTitle id='exampleModalLabel'>Add New Khasra</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formikAddPurchaser.handleSubmit}>
							<CardBody>
								<div className='row g-4'>
									<FormGroup
										id='mouza_id'
										label='mouza Name'
										className='col-md-12'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											options={mouza_options}
											value={mouza_options.find(
												(c) =>
													c.value === formikAddPurchaser.values.mouza_id,
											)}
											// value={formikAddPurchaser.values.mouza_id}
											onChange={(val) => {
												formikAddPurchaser.setFieldValue(
													'mouza_id',
													val.id,
												);
											}}
										/>
									</FormGroup>
									<FormGroup
										id='khasra_no'
										label='Khasra number'
										className='col-md-12'>
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
												showNotification(
													'Provide values',
													'Please Fill Form',
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
		</div>
	);
};

export default AddKhasra;
