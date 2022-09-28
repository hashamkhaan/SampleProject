// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import Select from 'react-select';
import moment from 'moment';
import Axios from 'axios';
import Spinner from '../../../components/bootstrap/Spinner';
import Icon from '../../../components/icon/Icon';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import useDarkMode from '../../../hooks/useDarkMode';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import showNotification from '../../../components/extras/showNotification';

import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import baseURL from '../../../baseURL/baseURL';
import { CardBody } from '../../../components/bootstrap/Card';

const validate = (values) => {
	const errors = {};

	// if (!values.block) {
	// 	errors.block = 'This field is required';
	// }

	let price = 0;

	price = Number(price) + Number(values.basic_price > 0 ? values.basic_price : 0);
	if (values.is_corner) {
		price =
			Number(price) + Number(values.basic_price > 0 ? Number(values.basic_price) * 0.15 : 0);
	}
	if (values.is_boulevard) {
		price =
			Number(price) + Number(values.basic_price > 0 ? Number(values.basic_price) * 0.15 : 0);
	}
	if (values.is_facing_park) {
		price =
			Number(price) + Number(values.basic_price > 0 ? Number(values.basic_price) * 0.15 : 0);
	}
	if (values.is_west_open) {
		price =
			Number(price) + Number(values.basic_price > 0 ? Number(values.basic_price) * 0.15 : 0);
	}
	values.price = price;

	if (!values.file_no) {
		errors.file_no = 'required';
	}
	if (values.plot_type === 'Residential') {
		if (!values.plot_size_id) {
			errors.plot_size_id = 'required';
		}
	} else {
		// eslint-disable-next-line no-lonely-if
		if (!values.size_in_SRFT) {
			errors.size_in_SRFT = 'required';
		}
	}

	if (!values.reg_no) {
		errors.reg_no = 'required';
	}
	if (!values.plot_type) {
		errors.plot_type = 'required';
	}
	if (!values.basic_price) {
		errors.basic_price = 'required';
	}

	// eslint-disable-next-line no-console
	console.log('errors', errors);
	console.log('values', values);
	return errors;
};
const AddPlots = (props) => {
	const { themeStatus } = useDarkMode();
	const [GetSizes, setGetSizes] = useState([]);
	// const _titleSuccess = (
	// 	<span className='d-flex align-items-center'>
	// 		<Icon icon='Info' size='lg' className='me-1' />
	// 		<span>Record Saved Successfully</span>
	// 	</span>
	// );
	// const _titleError = (
	// 	<span className='d-flex align-items-center'>
	// 		<Icon icon='Info' size='lg' className='me-1' />
	// 		<span>Error Saving Record </span>
	// 	</span>
	// );

	// eslint-disable-next-line no-unused-vars
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
	const formik = useFormik({
		// eslint-disable-next-line react/destructuring-assignment
		initialValues: props.editingItem,
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		// eslint-disable-next-line no-console

		submitForm(formik.values);
		setLastSave(moment());
	};

	useEffect(() => {
		const getPlotSize = (blockID) => {
			Axios.get(`${baseURL}/getPlotSize?block_id=${blockID !== undefined ? blockID : ''}`)
				.then((response) => {
					const rec = response.data.plotSize.map(({ id, size, size_in_SQFT }) => ({
						id,
						value: id,
						label: `${size}=${size_in_SQFT}`,
					}));
					setGetSizes(rec);
				})
				// eslint-disable-next-line no-console
				.catch((err) => console.log(err));
		};
		getPlotSize();
	}, []);
	const submitForm = (data) => {
		// eslint-disable-next-line react/destructuring-assignment
		const url = `${baseURL}/updatePlot?plot_id=${props.editingItem.id}`;

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
					// showNotification('Success', res.message, 'success');
					formik.resetForm();
					// eslint-disable-next-line react/destructuring-assignment
					props.handleStateEdit(false);
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Saved Successfully</span>
						</span>,
						`${res.message}`,
					);
				} else if (res.voucher_no[0].includes('The voucher no has already been taken')) {
					showNotification('Error', res.voucher_no[0], 'danger');
				} else {
					showNotification('Error', res.message, 'danger');
				}
			})
			.catch((err) => showNotification('Error', err.message, 'danger'));
	};
	const PlotTypes = [
		{
			id: 1,
			value: 1,
			label: 'Residential',
		},
		{
			id: 2,
			value: 2,
			label: 'Commercial',
			disabled: true,
		},
	];

	const uncheckAllOthers = (value) => {
		if (value === true) {
			formik.setFieldValue(`is_corner`, false);
			formik.setFieldValue(`is_boulevard`, false);
			formik.setFieldValue(`is_facing_park`, false);
			formik.setFieldValue(`is_west_open`, false);
		}
	};
	const uncheckIsGeneral = (value) => {
		if (value === true) {
			formik.setFieldValue(`is_general`, false);
		}
	};
	// eslint-disable-next-line no-unused-vars

	return (
		<CardBody>
			<div className='row'>
				<div
					className='row'
					style={{
						marginTop: 20,
					}}>
					{/* Start of multipl rows  */}

					<div className='col-md-9 border-end'>
						<div className='row' key={formik.values.file_no}>
							<div className='col-md-2'>
								<FormGroup id='file_no' label='File No.' className='col-md-12'>
									<Input
										type='number'
										min='1'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.file_no}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.file_no}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-4'>
								<FormGroup id='reg_no' label='Reg  No' className='col-md-12'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.reg_no}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.reg_no}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-3'>
								<FormGroup id='plot_type' label='Plot Type'>
									<Select
										readOnly
										className='col-md-12'
										options={PlotTypes}
										// isLoading={crAccountLoading}
										value={
											formik.values.plot_type !== null &&
											PlotTypes.find(
												(c) => c.label === formik.values.plot_type,
											)
										}
										isOptionDisabled={(option) => option.disabled}
										onChange={(e) => {
											formik.setFieldValue(`plot_type`, e.label);
										}}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.plot_type}
										validFeedback='Looks good!'
									/>
								</FormGroup>
								{formik.errors.plot_type && (
									<p
										style={{
											color: 'red',
										}}>
										{formik.errors.plot_type}
									</p>
								)}
							</div>

							{formik.values.plot_type === 'Residential' ? (
								<div className='col-md-3'>
									<FormGroup id='plot_size_id' label='Size'>
										<Select
											className='col-md-12'
											options={GetSizes}
											// isLoading={crAccountLoading}
											value={
												formik.values.plot_size_id !== null &&
												GetSizes.find(
													(c) => c.id === formik.values.plot_size_id,
												)
											}
											onChange={(e) => {
												formik.setFieldValue(`plot_size_id`, e);
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.plot_size_id}
											invalidFeedback={formik.errors.plot_size_id}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									{formik.errors.plot_size_id && (
										<p
											style={{
												color: 'red',
											}}>
											{formik.errors.plot_size_id}
										</p>
									)}
								</div>
							) : (
								<div className='col-md-3'>
									<FormGroup
										id='size_in_SRFT'
										label='size in Sqft'
										className='col-md-12'>
										<Input
											type='number'
											min='1'
											onWheel={(e) => e.target.blur()}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.size_in_SRFT}
											isValid={formik.isValid}
											isTouched
											invalidFeedback={formik.errors.size_in_SRFT}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							)}
						</div>

						<div
							className='row'
							style={{
								marginTop: 10,
							}}>
							<div className='col-md-4'>
								<FormGroup
									id='development_charges'
									label='Development Charges'
									className='col-md-12'>
									<Input
										type='number'
										min='1'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.development_charges}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.development_charges}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-4'>
								<FormGroup
									id='posession_charges'
									label='Posession Charges'
									className='col-md-12'>
									<Input
										type='number'
										min='1'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.posession_charges}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.posession_charges}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-4'>
								<FormGroup
									id='utility_charges'
									label='Utility Charges'
									className='col-md-12'>
									<Input
										type='number'
										min='1'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.utility_charges}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.utility_charges}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
						</div>
						<br />
					</div>
					<div className='col-md-3'>
						<div className='row'>
							<div className='col-md-12'>
								<FormGroup
									id='basic_price'
									label='Plot Value'
									className='col-md-12'>
									<Input
										type='number'
										min='1'
										onWheel={(e) => e.target.blur()}
										onChange={(e) => {
											formik.setFieldValue(`basic_price`, e.target.value);
											// calculateSellingPrice(
											// 	e.target.value,
											// 	index,
											// );
										}}
										onBlur={formik.handleBlur}
										value={formik.values.basic_price}
										isValid={formik.isValid}
										isTouched
										invalidFeedback={formik.errors.basic_price}
										validFeedback='Looks good!'
									/>
								</FormGroup>
							</div>
							<div className='col-md-12'>
								<FormGroup label=''>
									<ChecksGroup>
										<Checks
											type='checkbox'
											id='is_general'
											label='General'
											name='checkedCheck'
											onChange={(e) => {
												formik.setFieldValue(
													`is_general`,
													e.target.checked === true
														? e.target.checked
														: true,
												);
												uncheckAllOthers(e.target.checked);
											}}
											isValid={formik.isValid}
											checked={formik.values.is_general}
										/>
									</ChecksGroup>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup label=''>
									<ChecksGroup>
										<Checks
											isValid={formik.isValid}
											type='checkbox'
											id='is_west_open'
											label='West Open'
											name='checkedCheck'
											onChange={(e) => {
												formik.setFieldValue(
													`is_west_open`,
													e.target.checked,
												);
												uncheckIsGeneral(e.target.checked);
											}}
											checked={formik.values.is_west_open}
										/>
									</ChecksGroup>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup label=''>
									<ChecksGroup>
										<Checks
											isValid={formik.isValid}
											type='checkbox'
											id='is_corner'
											label='Corner'
											name='checkedCheck'
											onChange={(e) => {
												formik.setFieldValue(`is_corner`, e.target.checked);
												uncheckIsGeneral(e.target.checked);
											}}
											checked={formik.values.is_corner}
										/>
									</ChecksGroup>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup label=''>
									<ChecksGroup>
										<Checks
											isValid={formik.isValid}
											type='checkbox'
											id='is_boulevard'
											label='Boulevard'
											name='checkedCheck'
											onChange={(e) => {
												formik.setFieldValue(
													`is_boulevard`,
													e.target.checked,
												);
												uncheckIsGeneral(e.target.checked);
											}}
											checked={formik.values.is_boulevard}
										/>
									</ChecksGroup>
								</FormGroup>
							</div>
							<div className='col-md-6'>
								<FormGroup label=''>
									<ChecksGroup>
										<Checks
											isValid={formik.isValid}
											type='checkbox'
											id='is_facing_park'
											label='Facing Park'
											name='checkedCheck'
											onChange={(e) => {
												formik.setFieldValue(
													`is_facing_park`,
													e.target.checked,
												);
												uncheckIsGeneral(e.target.checked);
											}}
											checked={formik.values.is_facing_park}
										/>
									</ChecksGroup>
								</FormGroup>
							</div>
							<div className='col-md-12'>
								Selling Price:
								{formik.values.price}---
								{parseFloat(formik.values.basic_price) +
									(formik.values.is_corner === true ? 1 : 0)}
							</div>
						</div>
					</div>

					<br />
					<hr />
				</div>
			</div>
			<div className='row g-4'>
				<div className='col-md-10' />
				<div className='col-auto'>
					<div className='row g-1'>
						<div className='col-auto'>
							<br />
							<Button
								className='me-3'
								icon={isLoading ? null : 'Update'}
								color={lastSave ? 'primary' : 'primary'}
								isDisable={isLoading}
								onClick={formik.handleSubmit}>
								{isLoading && <Spinner isSmall inButton />}
								{isLoading
									? (lastSave && 'Updating') || 'Updating'
									: (lastSave && 'Update') || 'Update'}
							</Button>
						</div>

						<div className='col-auto'>
							<br />
							<Dropdown direction='up'>
								<DropdownToggle hasIcon={false}>
									<Button color={themeStatus} icon='MoreVert' />
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button
											className='me-3'
											icon='Save'
											isLight
											isDisable={isLoading}
											onClick={formik.resetForm}>
											Reset to original
										</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</CardBody>
	);
};

export default AddPlots;
