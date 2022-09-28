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
// ** Axios Imports
import Axios from 'axios';
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
import baseURL from '../../../baseURL/baseURL';
import Label from '../../../components/bootstrap/forms/Label';
// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Repeater from './stages/repeater/index';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import {
	updateNoOfPayemnts,
	updateFormIsValid,
	updateFormDetails,
	updatePaymentProperties,
} from '../redux/purchaseLandStore/index';

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
	const [taxTypesOptions, settaxTypesOptions] = useState([]);
	const [transactionTypeOptions, setTransactionTypeOptions] = useState([]);

	const [customErrors, setCustomErrors] = useState({});

	useEffect(() => {
		setCustomErrors({});
		let errors = {};
		store.data.taxes.forEach((data, index) => {
			if (!data.tax_type) {
				errors = {
					...errors,
					[`taxes[${index}]type`]: 'Please provide Tax Type!',
				};
			}
		});
		setCustomErrors(errors);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.data.taxes]);

	useEffect(() => {
		Axios.get(`${baseURL}/getTaxTypes`)
			.then((response) => {
				const rec = response.data.taxTypes.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				settaxTypesOptions(rec);
				//   setLoading(false)
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
	}, []);

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

	return (
		<>
			{/* <Repeater count={count}> */}
			<Accordion id='accSampleTaxes' activeItemId='itemTaxes0' shadow='lg'>
				{store.data.taxes !== undefined &&
					store.data.taxes.map((data, i) => {
						return (
							<AccordionItem
								// eslint-disable-next-line react/no-array-index-key
								key={i}
								id={`itemTaxes${i}`}
								title={`Tax ${i + 1}: PKR ${data.amount} 	
								
								
								  `}
								icon='Person'>
								<div className='row g-4'>
									<FormGroup className='col-lg-6' label='Payment Type'>
										<ChecksGroup
											isValid={formik.isValid}
											isTouched={formik.touched.validationRadios}
											invalidFeedback={formik.errors.validationRadios}>
											{transactionTypeOptions !== undefined &&
												transactionTypeOptions.map((dataOptions, index) => {
													return (
														<Checks
															type='radio'
															id={`validationRadioTaxes${dataOptions.label}${i}`}
															label={`${dataOptions.label}`}
															name={`validationRadioTaxes${dataOptions.label}${i}`}
															value={`${dataOptions.id}`}
															onChange={(e) => {
																dispatch(
																	updatePaymentProperties([
																		e.target.value,
																		'taxes',
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
												id={`taxesflexSwitchCheckChecked${i}`}
												label='Paid'
												name='checkedCheck'
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.checked,
															'taxes',
															i,
															'paid_status',
														]),
													);
												}}
												checked={data.paid_status}
											/>
										</ChecksGroup>
									</FormGroup>
								</div>

								<div className='row g-4'>
									<FormGroup className='col-md-4' label='Paying Amount'>
										<InputGroup>
											<InputGroupText id={`taxesinputGroupPrepend1${i}`}>
												PKR
											</InputGroupText>
											<Input
												id={`taxesvalidationkanal${i}`}
												onChange={(e) => {
													dispatch(
														updatePaymentProperties([
															e.target.value,
															'taxes',
															i,
															'amount',
														]),
													);
												}}
												value={data.amount}
											/>
										</InputGroup>
									</FormGroup>

									<div className='col-md-6'>
										<FormGroup className='col-md-6' label='Tax Type'>
											<InputGroup>
												<Select
													className='col-md-8'
													id={`taxestax_types_options${i}`}
													isClearable
													classNamePrefix='select'
													options={taxTypesOptions}
													// theme={selectThemeColors}
													onChange={(e) => {
														dispatch(
															updatePaymentProperties([
																e,
																'taxes',
																i,
																'tax_type',
															]),
														);
													}}
													value={data.tax_type}
												/>
											</InputGroup>
										</FormGroup>
										{customErrors[`taxes[${i}]type`] && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{customErrors[`taxes[${i}]type`]}
											</p>
										)}
									</div>
									<FormGroup
										className='col-md-2'
										id='taxesexampleTypes--date'
										label='Transaction Date'>
										<Flatpickr
											className='form-control'
											onChange={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'taxes',
														i,
														'date',
													]),
												);
											}}
											onClose={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'taxes',
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
								{/* <div className='row g-4'>
								
							</div> */}

								<div className='row g-4'>
									<FormGroup className='col-md-6' label='Remarks'>
										<Input
											id={`taxesvalidationKhatoni${i}`}
											onChange={(e) => {
												dispatch(
													updatePaymentProperties([
														e.target.value,
														'taxes',
														i,
														'description',
													]),
												);
											}}
											value={data.description}
										/>
									</FormGroup>
									<FormGroup
										className='col-md-6'
										id={`taxesexampleTypes--file${i}`}
										label='Documents'>
										<Input
											type='file'
											placeholder='Supports file type placeholder'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>

								{/*  Delete Button */}
								{store.data.taxes.length - 1 === i && (
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
															'count_taxes',
															'taxes',
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
					onClick={() => {
						dispatch(updateNoOfPayemnts([1, 'count_taxes', 'taxes', false]));
						// eslint-disable-next-line no-plusplus
						setCount(count + 1);
					}}>
					Add New tax
				</Button>
			</div>
		</>
	);
};

export default Stages;
