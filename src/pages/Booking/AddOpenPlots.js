// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import Select from 'react-select';
import moment from 'moment';
import Axios from 'axios';
import Spinner from '../../components/bootstrap/Spinner';
import Icon from '../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Card, {
	CardSubTitle,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
} from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import showNotification from '../../components/extras/showNotification';

import Checks, { ChecksGroup } from '../../components/bootstrap/forms/Checks';
import baseURL from '../../baseURL/baseURL';

const validate = (values) => {
	let errors = {};

	values.list.forEach((data, index) => {
		let price = 0;

		price = Number(price) + Number(data.basicPrice > 0 ? data.basicPrice : 0);
		if (data.is_corner) {
			price = Number(price) + Number(data.basicPrice > 0 ? Number(data.basicPrice) * 0.1 : 0);
		}
		if (data.is_boulevard) {
			price = Number(price) + Number(data.basicPrice > 0 ? Number(data.basicPrice) * 0.1 : 0);
		}
		if (data.is_facing_park) {
			price = Number(price) + Number(data.basicPrice > 0 ? Number(data.basicPrice) * 0.1 : 0);
		}
		if (data.is_west_open) {
			price = Number(price) + Number(data.basicPrice > 0 ? Number(data.basicPrice) * 0.1 : 0);
		}
		data.price = price;

		if (!data.file_no) {
			errors = {
				...errors,
				[`list[${index}]file_no`]: 'required',
			};
		}
		if (!data.reg_no) {
			errors = {
				...errors,
				[`list[${index}]reg_no`]: 'required',
			};
		}
		if (data.plot_type === 'Residential') {
			if (!data.size_id) {
				errors = {
					...errors,
					[`list[${index}]size_id`]: 'required',
				};
			}
		} else {
			// eslint-disable-next-line no-lonely-if
			if (!data.size_in_SRFT) {
				errors = {
					...errors,
					[`list[${index}]size_in_SRFT`]: 'required',
				};
			}
		}

		if (!data.plot_type) {
			errors = {
				...errors,
				[`list[${index}]plot_type`]: 'required',
			};
		}
		if (!data.basicPrice) {
			errors = {
				...errors,
				[`list[${index}]basicPrice`]: 'required',
			};
		}
	});
	// eslint-disable-next-line no-console
	console.log('errors', errors);
	return errors;
};

const AddPlots = (props) => {
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

	const [GetBlocksArray, setGetBlocksArray] = useState([]);
	const [GetStreetsArray, setGetStreetsArray] = useState([]);
	const [GetSizes, setGetSizes] = useState([]);

	// const GetSizes = [{ id: 13, value: 13, label: '25X45=1125' }];
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

	const submitForm = (data) => {
		const url = `${baseURL}/addPlot`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				block_id: data.block.id,
				street_id: data.street.id,
				plot_array: data.list,
			}),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					formik.resetForm();
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);
					// eslint-disable-next-line react/destructuring-assignment
					props.refreshPlots();

					setLastSave(moment());
				} else {
					showNotification(_titleError, res.message, 'danger');
					setIsLoading(false);
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
		setSizeStatus('xl');
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};
	const formik = useFormik({
		initialValues: {
			street: '',
			block: '',

			list: [
				{
					plot_no: '',
					file_no: '',
					reg_no: '',
					basicPrice: '',
					price: '',
					development_charges: '',
					posession_charges: '',
					utility_charges: '',
					size_in_SRFT: 1125,
					size_id: null,
					plot_type: 'Residential',
					is_general: true,
					is_corner: false,
					is_boulevard: false,
					is_west_open: false,
					is_facing_park: false,
					is_open: true,
				},
			],
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
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
	const handleSave = () => {
		submitForm(formik.values);
		setLastSave(moment());
	};

	const uncheckAllOthers = (value, index) => {
		if (value === true) {
			formik.setFieldValue(`list[${index}].is_corner`, false);
			formik.setFieldValue(`list[${index}].is_boulevard`, false);
			formik.setFieldValue(`list[${index}].is_facing_park`, false);
			formik.setFieldValue(`list[${index}].is_west_open`, false);
		}
	};
	const uncheckIsGeneral = (value, index) => {
		if (value === true) {
			formik.setFieldValue(`list[${index}].is_general`, false);
		}
	};

	const calculateSellingPrice = (basicPrice, index) => {
		let price = 0;

		price = Number(price) + Number(basicPrice > 0 ? basicPrice : 0);
		if (formik.values.list[index].is_corner) {
			price = Number(price) + Number(basicPrice > 0 ? Number(basicPrice) * 0.1 : 0);
		}
		if (formik.values.list[index].is_boulevard) {
			price = Number(price) + Number(basicPrice > 0 ? Number(basicPrice) * 0.1 : 0);
		}
		if (formik.values.list[index].is_facing_park) {
			price = Number(price) + Number(basicPrice > 0 ? Number(basicPrice) * 0.1 : 0);
		}
		if (formik.values.list[index].is_west_open) {
			price = Number(price) + Number(basicPrice > 0 ? Number(basicPrice) * 0.1 : 0);
		}
		const temp = formik
			.setFieldValue(`list[${index}].price`, price)
			.then(console.log(';;;', formik.values.list[index].price, temp));
		// eslint-disable-next-line no-console
	};

	useEffect(() => {
		Axios.get(`${baseURL}/getBlocksDropdown`)
			.then((response) => {
				const rec = response.data.blocks.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetBlocksArray(rec);
				// setPurchaserOptionsLoading(false)
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getStreetsDropdown`)
			.then((response) => {
				const rec = response.data.streets.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetStreetsArray(rec);
				// setPurchaserOptionsLoading(false)
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
		getPlotSize();
	}, []);

	const removeRow = (i) => {
		formik.setFieldValue('list', [
			...formik.values.list.slice(0, i),
			...formik.values.list.slice(i + 1),
		]);
		// eslint-disable-next-line no-console
	};
	const addRow = () => {
		formik.setFieldValue('list', [
			...formik.values.list,
			{
				plot_no: '',
				file_no: '',
				reg_no: '',
				basicPrice: '',
				development_charges: '',
				posession_charges: '',
				utility_charges: '',
				size_in_SRFT: 1125,
				size_id: null,
				plot_type: 'Residential',
				is_general: true,
				is_corner: false,
				is_boulevard: false,
				is_west_open: false,
				is_facing_park: false,
				is_open: true,
			},
		]);
		// eslint-disable-next-line no-console
	};

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
				Add Open plot
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
					<ModalTitle id='exampleModalLabel'>Add Open Plot Details</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='CheckBox' iconColor='info'>
									<CardSubTitle>Fill out all below fields</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row'>
									<hr />
									<div
										className='row'
										style={{
											marginTop: 20,
										}}>
										{/* Start of multipl rows  */}
										{formik.values.list.length > 0 &&
											formik.values.list.map((drListComponents, index) => (
												// eslint-disable-next-line react/no-array-index-key
												<>
													<div className='col-md-9 border-end'>
														<div
															className='row'
															key={formik.values.list.plot_no}>
															<div className='col-md-2'>
																<FormGroup
																	id={`list[${index}].file_no`}
																	label='File No'
																	className='col-md-12'>
																	<Input
																		type='number'
																		min='1'
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			drListComponents.file_no
																		}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors[
																				`list[${index}]file_no`
																			]
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-md-4'>
																<FormGroup
																	id={`list[${index}].reg_no`}
																	label='Reg  No'
																	className='col-md-12'>
																	<Input
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			drListComponents.reg_no
																		}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors[
																				`list[${index}]reg_no`
																			]
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>

															<div className='col-md-3'>
																<FormGroup
																	id='plot_type'
																	label='Plot Type'>
																	<Select
																		className='col-md-12'
																		options={PlotTypes}
																		// isLoading={crAccountLoading}
																		value={
																			drListComponents.plot_type !==
																				null &&
																			PlotTypes.find(
																				(c) =>
																					c.label ===
																					drListComponents.plot_type,
																			)
																		}
																		isOptionDisabled={(
																			option,
																		) => option.disabled}
																		onChange={(e) => {
																			formik.setFieldValue(
																				`list[${index}].plot_type`,
																				e.label,
																			);
																		}}
																		onBlur={formik.handleBlur}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors.plot_type
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
																{formik.errors[
																	`list[${index}]plot_type`
																] && (
																	<p
																		style={{
																			color: 'red',
																		}}>
																		{
																			formik.errors[
																				`list[${index}]plot_type`
																			]
																		}
																	</p>
																)}
															</div>

															{drListComponents.plot_type ===
															'Residential' ? (
																<div className='col-md-3'>
																	<FormGroup
																		id='size_id'
																		label='Size'>
																		<Select
																			className='col-md-12'
																			options={GetSizes}
																			// isLoading={crAccountLoading}
																			value={
																				drListComponents.size_id
																			}
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].size_id`,
																					e,
																				);
																			}}
																			onBlur={
																				formik.handleBlur
																			}
																			isValid={formik.isValid}
																			isTouched={
																				formik.touched
																					.size_id
																			}
																			invalidFeedback={
																				formik.errors
																					.size_id
																			}
																			validFeedback='Looks good!'
																		/>
																	</FormGroup>
																	{formik.errors[
																		`list[${index}]size_id`
																	] && (
																		<p
																			style={{
																				color: 'red',
																			}}>
																			{
																				formik.errors[
																					`list[${index}]size_id`
																				]
																			}
																		</p>
																	)}
																</div>
															) : (
																<div className='col-md-3'>
																	<FormGroup
																		id={`list[${index}].size_in_SRFT`}
																		label='size in Sqft'
																		className='col-md-12'>
																		<Input
																			readOnly
																			onChange={
																				formik.handleChange
																			}
																			onBlur={
																				formik.handleBlur
																			}
																			value={
																				drListComponents.size_in_SRFT
																			}
																			isValid={formik.isValid}
																			isTouched
																			invalidFeedback={
																				formik.errors[
																					`list[${index}]size_in_SRFT`
																				]
																			}
																			validFeedback='Looks good!'
																		/>
																	</FormGroup>
																</div>
															)}
														</div>

														<br />
														<div
															className='row'
															style={{
																marginTop: 10,
															}}>
															<div
																className='row'
																style={{
																	marginTop: 10,
																}}>
																<div className='col-md-3'>
																	<Button
																		icon='cancel'
																		color='danger'
																		onClick={() =>
																			removeRow(index)
																		}>
																		Remove
																	</Button>
																</div>
															</div>
														</div>
													</div>
													<div className='col-md-3'>
														<div className='row'>
															<div className='col-md-12'>
																<FormGroup
																	type='number'
																	min='1'
																	onWheel={(e) => e.target.blur()}
																	id={`list[${index}].basicPrice`}
																	label='Plot Value'
																	className='col-md-12'>
																	<Input
																		onChange={(e) => {
																			formik.setFieldValue(
																				`list[${index}].basicPrice`,
																				e.target.value,
																			);
																		}}
																		onBlur={formik.handleBlur}
																		value={
																			drListComponents.basicPrice
																		}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors[
																				`list[${index}]basicPrice`
																			]
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
															<div className='col-md-12'>
																<FormGroup label=''>
																	<ChecksGroup>
																		<Checks
																			type='checkbox'
																			id={`list[${index}].is_general`}
																			label='General'
																			name='checkedCheck'
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].is_general`,
																					e.target
																						.checked ===
																						true
																						? e.target
																								.checked
																						: true,
																				);
																				uncheckAllOthers(
																					e.target
																						.checked,
																					index,
																				);
																			}}
																			isValid={formik.isValid}
																			checked={
																				drListComponents.is_general
																			}
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
																			id={`list[${index}].is_west_open`}
																			label='West Open'
																			name='checkedCheck'
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].is_west_open`,
																					e.target
																						.checked,
																				);
																				uncheckIsGeneral(
																					e.target
																						.checked,
																					index,
																				);
																			}}
																			checked={
																				drListComponents.is_west_open
																			}
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
																			id={`list[${index}].is_corner`}
																			label='Corner'
																			name='checkedCheck'
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].is_corner`,
																					e.target
																						.checked,
																				);
																				uncheckIsGeneral(
																					e.target
																						.checked,
																					index,
																				);
																			}}
																			checked={
																				drListComponents.is_corner
																			}
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
																			id={`list[${index}].is_boulevard`}
																			label='Boulevard'
																			name='checkedCheck'
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].is_boulevard`,
																					e.target
																						.checked,
																				);
																				uncheckIsGeneral(
																					e.target
																						.checked,
																					index,
																				);
																			}}
																			checked={
																				drListComponents.is_boulevard
																			}
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
																			id={`list[${index}].is_facing_park`}
																			label='Facing Park'
																			name='checkedCheck'
																			onChange={(e) => {
																				formik.setFieldValue(
																					`list[${index}].is_facing_park`,
																					e.target
																						.checked,
																				);
																				uncheckIsGeneral(
																					e.target
																						.checked,
																					index,
																				);
																			}}
																			checked={
																				drListComponents.is_facing_park
																			}
																		/>
																	</ChecksGroup>
																</FormGroup>
															</div>
															<div className='col-md-12'>
																<FormGroup
																	id={`list[${index}].price`}
																	label='Selling Price'
																	className='col-md-12'>
																	<Input
																		type='number'
																		min='1'
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		readOnly
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			drListComponents.price
																		}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors[
																				`list[${index}]price`
																			]
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														</div>
													</div>

													<br />
													<hr
														style={{
															marginTop: 20,
														}}
													/>
												</>
											))}
									</div>
								</div>
								{/* End of dynamic row */}

								<div
									className='row'
									style={{
										marginTop: 10,
									}}>
									<div className='col-md-3'>
										{/* <Button
											icon='add'
											className='me-3'
											color='success'
											onClick={() => addRow()}
										/> */}
										<Button
											className='me-3'
											icon='add'
											color='success'
											onClick={() => addRow()}>
											Add Plot
										</Button>
									</div>
								</div>
							</CardBody>
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
										className='me-3'
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
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => {
							setState(false);
						}}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default AddPlots;
