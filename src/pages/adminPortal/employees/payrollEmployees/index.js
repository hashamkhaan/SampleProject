// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { useFormik } from 'formik';

import moment from 'moment';
// eslint-disable-next-line import/order
import { ToWords } from 'to-words';
// eslint-disable-next-line import/order
import showNotification from '../../../../components/extras/showNotification';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import Spinner from '../../../../components/bootstrap/Spinner';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import GeneratePayroll from './generatePayroll';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Icon from '../../../../components/icon/Icon';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';

import ViewPayroll from './viewPayroll';

require('flatpickr/dist/plugins/monthSelect/style.css');
require('flatpickr/dist/flatpickr.css');

const validate = (values) => {
	const errors = {};
	if (values.totalAmount < 1) {
		errors.total_amount = 'Total Amount must be greater than 0';
	}
	return errors;
};

const TablePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingReset, setIsLoadingReset] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const [tableRecords, setTableRecords] = useState(null);
	const [tableRecordsDefault, setTableRecordsDefault] = useState(null);
	const [tableRecordsLoading, setTableRecordsLoading] = useState(false);
	const [refreshTableRecords, setRefreshTableRecords] = useState(0);
	const [dateForPayroll, setDateForPayroll] = useState(moment().format('MM/YY'));

	const refreshTableRecordsHandler = (arg) => {
		setRefreshTableRecords(arg);
	};

	const resetRecordsToDefault = () => {
		setIsLoadingReset(true);
		setTableRecords(tableRecordsDefault);
		setIsLoadingReset(false);
	};
	const dummyData = [
		{
			id: 0,
			employee_id: 58,
			basic_salary: 5000,
			working_days: 20,
			extra_hours: 0,
			late_hours: 0,
			bonus: 0,
			deduction: 0,
			leaves: 0,
			absentees: 0,
			late_fine: 0,
			absent_fine: 0,
			overtime_amount: 0,
			medical_allowance: 100,
			fuel_allowance: 100,
			other_allowance: 200,
			remarks: 'Salary for 09/22',
			total_amount: 5400,
			date: '09/22',
			employee_details: {
				id: 58,
				name: 'Atif',
				father_name: '56565',
				phone_no: '75757',
				email: null,
				cnic: '656565',
				address: '6565',
				created_at: '2022-09-09T12:44:37.000000Z',
				updated_at: '2022-09-09T12:44:37.000000Z',
				employee_profile: {
					id: 6,
					person_id: 58,
					department_id: 1,
					employee_type_id: 1,
					designation_id: 1,
					basic_salary: 5000,
					medical_allowance: 100,
					fuel_allowance: 100,
					other_allowance: 200,
					working_days: 20,
					overtime_percentage_per_hour: 10,
					late_fine_percentage_per_hour: 10,
					absentee_percentage: 10,
					joining_date: '2022-09-09',
					photo_file: null,
					gender: 'Male',
					created_at: '2022-09-09T12:44:37.000000Z',
					updated_at: '2022-09-09T12:44:37.000000Z',
					designation: {
						id: 1,
						name: ' Accounting',
					},
					department: {
						id: 1,
						name: 'ABC',
					},
					employee_type: {
						id: 1,
						type: 'Permanent',
					},
				},
			},
		},
		{
			id: 1,
			employee_id: 59,
			basic_salary: 2000,
			working_days: 30,
			extra_hours: 0,
			late_hours: 0,
			bonus: 0,
			deduction: 0,
			leaves: 0,
			absentees: 0,
			late_fine: 0,
			absent_fine: 0,
			overtime_amount: 0,
			medical_allowance: 200,
			fuel_allowance: 200,
			other_allowance: 50,
			remarks: 'Salary for 09/22',
			total_amount: 2450,
			date: '09/22',
			employee_details: {
				id: 59,
				name: 'Hashim',
				father_name: '353535',
				phone_no: '5435454',
				email: null,
				cnic: '53535',
				address: '35353',
				created_at: '2022-09-09T12:46:12.000000Z',
				updated_at: '2022-09-09T12:46:12.000000Z',
				employee_profile: {
					id: 7,
					person_id: 59,
					department_id: 3,
					employee_type_id: 2,
					designation_id: 2,
					basic_salary: 2000,
					medical_allowance: 200,
					fuel_allowance: 200,
					other_allowance: 50,
					working_days: 30,
					overtime_percentage_per_hour: 20,
					late_fine_percentage_per_hour: 30,
					absentee_percentage: 20,
					joining_date: '2022-09-09',
					photo_file: null,
					gender: 'Male',
					created_at: '2022-09-09T12:46:12.000000Z',
					updated_at: '2022-09-09T12:46:12.000000Z',
					designation: {
						id: 2,
						name: 'HR',
					},
					department: {
						id: 3,
						name: 'XYZ',
					},
					employee_type: {
						id: 2,
						type: 'Contract',
					},
				},
			},
		},
	];

	const getDataForPayrole = () => {
		setTableRecordsLoading(true);
		formik.setFieldValue('totalAmount', 0);

		Axios.get(`${baseURL}/getDataForPayrole?date=${dateForPayroll}`)
			.then((response) => {
				if (response.data.status === 'ok') {
					setTableRecords(response.data.data);
					setTableRecordsDefault(response.data.data);
					setTableRecordsLoading(false);
				} else {
					console.log('OKAYYYYYYY2', response.message, response.status);

					showNotification(_titleError, response.data.message, 'danger');
					setTableRecordsLoading(false);
				}
			})
			.catch((err) => {
				console.log(err);
				showNotification(_titleError, err.message, 'danger');
				setTableRecordsLoading(false);
			});
	};

	const setTableRecordsHandle = (data) => {
		setTableRecords(data);
	};
	useEffect(() => {
		let totalAmountCalculation = 0;
		const calc = tableRecords?.forEach((item) => {
			totalAmountCalculation += Number(item.total_amount);
		});
		formik.setFieldValue('totalAmount', totalAmountCalculation);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableRecords]);

	// jhjhjhk

	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	const _titleError = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Error </span>
		</span>
	);

	const submitForm = (myFormik) => {
		const url = `${baseURL}/generatePayRole`;
		const data1 = {
			data: tableRecords,
			date: dateForPayroll,
		};

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(data1),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					setTableRecords(null);
					showNotification(_titleSuccess, res.message, 'success');

					myFormik.resetForm();
					setLastSave(moment());
				} else {
					showNotification(_titleError, res.message, 'danger');
					console.log('Error');
				}
			});
	};

	const formik = useFormik({
		initialValues: {
			totalAmount: 0,
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
	const toWords = new ToWords({
		localeCode: 'en-US',
		converterOptions: {
			currency: true,
			ignoreDecimal: false,
			ignoreZeroCurrency: false,
			doNotAddOnly: false,
			currencyOptions: {
				// can be used to override defaults for the selected locale
				name: 'Rupee',
				plural: 'Rupees',
				symbol: 'PKR',
				fractionalUnit: {
					name: 'Paisa',
					plural: 'Paise',
					symbol: '',
				},
			},
		},
	});
	return (
		<PageWrapper>
			<Page>
				<Card>
					<CardHeader>
						<CardLabel icon='Money' iconColor='info'>
							<CardTitle>
								Generate Payroll <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<ButtonGroup>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
										<Button
											color='danger'
											isLight
											hoverShadow='default'
											icon='MoreVert'
										/>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd>
										<DropdownItem isHeader>Other Actions</DropdownItem>
										<DropdownItem>
											{/* <NavLink to='/components/popovers'>
																			<Icon icon='Send' />{' '}
																			Popover
																		</NavLink> */}
											Other Actions 2
										</DropdownItem>
									</DropdownMenu>
								</Dropdown>
							</ButtonGroup>
						</CardActions>
					</CardHeader>
					<CardBody>
						<>
							<div className='row'>
								<FormGroup label='Month' className='col-md-2'>
									<Flatpickr
										className='form-control'
										value={dateForPayroll}
										// eslint-disable-next-line react/jsx-boolean-value

										options={{
											minDate: '2022-09-1',
											maxDate: 'today',
											plugins: [
												// eslint-disable-next-line new-cap
												new monthSelectPlugin({
													shorthand: true,
													dateFormat: 'm/y',
													allowInput: true,
												}),
											],
										}}
										onChange={(date, dateStr) => {
											setDateForPayroll(dateStr);
										}}
										onClose={(date, dateStr) => {
											setDateForPayroll(dateStr);
										}}
										id='default-picker'
									/>
								</FormGroup>
								<FormGroup className='col-md-4'>
									<br />
									<Button
										className='col-md-12'
										color='info'
										isOutline
										isActive
										icon={tableRecordsLoading ? null : 'Add'}
										isDisable={tableRecordsLoading}
										hoverShadow='default'
										onClick={() => {
											getDataForPayrole();
										}}>
										{tableRecordsLoading && <Spinner isSmall inButton />}
										{tableRecordsLoading
											? 'Generating Payroll'
											: 'Generate Payroll'}
									</Button>
								</FormGroup>
							</div>
							{tableRecords !== null && (
								<div className='row'>
									<div className='col-12'>
										<Card shadow='none'>
											<ViewPayroll
												refreshTableRecordsHandler={
													refreshTableRecordsHandler
												}
												refreshTableRecords={refreshTableRecords}
												tableRecordsLoading={tableRecordsLoading}
												tableRecords={tableRecords}
												setTableRecordsHandle={setTableRecordsHandle}
											/>
										</Card>
									</div>
								</div>
							)}
							{tableRecords !== null && (
								<>
									<div className='row g-4 '>
										<div className='col-md-2' />
										<div className='col-md-10'>
											<div className='d-flex justify-content-between'>
												<CardLabel>
													<CardTitle>
														<CardLabel>Total Amount:</CardLabel>
													</CardTitle>
												</CardLabel>
												<CardLabel>
													<CardTitle>
														<CardLabel>
															PKR{' '}
															{formik.values.totalAmount.toLocaleString(
																undefined,
																{
																	maximumFractionDigits: 2,
																},
															)}
														</CardLabel>
													</CardTitle>
												</CardLabel>
											</div>
											<div className='d-flex justify-content-between'>
												{formik.errors.total_amount && (
													// <div className='invalid-feedback'>
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors.total_amount}
													</p>
												)}
											</div>

											<br />
										</div>
									</div>
									<div className='row g-4 '>
										<div className='col-md-2' />
										<div className='col-md-10'>
											<div className='d-flex justify-content-between'>
												<CardLabel>
													<CardTitle>
														<CardLabel>The sum of</CardLabel>
													</CardTitle>
												</CardLabel>
												<CardLabel>
													<CardTitle>
														<CardLabel>
															{toWords?.convert(
																formik?.values?.totalAmount,
															)}
														</CardLabel>
													</CardTitle>
												</CardLabel>
											</div>
											<div className='d-flex justify-content-between'>
												{formik.errors.total_amount && (
													// <div className='invalid-feedback'>
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors.total_amount}
													</p>
												)}
											</div>

											<br />
										</div>
									</div>
								</>
							)}
						</>
					</CardBody>
					<CardFooter>
						<CardFooterLeft>
							{tableRecords !== null && (
								<Button
									icon={isLoadingReset ? null : 'Undo'}
									isLight
									color={lastSave ? 'danger' : 'danger'}
									isDisable={isLoadingReset}
									onClick={() => resetRecordsToDefault()}>
									{isLoadingReset && <Spinner isSmall inButton />}
									{isLoadingReset
										? (lastSave && 'Resetting') || 'Resetting'
										: (lastSave && 'Reset to default') || 'Reset to default'}
								</Button>
							)}
						</CardFooterLeft>
						<CardFooterRight>
							{tableRecords !== null && (
								<Button
									icon={isLoading ? null : 'DoneAll'}
									isLight
									color={lastSave ? 'info' : 'info'}
									isDisable={isLoading}
									onClick={formik.handleSubmit}>
									{isLoading && <Spinner isSmall inButton />}
									{isLoading
										? (lastSave && 'Saving') || 'Saving'
										: (lastSave && 'Approve and Generate Voucher') ||
										  'Approve and Generate Voucher'}
								</Button>
							)}
						</CardFooterRight>
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;
