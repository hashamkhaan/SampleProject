// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-const-assign */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
// ** React Imports

import { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
// react-flatpickr
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather';

// ** Axios Imports
import Axios from 'axios';
import Select from 'react-select';
import {
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	Form,
	Button,
	AccordionHeader,
	AccordionBody,
} from 'reactstrap';
import showNotification from '../../../components/extras/showNotification';
import baseURL from '../../../baseURL/baseURL';
// ** Custom Components
import AddSeller from './modals/AddSeller';
import {
	updateNoOfRegistries,
	updateFormIsValid,
	updateFormDetails,
	updatePaymentProperties,
	updateStagesRegistriesFile,
	updateRegistriesMedia,
	temp,
} from '../redux/purchaseLandStore/index';
import Label from '../../../components/bootstrap/forms/Label';
// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Repeater from './stages/repeater/index';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import AddExternalPayer from './modals/AddExternalPayer';

const validate = (values) => {
	const errors = {};
	if (!values.validationremarks) {
		errors.validationremarks = 'Required';
	} else if (values.validationremarks.length > 15) {
		errors.validationremarks = 'Must be 15 characters or less';
	}

	return errors;
};

const Stages = () => {
	// ** Store Variables

	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
	const [purchaser_options, setpurchaser_options] = useState([]);
	const [seller_options, setseller_options] = useState([]);

	const payer_options = [
		{ label: 'Ahmed Khan', value: '0', id: '0' },
		{ label: 'Sher Khan', value: '1', id: '1' },
		{ label: 'Noor Khan', value: '2', id: '2' },
	];

	// ** State
	const [count, setCount] = useState(1);

	const formik = useFormik({
		initialValues: {
			validationRadios: 'Cash',
			checkedCheck: true,
			validationremarks: '',
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
		},
	});

	// a simple date formatting function
	const [customErrors, setCustomErrors] = useState({});

	useEffect(
		() => {
			setCustomErrors({});
			let errors = {};
			store.data.registries.forEach((data, index) => {
				if (data.number.length === 0) {
					errors = {
						...errors,
						[`registries[${index}]number`]: 'Please provide Registry Number!',
					};
				}
				if (data.person_name_purchaser.length === 0) {
					errors = {
						...errors,
						[`registries[${index}]person_name_purchaser`]: 'Please provide Purchaser!',
					};
				}
				if (data.person_name_seller.length === 0) {
					errors = {
						...errors,
						[`registries[${index}]person_name_seller`]: 'Please provide Owner!',
					};
				}
				setCustomErrors(errors);
			});
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[store.data.registries],
	);

	useEffect(() => {
		Axios.get(`${baseURL}/getSellers`)
			.then((response) => {
				const rec = response.data.sellers.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setseller_options(rec);
				// setPurchaserOptionsLoading(false)
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getPurchasers`)
			.then((response) => {
				const rec = response.data.purchasers.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setpurchaser_options(rec);
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}, [store.data.masterDetails.refreshDropdowns]);

	const changeHandlerFile = (event, i) => {
		event.preventDefault();

		dispatch(updatePaymentProperties([event.target.files[0], 'registries', i, 'file']));
	};
	return (
		<>
			{/* <Repeater count={count}> */}
			<Accordion id='accSampleRegistries' activeItemId='item0' shadow='lg'>
				{store.data.registries !== undefined &&
					store.data.registries.map((data, i) => {
						return (
							<AccordionItem
								// eslint-disable-next-line react/no-array-index-key
								key={i}
								id={`item${i}`}
								title={`Registry ${i + 1}: 
								
								
								  `}
								icon='Person'>
								<div className='row g-4'>
									<FormGroup className='col-md-4'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend'>
												Registery number
											</InputGroupText>
											<Input
												id={`amount${i}`}
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.value,
															'registries',
															i,
															'number',
														]),
													);
												}}
												value={data.number}
												validFeedback='Looks good!'
												isTouched
												invalidFeedback={
													customErrors[`registries[${i}]number`]
												}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup className='col-md-4'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend'>
												Dc Value PKR
											</InputGroupText>
											<Input
												id='dc_value'
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.value,
															'registries',
															i,
															'dc_value',
														]),
													);
												}}
												value={data.dc_value}
											/>
										</InputGroup>
									</FormGroup>
								</div>
								<div className='row g-4'>
									<div className='col-md-4'>
										<FormGroup id='purchasers' label='Purchaser'>
											<InputGroup>
												<Select
													className='col-md-12'
													isClearable
													isMulti
													classNamePrefix='select'
													options={purchaser_options}
													value={data.person_name_purchaser}
													onChange={(e) => {
														dispatch(
															updatePaymentProperties([
																e,
																'registries',
																i,
																'person_name_purchaser',
															]),
														);
													}}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.purchasers}
													invalidFeedback={formik.errors.purchasers}
													validFeedback='Looks good!'
												/>
											</InputGroup>
										</FormGroup>
										{customErrors[`registries[${i}]person_name_purchaser`] && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{
													customErrors[
														`registries[${i}]person_name_purchaser`
													]
												}
											</p>
										)}
									</div>
									<div className='col-md-4'>
										<FormGroup id='sellers' label='owner'>
											<InputGroup>
												<Select
													className='col-md-11'
													isMulti
													isClearable
													classNamePrefix='select'
													options={seller_options}
													value={data.person_name_seller}
													onChange={(e) => {
														dispatch(
															updatePaymentProperties([
																e,
																'registries',
																i,
																'person_name_seller',
															]),
														);
													}}
													onBlur={formik.handleBlur}
													isValid={formik.isValid}
													isTouched={formik.touched.sellers}
													invalidFeedback={formik.errors.sellers}
													validFeedback='Looks good!'
												/>
												<AddSeller />
											</InputGroup>
										</FormGroup>
										{customErrors[`registries[${i}]person_name_seller`] && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{customErrors[`registries[${i}]person_name_seller`]}
											</p>
										)}
									</div>
								</div>
								<div className='row g-4'>
									<FormGroup
										className='col-md-6'
										id={`remarks-${i}`}
										label='Remarks'>
										<Input
											onChange={(e) => {
												dispatch(
													updatePaymentProperties([
														e.target.value,
														'registries',
														i,
														'description',
													]),
												);
											}}
											value={data.description}
										/>
									</FormGroup>

									<div className='form-group col-md-3'>
										<br />
										<input
											type='file'
											name='file'
											className='form-control'
											onChange={(e) => changeHandlerFile(e, i)}
										/>
									</div>

									<FormGroup
										className='col-md-3'
										id='exampleTypes--date'
										label='Registry Date'>
										<Flatpickr
											className='form-control'
											onChange={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'registries',
														i,
														'date',
													]),
												);
											}}
											onClose={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'registries',
														i,
														'date',
													]),
												);
											}}
											value={data.date}
											options={{
												dateFormat: 'd/m/y',
												allowInput: true,
												defaultDate: new Date(),
											}}
											id='default-picker'
										/>
									</FormGroup>
								</div>
								{/*  Delete Button */}
								{store.data.registries.length - 1 === i && (
									<Row className='justify-content-between align-items-center'>
										<Col md={2}>
											<Button
												color='danger'
												className='text-nowrap px-1'
												// onClick={e => deleteForm(e, i)}
												onClick={() => {
													dispatch(
														updateNoOfRegistries([
															1,
															'count_registries',
															'registries',
															true,
														]),
													);
													setCount(count - 1);
												}}
												outline>
												<X size={14} className='me-50' />
												<span>Delete</span>
											</Button>
										</Col>
									</Row>
								)}
							</AccordionItem>
						);
					})}
			</Accordion>

			{/* Add Button */}
			<div className='mx-auto' style={{ width: 200 }}>
				<Button
					color='primary'
					icon='Add'
					onClick={() => {
						// eslint-disable-next-line no-plusplus
						dispatch(
							updateNoOfRegistries([1, 'count_registries', 'registries', false]),
						);
						setCount(count + 1);
					}}>
					Add New Registry
				</Button>
			</div>
		</>
	);
};

export default Stages;
