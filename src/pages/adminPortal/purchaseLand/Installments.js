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
import moment from 'moment';
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
import AddPerson from './modals/AddPerson';
import {
	updateNoOfInstallments,
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
			let totalAmount = 0;
			store.data?.installments.forEach((data, index) => {
				totalAmount += Number(data.amount ? data.amount : 0);
				if (data.amount === '' || !data.amount > 0) {
					errors = {
						...errors,
						[`installments[${index}]amount`]: 'Please provide amount!',
					};
				}
				if (!data.date) {
					errors = {
						...errors,
						[`installments[${index}]date`]: 'Please provide date!',
					};
				}
			});
			if (totalAmount !== store.data.form1.totalPrice) {
				errors = {
					...errors,
					[`installments[${store.data.installments.length - 1}]balance`]:
						'Balance must be 0!',
				};
			}
			setCustomErrors(errors);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[store.data.installments],
	);
	let balance = store.data.form1.totalPrice ? store.data.form1.totalPrice : 0;
	return (
		<>
			{/* <Repeater count={count}> */}

			{store.data.installments !== undefined &&
				store.data?.installments.map((data, i) => {
					balance -= Number(data.amount ? data.amount : 0);
					return (
						<div
							// eslint-disable-next-line react/no-array-index-key
							key={i}
							id={`item${i}`}
							title={`Installment ${i + 1}: 
								
								
								  `}
							icon='Person'>
							<div className='row g-4'>
								<FormGroup className='col-md-1'>
									<br />
									<h5>{i + 1}:</h5>
								</FormGroup>
								<div className='col-md-3'>
									<FormGroup id='date' label='Payment Date'>
										<Flatpickr
											className='form-control'
											onChange={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'installments',
														i,
														'date',
													]),
												);
											}}
											onClose={(e, dateStr) => {
												dispatch(
													updatePaymentProperties([
														dateStr,
														'installments',
														i,
														'date',
													]),
												);
											}}
											value={data.date}
											options={{
												minDate: moment(),
												dateFormat: 'd/m/y',
												allowInput: true,
												defaultDate: new Date(),
											}}
											validFeedback='Looks good!'
											id='date'
										/>
									</FormGroup>
									{customErrors[`installments[${i}]date`] && (
										// <div className='invalid-feedback'>
										<p
											style={{
												color: 'red',
											}}>
											{customErrors[`installments[${i}]date`]}
										</p>
									)}
								</div>
								<FormGroup className='col-md-3' label='Amount'>
									<Input
										id={`amount${i}`}
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={(e) => {
											dispatch(
												updatePaymentProperties([
													e.target.value,
													'installments',
													i,
													'amount',
												]),
											);
										}}
										value={data.amount}
										validFeedback='Looks good!'
										isTouched
										invalidFeedback={customErrors[`installments[${i}]amount`]}
									/>
								</FormGroup>
								<FormGroup className='col-md-3' label='Balance'>
									<Input
										id={`balance${i}`}
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										readOnly
										value={balance}
										validFeedback='Looks good!'
										isTouched
										invalidFeedback={customErrors[`installments[${i}]balance`]}
									/>
								</FormGroup>

								{/*  Delete Button */}
								{store.data.installments.length - 1 === i && (
									<Col md={2}>
										<br />
										<Button
											color='danger'
											className='text-nowrap px-1'
											// onClick={e => deleteForm(e, i)}
											onClick={() => {
												dispatch(
													updateNoOfInstallments([
														1,
														'count_installments',
														'installments',
														true,
													]),
												);
												setCount(count - 1);
											}}
											outline>
											<X size={14} className='me-50' />
										</Button>
									</Col>
								)}
							</div>
							<hr />
						</div>
					);
				})}

			{/* Add Button */}
			<div className='mx-auto' style={{ width: 200 }}>
				<Button
					color='primary'
					icon='Add'
					onClick={() => {
						// eslint-disable-next-line no-plusplus
						dispatch(
							updateNoOfInstallments([
								1,
								'count_installments',
								'installments',
								false,
							]),
						);
						setCount(count + 1);
					}}>
					Add New Installment
				</Button>
			</div>
		</>
	);
};

export default Stages;
