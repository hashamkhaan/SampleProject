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

// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather';
// react-flatpickr
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

// ** Custom Components
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
import Select from 'react-select';
// ** Axios Imports
import Axios from 'axios';
import baseURL from '../../../baseURL/baseURL';
import {
	updateNoOfPayemnts,
	updateFormIsValid,
	updateFormDetails,
	updatePaymentProperties,
} from '../redux/purchaseLandStore/index';
import Label from '../../../components/bootstrap/forms/Label';
// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Repeater from './stages/repeater/index';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import AddSeller from './modals/AddSeller';
import AddAgent from './modals/AddAgent';
import AddPurchaser from './modals/AddPurchaser';
import AddExternalPayer from './modals/AddExternalPayer';

const validate = (values) => {
	const errors = {};
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const store = useSelector((state) => state.purchaseLand);
	if (!values.name) {
		errors.name = 'name is Required.';
	}

	// eslint-disable-next-line no-console
	// console.log('ddd1', Stages.store.data.payments);
	// eslint-disable-next-line no-console
	console.log('ddd', errors);
	// eslint-disable-next-line no-console
	console.log('ddd2', values);
	return errors;
};

const Stages = () => {
	// ** Store Variables
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);

	// ** State
	const [count, setCount] = useState(1);

	const formik = useFormik({
		initialValues: {
			name: '.',
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
		},
	});

	// a simple date formatting function
	const [purchaser_options, setpurchaser_options] = useState([]);
	const [seller_options, setseller_options] = useState([]);
	const [transactionTypeOptions, setTransactionTypeOptions] = useState([]);
	const [customErrors, setCustomErrors] = useState({});

	useEffect(() => {
		setCustomErrors({});
		let errors = {};
		store.data.payments.forEach((data, index) => {
			if (!data.payer) {
				errors = {
					...errors,
					[`payments[${index}]payer`]: 'Please provide Payer!',
				};
			}
		});
		setCustomErrors(errors);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.data.payments]);
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
		Axios.get(`${baseURL}/getTransactionType`)
			.then((response) => {
				const rec = response.data.transactionTypes.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setTransactionTypeOptions(rec);
				//   setLoading(false)
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}, [store.data.masterDetails.refreshDropdowns]);
	return (
		<>
			{/* <Repeater count={count}> */}

			{/* {i => ( */}

			<Accordion id='accSamplePayments' activeItemId='itemPayments0' shadow='lg'>
				{store.data.payments !== undefined &&
					store.data.payments.map((data, i) => {
						return (
							<AccordionItem
								// eslint-disable-next-line react/no-array-index-key
								key={i}
								id={`itemPayments${i}`}
								title={`Payment ${i + 1}: PKR ${data.amount} 																
								  `}
								icon='Person'>
								{/* eslint-disable-next-line react/no-array-index-key */}
								{/* <Form key={i}> */}
								<div className='row g-4'>
									<FormGroup className='col-lg-6' label='Payment Type'>
										<ChecksGroup>
											{transactionTypeOptions !== undefined &&
												transactionTypeOptions.map((dataOptions, index) => {
													return (
														<Checks
															type='radio'
															id={`paymentOptionsPayments${dataOptions.label}${i}`}
															label={`${dataOptions.label}`}
															name={`paymentOptionsPayments${dataOptions.label}${i}`}
															value={`${dataOptions.id}`}
															onChange={(e) => {
																// eslint-disable-next-line no-console
																console.log('ddd', e.target.value);
																dispatch(
																	updatePaymentProperties([
																		e.target.value,
																		'payments',
																		i,
																		'transaction_type_id',
																	]),
																);
															}}
															checked={data.transaction_type_id}
															isInline
														/>
													);
												})}
										</ChecksGroup>
									</FormGroup>
									<FormGroup className='col-lg-3' label='Payment Status'>
										<ChecksGroup
											isValid={formik.isValid}
											isTouched={formik.touched.validationRadios_status}
											invalidFeedback={formik.errors.validationRadios_status}>
											<Checks
												type='switch'
												id={`flexSwitchCheckChecked${i}`}
												label='Paid'
												name='checkedCheck'
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.checked,
															'payments',
															i,
															'paid_status',
														]),
													);
												}}
												checked={data.paid_status}
											/>
										</ChecksGroup>
									</FormGroup>
									<FormGroup
										className='col-md-2'
										id='exampleTypes--date'
										label='Transaction Date'>
										<Flatpickr
											className='form-control'
											onChange={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'payments',
														i,
														'date',
													]),
												);
											}}
											onClose={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'payments',
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

								<div className='row g-4'>
									<FormGroup className='col-md-3' label='Paying Amount'>
										<InputGroup>
											<InputGroupText id={`inputGroupPrepend1${i}`}>
												PKR
											</InputGroupText>
											<Input
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.amount}
												invalidFeedback={formik.errors.amount}
												validFeedback='Looks good!'
												id={`validationkanal${i}`}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.value,
															'payments',
															i,
															'amount',
														]),
													);
												}}
												value={data.amount}
											/>
										</InputGroup>
									</FormGroup>
									<div className='col-md-3'>
										<FormGroup label='Payer/ Purchaser'>
											<InputGroup>
												<Select
													className='col-md-12'
													id={`payer_options${i}`}
													classNamePrefix='select'
													options={purchaser_options}
													// defaultValue={purchaser_options[0]}
													// theme={selectThemeColors}
													onChange={(e) => {
														dispatch(
															updatePaymentProperties([
																e,
																'payments',
																i,
																'payer',
															]),
														);
													}}
													value={data.payer}
													//	defaultValue={store.data.form1.purchasers[0]? store.data.form1.purchasers[0]: store.data.form1.purchasers												}
												/>
												<AddPurchaser />
											</InputGroup>
										</FormGroup>
										{customErrors[`payments[${i}]payer`] && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{customErrors[`payments[${i}]payer`]}
											</p>
										)}
									</div>
									<FormGroup className='col-md-3' label='Payee/ seller'>
										<InputGroup>
											<Select
												className='col-md-12'
												isClearable
												id={`payee_options${i}`}
												classNamePrefix='select'
												options={seller_options}
												// theme={selectThemeColors}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e,
															'payments',
															i,
															'payee_seller',
														]),
													);
												}}
												value={data.payee_seller}
												//	defaultValue={store.data.form1.sellers[0]	? store.data.form1.sellers[0]	: store.data.form1.sellers												}
											/>
											<AddSeller />
										</InputGroup>
									</FormGroup>
									<FormGroup className='col-md-3' label='Payee/ agent'>
										<InputGroup>
											<Select
												isClearable
												className='col-md-12'
												id={`payee_options${i}`}
												classNamePrefix='select'
												options={store.data.form1.agents}
												// theme={selectThemeColors}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e,
															'payments',
															i,
															'payee_agent',
														]),
													);
												}}
												value={data.payee_agent}
												//	defaultValue={store.data.form1.sellers[0]	? store.data.form1.sellers[0]	: store.data.form1.sellers												}
											/>
											{/* <AddAgent /> */}
										</InputGroup>
									</FormGroup>
								</div>

								<div className='row g-4'>
									<FormGroup className='col-md-6' label='Remarks'>
										<Input
											id={`validationKhatoni${i}`}
											onChange={(e) => {
												dispatch(
													updatePaymentProperties([
														e.target.value,
														'payments',
														i,
														'description',
													]),
												);
											}}
											value={store.data.payments[i].description}
										/>
									</FormGroup>
									<FormGroup
										className='col-md-6'
										id={`exampleTypes--file${i}`}
										label='Documents'>
										<Input
											type='file'
											placeholder='Supports file type placeholder'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>

								{/*  Delete Button */}
								{store.data.payments.length - 1 === i && (
									<Row className='justify-content-between align-items-center'>
										<Col md={2}>
											<Button
												color='danger'
												className='text-nowrap px-1'
												// onClick={e => deleteForm(e, i)}
												onClick={() => {
													dispatch(
														updateNoOfPayemnts([
															1,
															'count_payments',
															'payments',
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
								{/* </Form> */}
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
						dispatch(updateNoOfPayemnts([1, 'count_payments', 'payments', false]));
						setCount(count + 1);
					}}>
					New Payment
				</Button>
			</div>
		</>
	);
};

export default Stages;
