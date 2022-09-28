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

import 'flatpickr/dist/themes/light.css';
// ** Axios Imports

import { ToWords } from 'to-words';
import Spinner from '../../../../components/bootstrap/Spinner';

// import baseURL from '../../../../baseURL/baseURL';
import Icon from '../../../../components/icon/Icon';

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

	if (!values.working_days) {
		errors.working_days = 'Required';
	}
	if (values.total_amount < 1) {
		errors.total_amount = 'Total Amount must be greater than 0';
	}

	if (values.absentees > values.employee_details.employee_profile.working_days) {
		errors.absentees = 'Must be less than Total Working Days';
	}
	if (values.leaves > values.employee_details.employee_profile.working_days) {
		errors.leaves = 'Must be less than Total Working Days';
	}
	if (values.working_days < 0) {
		errors.working_days = 'Must be greater than 0';
	}

	return errors;
};

const AddCoeSubGroup = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	// const _titleError = (
	// 	<span className='d-flex align-items-center'>
	// 		<Icon icon='Info' size='lg' className='me-1' />
	// 		<span>Error Saving Record </span>
	// 	</span>
	// );

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

	const submitForm = (myFormik) => {
		props.setTableRecordsHandle([
			...props.tableRecords.slice(0, props.editingPayrollIndex),
			formik.values,
			...props.tableRecords.slice(props.editingPayrollIndex + 1),
		]);

		showNotification(_titleSuccess, 'Okay', 'success');
		console.log('LLLLL', props.tableRecords);
		// setState(false);
		myFormik.resetForm();
		props.handleStateEdit(false);
		setLastSave(moment());
	};

	const formik = useFormik({
		initialValues: props.editingPayrollData,
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
	// eslint-disable-next-line no-unused-vars

	useEffect(() => {
		formik.setFieldValue(
			'overtime_amount',
			formik.values.extra_hours *
				((formik.values.employee_details.employee_profile.overtime_percentage_per_hour /
					100) *
					formik.values.employee_details.employee_profile.basic_salary),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.extra_hours]);

	useEffect(() => {
		formik.setFieldValue(
			'late_fine',
			formik.values.late_hours *
				((formik.values.employee_details.employee_profile.late_fine_percentage_per_hour /
					100) *
					formik.values.employee_details.employee_profile.basic_salary),
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.late_hours]);
	useEffect(() => {
		formik.setFieldValue(
			'absent_fine',
			formik.values.absentees *
				((formik.values.employee_details.employee_profile.absentee_percentage / 100) *
					formik.values.employee_details.employee_profile.basic_salary),
		);
		formik.setFieldValue(
			'working_days',
			formik.values.employee_details.employee_profile.working_days -
				formik.values.absentees -
				formik.values.leaves,
		);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.absentees]);
	useEffect(() => {
		formik.setFieldValue(
			'working_days',
			formik.values.employee_details.employee_profile.working_days -
				formik.values.absentees -
				formik.values.leaves,
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.leaves]);
	useEffect(() => {
		if (formik.values.bonus !== '') {
			calculateTotalAmount();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.bonus]);
	useEffect(() => {
		if (formik.values.deduction !== '') {
			calculateTotalAmount();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.deduction]);
	useEffect(() => {
		calculateTotalAmount();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.absent_fine, formik.values.late_fine, formik.values.overtime_amount]);

	const calculateTotalAmount = () => {
		formik.setFieldValue(
			'total_amount',

			Number(
				formik.values.basic_salary +
					formik.values.bonus +
					formik.values.overtime_amount +
					formik.values.fuel_allowance +
					formik.values.medical_allowance +
					formik.values.other_allowance,
			) -
				Number(formik.values.deduction) -
				Number(formik.values.late_fine) -
				Number(formik.values.absent_fine),
		);
	};

	return (
		<div className='col-12'>
			<Card stretch tag='form' onSubmit={formik.handleSubmit} shadow='none'>
				<CardBody>
					<div className='row g-4'>
						<CardBody className='col-md-6 border-end'>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel>Basic Salary:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{formik.values.employee_details.employee_profile.basic_salary.toLocaleString(
												undefined,
												{
													maximumFractionDigits: 2,
												},
											)}
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel>Total Working Days:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{
												formik.values.employee_details.employee_profile
													.working_days
											}
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> medical_allowance:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{formik.values.employee_details.employee_profile.medical_allowance.toLocaleString(
												undefined,
												{
													maximumFractionDigits: 2,
												},
											)}
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> fuel_allowance:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{formik.values.employee_details.employee_profile.fuel_allowance.toLocaleString(
												undefined,
												{
													maximumFractionDigits: 2,
												},
											)}
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> other_allowance:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{formik.values.employee_details.employee_profile.other_allowance.toLocaleString(
												undefined,
												{
													maximumFractionDigits: 2,
												},
											)}
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> absentee_percentage :</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{
												formik.values.employee_details.employee_profile
													.absentee_percentage
											}
											%
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> Overtime %/Hr:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{
												formik.values.employee_details.employee_profile
													.overtime_percentage_per_hour
											}
											%
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<div className='row g-4'>
								<CardLabel className='col-md-6' icon='Task' iconColor='danger'>
									<CardTitle>
										<CardLabel> Late fine %/Hr:</CardLabel>
									</CardTitle>
								</CardLabel>
								<CardLabel className='col-md-6'>
									<CardTitle>
										<CardLabel>
											{
												formik.values.employee_details.employee_profile
													.late_fine_percentage_per_hour
											}
											%
										</CardLabel>
									</CardTitle>
								</CardLabel>
							</div>
							<br />
						</CardBody>

						<CardBody className='col-md-6 border-start'>
							<FormGroup
								id='working_days'
								label='Attended Working Days'
								className='col-md-6'>
								<Input
									type='number'
									min='0'
									readOnly
									onWheel={(e) => e.target.blur()}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.working_days}
									isValid={formik.isValid}
									isTouched={formik.touched.working_days}
									invalidFeedback={formik.errors.working_days}
									validFeedback='Looks good!'
								/>
							</FormGroup>
							<div className='row g-4'>
								<FormGroup
									id='extra_hours'
									label='extra_hours   '
									className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.extra_hours}
										isValid={formik.isValid}
										isTouched={formik.touched.extra_hours}
										invalidFeedback={formik.errors.extra_hours}
										validFeedback='Looks good!'
									/>
								</FormGroup>
								<FormGroup
									id='late_hours'
									label='late_hours   '
									className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.late_hours}
										isValid={formik.isValid}
										isTouched={formik.touched.late_hours}
										invalidFeedback={formik.errors.late_hours}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>

							<div className='row g-4'>
								<FormGroup id='leaves' label='leaves   ' className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.leaves}
										isValid={formik.isValid}
										isTouched={formik.touched.leaves}
										invalidFeedback={formik.errors.leaves}
										validFeedback='Looks good!'
									/>
								</FormGroup>
								<FormGroup id='absentees' label='absentees   ' className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.absentees}
										isValid={formik.isValid}
										isTouched={formik.touched.absentees}
										invalidFeedback={formik.errors.absentees}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='row g-4'>
								<FormGroup id='bonus' label='bonus   ' className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.bonus}
										isValid={formik.isValid}
										isTouched={formik.touched.bonus}
										invalidFeedback={formik.errors.bonus}
										validFeedback='Looks good!'
									/>
								</FormGroup>
								<FormGroup id='deduction' label='deduction   ' className='col-md-6'>
									<Input
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.deduction}
										isValid={formik.isValid}
										isTouched={formik.touched.deduction}
										invalidFeedback={formik.errors.deduction}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</CardBody>
					</div>
					<hr />

					<CardBody>
						<div className='row g-4 '>
							<div className='col-md-3' />
							<div className='col-md-6'>
								<div className='d-flex justify-content-evenly'>
									<CardLabel icon='Calculate' iconColor='danger'>
										<CardTitle>
											<CardLabel>Total Salary Calculation:</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel>Basic Salary:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.employee_details.employee_profile.basic_salary.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel>medical_allowance:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.employee_details.employee_profile.medical_allowance.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel> fuel_allowance:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.employee_details.employee_profile.fuel_allowance.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel> other_allowance:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.employee_details.employee_profile.other_allowance.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel> Bonus:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.bonus.toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> overtime_amount:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.overtime_amount.toLocaleString(
													undefined,
													{
														maximumFractionDigits: 2,
													},
												)}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<hr />
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> Total (Add):</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{(
													formik.values.basic_salary +
													formik.values.bonus +
													formik.values.overtime_amount +
													formik.values.fuel_allowance +
													formik.values.medical_allowance +
													formik.values.other_allowance
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<hr />
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> absent_fine:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.absent_fine.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel> late_fine:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.late_fine.toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> deduction:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{formik.values.deduction.toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<hr />
								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> Total (Less):</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{(
													formik.values.absent_fine +
													formik.values.late_fine +
													formik.values.deduction
												).toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</CardLabel>
										</CardTitle>
									</CardLabel>
								</div>
								<hr />

								<div className='d-flex justify-content-between'>
									<CardLabel>
										<CardTitle>
											<CardLabel> Total Salary Amount:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												PKR{' '}
												{formik.values.total_amount.toLocaleString(
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
									<CardLabel>
										<CardTitle>
											<CardLabel>In words:</CardLabel>
										</CardTitle>
									</CardLabel>
									<CardLabel>
										<CardTitle>
											<CardLabel>
												{toWords.convert(formik.values.total_amount)}
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
								<hr />
								<hr />
								<br />
							</div>
						</div>{' '}
					</CardBody>
				</CardBody>
				<CardFooter>
					<CardFooterLeft>
						<Button type='reset' color='info' isOutline onClick={formik.resetForm}>
							Reset to default
						</Button>
					</CardFooterLeft>
					<CardFooterRight>
						<Button
							icon={isLoading ? null : 'Update'}
							isLight
							color={lastSave ? 'info' : 'success'}
							isDisable={isLoading}
							onClick={formik.handleSubmit}>
							{isLoading && <Spinner isSmall inButton />}
							{isLoading
								? (lastSave && 'Updating') || 'Updating'
								: (lastSave && 'Update') || 'Update'}
						</Button>
					</CardFooterRight>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AddCoeSubGroup;
