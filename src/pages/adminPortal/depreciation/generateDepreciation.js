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
import showNotification from '../../../components/extras/showNotification';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';
import Spinner from '../../../components/bootstrap/Spinner';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';

import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
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
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';

import ViewDepreciatingVoucher from './viewDepreciatingVoucher';

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

	const getDataForPayrole = () => {
		setTableRecordsLoading(true);
		formik.setFieldValue('totalAmount', 0);

		Axios.get(`${baseURL}/getDepreciatingAccounts?date=${dateForPayroll}`)
			.then((response) => {
				setTableRecords(response.data.data);
				setTableRecordsDefault(response.data.data);
				setTableRecordsLoading(false);
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
			totalAmountCalculation += Number(item.depreciatingAmount);
		});
		formik.setFieldValue('totalAmount', totalAmountCalculation);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tableRecords]);

	// jhjhjhk

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
		const url = `${baseURL}/addDepreciation`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
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
		<Card shadow='none' className='border-0'>
			<CardHeader className='px-0 pt-0'>
				<CardLabel icon='Engineering' iconColor='danger'>
					<CardTitle>
						Depreciable Accounts <small>Small</small>
					</CardTitle>
					<CardSubTitle>Subtitle</CardSubTitle>
				</CardLabel>
			</CardHeader>
			<CardBody className='px-0'>
				<>
					<div className='row'>
						<FormGroup label='Financial Year' className='col-md-2'>
							<Flatpickr
								className='form-control'
								value={dateForPayroll}
								// eslint-disable-next-line react/jsx-boolean-value

								options={{
									mode: 'range',
									dateFormat: 'Y-m-d',
									defaultDate: ['2021-10-10', '2022-10-20'],
									disable: [
										{
											from: '2020-09-1',
											to: '2021-08-31',
										},
										{
											from: '2022-09-01',
											to: '2023-08-31',
										},
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
									? 'Generating depreciation Voucher'
									: 'Generate depreciation Voucher'}
							</Button>
						</FormGroup>
					</div>
					{tableRecords !== null && (
						<div className='row'>
							<div className='col-12'>
								<Card shadow='none'>
									<ViewDepreciatingVoucher
										refreshTableRecordsHandler={refreshTableRecordsHandler}
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
													{toWords?.convert(formik?.values?.totalAmount)}
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
			<CardFooter className='px-0 pb-0'>
				<CardFooterLeft>
					<Button color='info' isOutline icon='DocumentScanner'>
						Action
					</Button>
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
	);
};

export default TablePage;
