// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable operator-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-return-assign */
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

import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/light.css';
// import PMT from 'formula-pmt';
// ** Axios Imports
import Axios from 'axios';
import Select from 'react-select';
import Spinner from '../../../../components/bootstrap/Spinner';
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';

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

	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';
import showNotification from '../../../../components/extras/showNotification';

const PMT = require('formula-pmt');

const validate = (values) => {
	const errors = {};

	if (!values.investor_id) {
		errors.investor_id = 'Required';
	}
	if (!values.loan_amount) {
		errors.loan_amount = 'Required';
	}
	if (!values.annual_profit_rate) {
		errors.annual_profit_rate = 'Required';
	}
	if (!values.loan_period_in_years) {
		errors.loan_period_in_years = 'Required';
	}
	if (!values.no_of_payments_per_year) {
		errors.no_of_payments_per_year = 'Required';
	}
	if (!values.start_date) {
		errors.start_date = 'Required';
	}

	return errors;
};

const AddCoeSubGroup = (props) => {
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
	const submitForm = (myFormik) => {
		const url = `${baseURL}/addLoanAmortization`;

		const dataSubmit = {
			investor_id: myFormik.values.investor_id,
			loan_amount: myFormik.values.loan_amount,
			annual_profit_rate: myFormik.values.annual_profit_rate,
			loan_period_in_years: myFormik.values.loan_period_in_years,
			extra_payment: myFormik.values.extra_payment,
			no_of_payments_per_year: myFormik.values.no_of_payments_per_year,
			start_date: myFormik.values.start_date,

			loan_amortization_schedule: loanSchedule,
		};
		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(dataSubmit),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					props.refreshTableRecordsHandler(props.refreshTableRecords + 1);
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);
					myFormik.resetForm();
					setLastSave(moment());
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
		setSizeStatus('xl');
		setFullScreenStatus(null);
		setAnimationStatus(true);
		setHeaderCloseStatus(true);
	};

	const formik = useFormik({
		initialValues: {
			investor_id: null,
			loan_amount: '',
			annual_profit_rate: '',
			loan_period_in_years: '',
			extra_payment: 0,
			no_of_payments_per_year: '',
			start_date: moment().format('DD/MM/YY'),
			Start_date_of_loan2: moment(),
		},
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
	const [investorsOptions, setInvestorsOptions] = useState([]);
	const [investorsOptionsLoading, setInvestorsOptionsLoading] = useState(true);
	const [calculatedPMT, setCalculatedPMT] = useState(0);
	const [loanSchedule, setLoanSchedule] = useState([]);
	const [loanScheduleLoading, setLoanScheduleLoading] = useState(false);

	useEffect(() => {
		if (
			formik.values.annual_profit_rate > 0 &&
			formik.values.no_of_payments_per_year >= 1 &&
			formik.values.loan_period_in_years >= 1 &&
			formik.values.loan_amount >= 1
		) {
			// eslint-disable-next-line no-unused-vars
			setCalculatedPMT(
				-1 *
					PMT(
						parseFloat(formik.values.annual_profit_rate) /
							100 /
							formik.values.no_of_payments_per_year,
						// : 0,
						Number(formik.values.no_of_payments_per_year) *
							Number(formik.values.loan_period_in_years),
						parseFloat(formik.values.loan_amount),
					),
			);
		}
	}, [formik.values]);
	useEffect(() => {
		setLoanScheduleLoading(true);

		let firstRow = [
			{
				id: 0,
				payment_date: formik.values.Start_date_of_loan2,
				beginning_balance: parseFloat(formik.values.loan_amount),
				scheduled_payment: parseFloat(calculatedPMT),
				extra_payment: 0 + parseFloat(formik.values.extra_payment),
				total_payment: parseFloat(calculatedPMT + parseFloat(formik.values.extra_payment)),
				principal:
					calculatedPMT +
					parseFloat(formik.values.extra_payment) -
					parseFloat(formik.values.loan_amount) *
						(parseFloat(formik.values.annual_profit_rate) /
							100 /
							parseFloat(formik.values.no_of_payments_per_year)),
				profit:
					parseFloat(formik.values.loan_amount) *
					(parseFloat(formik.values.annual_profit_rate) /
						100 /
						parseFloat(formik.values.no_of_payments_per_year)),
				ending_balance:
					formik.values.loan_amount -
					(calculatedPMT +
						parseFloat(formik.values.extra_payment) -
						parseFloat(formik.values.loan_amount) *
							(parseFloat(formik.values.annual_profit_rate) /
								100 /
								parseFloat(formik.values.no_of_payments_per_year))),
				cumulative_profit:
					parseFloat(formik.values.loan_amount) *
					(parseFloat(formik.values.annual_profit_rate) /
						100 /
						parseFloat(formik.values.no_of_payments_per_year)),
			},
		];

		const filledArray = Array.from(
			{
				length:
					Number(formik.values.no_of_payments_per_year) *
					Number(formik.values.loan_period_in_years),
			},
			(item, index) => {
				console.log(':::', item);
				console.log(':::', index);

				if (index === 0) {
					return firstRow[0];
				}
				const otherRow = [
					{
						id: index,
						payment_date: moment(firstRow[0].payment_date).add(1, 'M'),
						beginning_balance: parseFloat(firstRow[0].ending_balance),
						scheduled_payment: parseFloat(calculatedPMT),
						extra_payment: 0,
						total_payment: parseFloat(
							parseFloat(calculatedPMT) + Number(formik.values.extra_payment),
						),
						principal:
							calculatedPMT +
							parseFloat(formik.values.extra_payment) -
							parseFloat(firstRow[0].ending_balance) *
								(parseFloat(formik.values.annual_profit_rate) /
									100 /
									parseFloat(formik.values.no_of_payments_per_year)),
						profit:
							parseFloat(firstRow[0].ending_balance) *
							(parseFloat(formik.values.annual_profit_rate) /
								100 /
								parseFloat(formik.values.no_of_payments_per_year)),
						ending_balance:
							parseFloat(firstRow[0].ending_balance) -
							(calculatedPMT +
								parseFloat(formik.values.extra_payment) -
								parseFloat(firstRow[0].ending_balance) *
									(parseFloat(formik.values.annual_profit_rate) /
										100 /
										parseFloat(formik.values.no_of_payments_per_year))),
						cumulative_profit:
							parseFloat(firstRow[0].cumulative_profit) +
							parseFloat(firstRow[0].ending_balance) *
								(parseFloat(formik.values.annual_profit_rate) /
									100 /
									parseFloat(formik.values.no_of_payments_per_year)),
					},
				];
				firstRow = otherRow;
				return otherRow[0];
			},
		);
		setLoanSchedule(filledArray);

		setLoanScheduleLoading(false);

		console.log('****', loanSchedule);
		// const filledArray2 = [...new Array(10)].map((i, index) => ({ id: index }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [calculatedPMT, formik.values.start_date]);

	useEffect(() => {
		setInvestorsOptionsLoading(true);

		Axios.get(`${baseURL}/getInvestors`)
			.then((response) => {
				const rec = response.data.investors.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setInvestorsOptions(rec);
				setInvestorsOptionsLoading(false);
			})
			.catch((err) => console.log(err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				Get New Loan
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
					<CardLabel icon='Bank2'>
						<ModalTitle id='exampleModalLabel'>Loan Amortization Schedule</ModalTitle>
					</CardLabel>
				</ModalHeader>

				<ModalBody>
					<Card stretch tag='form' onSubmit={formik.handleSubmit}>
						<div className='row g-4'>
							<CardBody className='col-md-6 border-end'>
								<div className='row g-4'>
									<h3 className=' d-flex justify-content-center'>Enter Values</h3>
									<div className='col-md-6'>
										<FormGroup
											id='investor_id'
											label='Investor'
											className='col-md-12'>
											<Select
												className='col-md-12'
												// isClearable
												classNamePrefix='select'
												options={investorsOptions}
												isLoading={investorsOptionsLoading}
												value={
													formik.values.investor_id !== null &&
													investorsOptions.find(
														(c) =>
															c.value === formik.values.investor_id,
													)
												}
												// value={formik.values.mouza_id}
												onChange={(val) => {
													formik.setFieldValue('investor_id', val.id);
												}}
												isValid={formik.isValid}
												isTouched={formik.touched.investor_id}
												invalidFeedback={formik.errors.investor_id}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.investor_id && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.investor_id}
											</p>
										)}
									</div>
									<div className='col-md-6'>
										<FormGroup label='Start date of loan'>
											<Flatpickr
												className='form-control'
												value={formik.values.start_date}
												// eslint-disable-next-line react/jsx-boolean-value

												options={{
													dateFormat: 'd/m/y',
													allowInput: true,
												}}
												onChange={(date, dateStr) => {
													console.log(date);
													formik.setFieldValue('start_date', dateStr);
													formik.setFieldValue(
														'Start_date_of_loan2',
														date[0],
													);
												}}
												onClose={(date, dateStr) => {
													formik.setFieldValue('start_date', dateStr);
													formik.setFieldValue(
														'Start_date_of_loan2',
														date[0],
													);
												}}
												id='default-picker'
											/>
										</FormGroup>
										{formik.errors.start_date && (
											// <div className='invalid-feedback'>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.start_date}
											</p>
										)}
									</div>
								</div>
								<hr />

								<div className='row g-4'>
									<FormGroup
										id='loan_amount'
										label='Loan amount   '
										className='col-md-6'>
										<Input
											type='number'
											min='0'
											onWheel={(e) => e.target.blur()}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.loan_amount}
											isValid={formik.isValid}
											isTouched={formik.touched.loan_amount}
											invalidFeedback={formik.errors.loan_amount}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup
										id='Annual_profit_rate_Heading'
										label='Annual profit rate'
										className='col-md-6'>
										<InputGroup>
											<Input
												id='annual_profit_rate'
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.annual_profit_rate}
												isValid={formik.isValid}
												isTouched={formik.touched.annual_profit_rate}
												invalidFeedback={formik.errors.annual_profit_rate}
												validFeedback='Looks good!'
											/>
											<InputGroupText>%</InputGroupText>
										</InputGroup>
									</FormGroup>
								</div>
								<hr />

								<br />
								<div className='row g-4'>
									<FormGroup
										id='loan_period_in_years'
										label=' Loan period in years '
										className='col-md-6'>
										<Input
											type='number'
											min='0'
											onWheel={(e) => e.target.blur()}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.loan_period_in_years}
											isValid={formik.isValid}
											isTouched={formik.touched.loan_period_in_years}
											invalidFeedback={formik.errors.loan_period_in_years}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup
										id='no_of_payments_per_year'
										label=' Number of payments per year  '
										className='col-md-6'>
										<Input
											type='number'
											min='0'
											onWheel={(e) => e.target.blur()}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.no_of_payments_per_year}
											isValid={formik.isValid}
											isTouched={formik.touched.no_of_payments_per_year}
											invalidFeedback={formik.errors.no_of_payments_per_year}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</CardBody>
							<CardBody className='col-md-6 border-start'>
								<div className='row g-4 d-flex justify-content-evenly'>
									<h3 className=' d-flex justify-content-center'>Summary</h3>
									<div className='col-md-6'>
										<h5>Scheduled payment:</h5>
									</div>
									<div className='col-md-6'>
										<h5> PKR {parseFloat(calculatedPMT).toFixed(2)}</h5>
									</div>
								</div>
								<hr />
								<div className='row g-4'>
									<div className='col-md-6'>
										<h5>Scheduled number of payments: </h5>
									</div>
									<div className='col-md-6'>
										<h5>
											{formik.values.no_of_payments_per_year *
												formik.values.loan_period_in_years}
										</h5>
									</div>
								</div>
								<hr />

								<div className='row g-4'>
									<div className='col-md-6'>
										<h5>Actual number of payments: </h5>
									</div>
									<div className='col-md-6'>
										<h5>
											{formik.values.no_of_payments_per_year *
												formik.values.loan_period_in_years}
										</h5>
									</div>
								</div>

								<hr />

								<div className='row g-4'>
									<div className='col-md-6'>
										<h5>Total early payments: </h5>
									</div>
									<div className='col-md-6'>
										<h5>0</h5>
									</div>
								</div>
								<hr />
								<div className='row g-4'>
									<div className='col-md-6'>
										<h5>Total profit: </h5>
									</div>
									<div className='col-md-6'>
										<h5>
											PKR{' '}
											{parseFloat(
												loanSchedule.reduce(
													(a, v) => (a = a + parseFloat(v.profit)),
													0,
												),
											).toFixed(2)}
										</h5>
									</div>
								</div>
								<hr />
								<div className='row g-4'>
									<div className='col-md-6'>
										<h5>Principal + Profit: </h5>
									</div>
									<div className='col-md-6'>
										<h5>
											PKR{' '}
											{formik.values.loan_amount !== ''
												? parseFloat(
														parseFloat(
															loanSchedule.reduce(
																(a, v) =>
																	(a =
																		a +
																		parseFloat(
																			v !== undefined
																				? v.profit
																				: 0,
																		)),
																0,
															),
														) + parseFloat(formik.values.loan_amount),
												  ).toFixed(2)
												: 0}
										</h5>
									</div>
								</div>

								<hr />

								<br />

								<br />

								<br />
							</CardBody>
						</div>
						<hr />
						<div className='row g-4'>
							<CardBody className='col-md-6 '>
								<h3 className=' d-flex justify-content-center'>Schedule</h3>

								<table className='table table-modern'>
									<thead>
										<tr>
											<th>Payment Number</th>
											<th>Payment Date</th>
											<th>Beginning Balance </th>
											<th>Scheduled Payment </th>
											<th>Extra Payment </th>
											<th> Total Payment </th>
											<th> Principal </th>
											<th> Profit </th>
											<th> Ending Balance </th>
											<th> Cumulative Profit </th>
										</tr>
									</thead>
									{loanScheduleLoading ? (
										<tbody>
											<tr>
												<td colSpan='11'>
													<div className='d-flex justify-content-center'>
														<Spinner color='primary' size='5rem' />
													</div>
												</td>
											</tr>
										</tbody>
									) : (
										<tbody>
											{loanSchedule?.map((item) => (
												<tr key={item.id}>
													<td> {item.id + 1}</td>
													<td>
														{moment(item.payment_date).format(
															'DD/MM/YY',
														)}
													</td>
													<td>
														{parseFloat(item.beginning_balance).toFixed(
															2,
														)}
													</td>
													<td>
														{parseFloat(item.scheduled_payment).toFixed(
															2,
														)}
													</td>
													<td>
														{parseFloat(item.extra_payment).toFixed(2)}
													</td>
													<td>
														{parseFloat(item.total_payment).toFixed(2)}
													</td>
													<td>{parseFloat(item.principal).toFixed(2)}</td>
													<td> {parseFloat(item.profit).toFixed(2)}</td>
													<td>
														{parseFloat(
															Math.abs(item.ending_balance),
														).toFixed(2)}
													</td>
													<td>
														{parseFloat(item.cumulative_profit).toFixed(
															2,
														)}
													</td>
												</tr>
											))}
										</tbody>
									)}
								</table>
							</CardBody>
						</div>

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

export default AddCoeSubGroup;
