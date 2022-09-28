// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, AccordionHeader, AccordionBody } from 'reactstrap';
import Axios from 'axios';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import moment from 'moment';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Repeater from './stages/repeater/index';
import Alert, { AlertHeading, AlertLink } from '../../../components/bootstrap/Alert';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import showNotification from '../../../components/extras/showNotification';

// ** Store & Actions
import baseURL from '../../../baseURL/baseURL';
// ** Axios Imports
import {
	updateFormIsValid,
	updateFormDetails,
	// eslint-disable-next-line camelcase
	updatekhasra_recordProperties,
	// eslint-disable-next-line camelcase
	updatekhasra_recordPropertiesSizeInKhasra,
	updateKhasraInnerProperties,
} from '../redux/purchaseLandStore/index';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Button from '../../../components/bootstrap/Button';
import ClearMoreLand from './ClearMoreLandRepeater';
// ** Custom Components
import ConvertSizeIntoSqft from '../formulas/ConvertSizeIntoSqft';
import ConvertSqftIntoSize from '../formulas/ConvertSqftIntoSize';

const validate = (values) => {
	const errors = {};
	if (!values.validationFirstName) {
		errors.validationFirstName = 'Required';
	} else if (values.validationFirstName.length > 15) {
		errors.validationFirstName = 'Must be 15 characters or less';
	}

	return errors;
};

const ConvertPurchasingLandTo_ = (khasraLand) => {
	let totalInSquareFeet = 0;
	// let totalInKanal = 0;
	let size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

	if (khasraLand.length > 0) {
		if (khasraLand !== undefined) {
			khasraLand.forEach((data) => {
				const size2 = {
					kanal: data.kanal,
					marla: data.marla,
					sarsai: data.sarsai,
					feet: data.feet,
				};

				totalInSquareFeet += ConvertSizeIntoSqft(size2);
			});

			size = ConvertSqftIntoSize(totalInSquareFeet);

			return size;
		}
	}

	return size;
};

const ValidationPage = () => {
	const [convertedSize, setConvertedSize] = useState([]);
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
	const formik = useFormik({
		initialValues: {
			validationkanal: 30,
			validationmarla: 30,
			validationsarsai: 30,
			validationfeer: 30,
			validationkanal2: 0,
			validationmarla2: 0,
			validationsarsai2: 0,
			validationfeer2: 0,
			validationFirstName: '',
			validationLastName: '',
			validationCustomUsername: '',
			validationCity: '',
			validationState: '',
			validationZip: '',
			validationDesc: '',
			validationRadios: '',
			validationCheck: false,
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});
	const [registriesOptions, setRegistriesOptions] = useState([]);

	useEffect(() => {
		const rec = store.data.registries.map(({ id, number }) => ({
			id,
			value: id,
			label: number,
			kanal: '',
			marla: '',
			sarsai: '',
			feet: '',
			bm_kanal: '',
			bm_marla: '',
			bm_sarsai: '',
			bm_feet: '',
			bk_kanal: '',
			bk_marla: '',
			bk_sarsai: '',
			bk_feet: '',
			rda_kanal: '',
			rda_marla: '',
			rda_sarsai: '',
			rda_feet: '',
			inteqal_number: '',
			inteqal_date: store.data.form1.date,
			inteqal_description: '',
			inteqal_file: '',
			fard_number: '',
			fard_date: store.data.form1.date,
			fard_file: '',
		}));
		setRegistriesOptions(rec);

		//   setLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store.data.registries]);

	const purchasingLandNotGreaterThanActualLand = () => {};

	const changeHandlerFileFard = (event, i, index) => {
		event.preventDefault();

		dispatch(
			updateKhasraInnerProperties([
				event.target.files[0],
				'khasra_record',
				i,
				'registries',
				index,
				'fard_file',
			]),
		);
	};
	const changeHandlerFileInteqal = (event, i, index) => {
		event.preventDefault();
		dispatch(
			updateKhasraInnerProperties([
				event.target.files[0],
				'khasra_record',
				i,
				'registries',
				index,
				'inteqal_file',
			]),
		);
	};

	const updatePurchasingLandInKhasra = (khasraLand, i) => {
		let totalInSquareFeet = 0;
		// let totalInKanal = 0;
		let size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (khasraLand.length > 0) {
			if (khasraLand !== undefined) {
				khasraLand.forEach((data) => {
					const size2 = {
						kanal: data.kanal,
						marla: data.marla,
						sarsai: data.sarsai,
						feet: data.feet,
					};

					totalInSquareFeet += ConvertSizeIntoSqft(size2);
				});

				size = ConvertSqftIntoSize(totalInSquareFeet);

				// dispatch(
				// 	updatekhasra_recordPropertiesSizeInKhasra([
				// 		size.kanal,
				// 		'khasra_record',
				// 		i,
				// 		'kanal',
				// 		'marla',
				// 		size.marla,
				// 		'sarsai',
				// 		size.sarsai,
				// 		'feet',
				// 		size.feet,
				// 	]),
				// );
				// dispatch(updatekhasra_recordProperties([size.kanal, 'khasra_record', i, 'kanal']));
				// dispatch(updatekhasra_recordProperties([size.marla, 'khasra_record', i, 'marla']));
				// dispatch(
				// 	updatekhasra_recordProperties([size.sarsai, 'khasra_record', i, 'sarsai']),
				// );
				// dispatch(updatekhasra_recordProperties([size.feet, 'khasra_record', i, 'feet']));

				return size;
			}
		}

		return size;
	};

	return (
		<div className='row'>
			<div className='col-12'>
				<Card stretch tag='form' noValidate onSubmit={formik.handleSubmit}>
					<div className='mx-auto' style={{ width: 550 }}>
						<div className='row g-4'>
							<div className='col-md-2' />
							<CardHeader className='col-md-6'>
								<CardLabel>
									<CardTitle>Manage Cleared Land </CardTitle>
								</CardLabel>
							</CardHeader>
						</div>
						<div className='row g-4'>
							<div className='col-md-2' />
							{/* <FormGroup className='col-md-6'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>
										Total Land Value PKR
									</InputGroupText>
									<Input
										id='validationtotal_price'
										readOnly
										type='number' min='0' onWheel={(e) => e.target.blur()}
										// value={10}
										value={store.data.form1.totalPrice}
									/>
								</InputGroup>
							</FormGroup> */}
						</div>
					</div>
					<Accordion id='accSample2' activeItemId={false} shadow='lg'>
						{store.data.khasra_record.map((dataKhasraRecord, i) => {
							return (
								<AccordionItem
									id={`item${i}`}
									title={`${i + 1}: Khasra # ${
										store.data.khasra_record.length > 0 &&
										store.data.khasra_record[i].khasra_number
											? store.data.khasra_record[i].khasra_number
											: 0
									}							
								
								  `}
									icon='Person'>
									<CardBody>
										<CardHeader>
											<CardLabel>
												<CardTitle>Total Land </CardTitle>
											</CardLabel>
										</CardHeader>
										<div className='row g-4'>
											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend1'>
														kanal
													</InputGroupText>
													<Input
														id='validationkanal2'
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														readOnly
														value={store.data.khasra_record[i].Tkanal}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Marla
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationmarla2'
														readOnly
														value={store.data.khasra_record[i].Tmarla}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Sarsai
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationsarsai2'
														readOnly
														ariaDescribedby='inputGroupPrepend'
														value={store.data.khasra_record[i].Tsarsai}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Feet
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationfeer2'
														readOnly
														value={store.data.khasra_record[i].Tfeet}
													/>
												</InputGroup>
											</FormGroup>
										</div>
										<CardHeader>
											<CardLabel>
												<CardTitle>Total Purchasing Land </CardTitle>
											</CardLabel>
										</CardHeader>

										<div className='row g-4'>
											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend1'>
														kanal
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationkanal'
														value={store.data.khasra_record[i].kanal}
														// value={
														// 	updatePurchasingLandInKhasra(
														// 		store.data.khasra_record[i]
														// 			.registries,
														// 		i,
														// 	).kanal
														// }
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'kanal',
																]),
															);
														}}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Marla
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationmarla'
														value={store.data.khasra_record[i].marla}
														// value={
														// 	updatePurchasingLandInKhasra(
														// 		store.data.khasra_record[i]
														// 			.registries,
														// 		i,
														// 	).marla
														// }
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'marla',
																]),
															);
														}}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Sarsai
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationsarsai'
														ariaDescribedby='inputGroupPrepend'
														value={store.data.khasra_record[i].sarsai}
														// value={
														// 	updatePurchasingLandInKhasra(
														// 		store.data.khasra_record[i]
														// 			.registries,
														// 		i,
														// 	).sarsai
														// }
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'sarsai',
																]),
															);
														}}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-3'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Feet
													</InputGroupText>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														id='validationfeer'
														value={store.data.khasra_record[i].feet}
														// value={
														// 	updatePurchasingLandInKhasra(
														// 		store.data.khasra_record[i]
														// 			.registries,
														// 		i,
														// 	).feet
														// }
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'feet',
																]),
															);
														}}
													/>
												</InputGroup>
											</FormGroup>
										</div>
										<div className='row g-4'>
											<div className='col-md-6'>
												<Alert color='warning' icon='Info'>
													Purchasing Land Based on registries in this
													khasra :
													{
														updatePurchasingLandInKhasra(
															store.data.khasra_record[i].registries,
															i,
														).kanal
													}
													-
													{
														updatePurchasingLandInKhasra(
															store.data.khasra_record[i].registries,
															i,
														).marla
													}
													-
													{
														updatePurchasingLandInKhasra(
															store.data.khasra_record[i].registries,
															i,
														).sarsai
													}
													-
													{
														updatePurchasingLandInKhasra(
															store.data.khasra_record[i].registries,
															i,
														).feet
													}
													<Button
														className='d-flex justify-content-end'
														color='primary'
														onClick={() => {
															const sizeTemp =
																updatePurchasingLandInKhasra(
																	store.data.khasra_record[i]
																		.registries,
																	i,
																);
															dispatch(
																updatekhasra_recordPropertiesSizeInKhasra(
																	[
																		sizeTemp.kanal,
																		'khasra_record',
																		i,
																		'kanal',
																		'marla',
																		sizeTemp.marla,
																		'sarsai',
																		sizeTemp.sarsai,
																		'feet',
																		sizeTemp.feet,
																	],
																),
															);
															showNotification(
																'Total Purchasing Land in khasra updated',

																'success',
															);
														}}>
														Apply
													</Button>
												</Alert>
											</div>
										</div>

										<div className='row g-4'>
											<FormGroup className='col-md-4'>
												<CardHeader>
													<CardLabel>
														<CardTitle>Khewat </CardTitle>
													</CardLabel>
												</CardHeader>
												<InputGroup>
													<Input
														id='khewat'
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'khewat',
																]),
															);
														}}
														value={store.data.khasra_record[i].khewat}
													/>
												</InputGroup>
											</FormGroup>

											<FormGroup className='col-md-4'>
												<CardHeader>
													<CardLabel>
														<CardTitle>Khatoni </CardTitle>
													</CardLabel>
												</CardHeader>
												<InputGroup>
													<Input
														id='khatoni'
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e.target.value,
																	'khasra_record',
																	i,
																	'khatoni',
																]),
															);
														}}
														value={store.data.khasra_record[i].khatoni}
														validFeedback='Looks good!'
													/>
												</InputGroup>
											</FormGroup>
											<FormGroup className='col-md-4'>
												<CardHeader>
													<CardLabel>
														<CardTitle>Registry </CardTitle>
													</CardLabel>
												</CardHeader>
												<InputGroup>
													<Select
														className='col-md-12'
														isClearable
														isMulti
														classNamePrefix='select'
														options={registriesOptions}
														value={
															store.data.khasra_record[i].registries
														}
														onChange={(e) => {
															dispatch(
																updatekhasra_recordProperties([
																	e,
																	'khasra_record',
																	i,
																	'registries',
																]),
															);
														}}
													/>
												</InputGroup>
											</FormGroup>
										</div>
										<div className='row g-4'>
											{/* <ClearMoreLand i={i} /> */}
										</div>
										<br />
										<br />
										{/* Land Distribution Starts */}
										<Accordion
											id='accSample'
											activeItemId={`item${i}`}
											shadow='lg'>
											{store.data.khasra_record !== undefined &&
												store.data.khasra_record[i].registries.map(
													(data, index) => {
														return (
															<AccordionItem
																id={`item2${index}`}
																icon='Person'
																title={`Registry # ${data.label} `}>
																<CardHeader>
																	<CardLabel>
																		<CardTitle>
																			Total Land in Registry
																		</CardTitle>
																	</CardLabel>
																</CardHeader>

																<div className='row g-4'>
																	<FormGroup className='col-md-3'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend1'>
																				kanal
																			</InputGroupText>
																			<Input
																				id='validationkanal2'
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].kanal
																				}
																				onChange={(e) => {
																					const a =
																						dispatch(
																							updateKhasraInnerProperties(
																								[
																									e
																										.target
																										.value,
																									'khasra_record',
																									i,
																									'registries',
																									index,
																									'kanal',
																								],
																							),
																						);
																				}}
																			/>
																		</InputGroup>
																	</FormGroup>

																	<FormGroup className='col-md-3'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend'>
																				Marla
																			</InputGroupText>
																			<Input
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				id='validationmarla2'
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].marla
																				}
																				onChange={(e) => {
																					dispatch(
																						updateKhasraInnerProperties(
																							[
																								e
																									.target
																									.value,
																								'khasra_record',
																								i,
																								'registries',
																								index,
																								'marla',
																							],
																						),
																					);
																				}}
																			/>
																		</InputGroup>
																	</FormGroup>

																	<FormGroup className='col-md-3'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend'>
																				Sarsai
																			</InputGroupText>
																			<Input
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				id='validationsarsai2'
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].sarsai
																				}
																				onChange={(e) => {
																					dispatch(
																						updateKhasraInnerProperties(
																							[
																								e
																									.target
																									.value,
																								'khasra_record',
																								i,
																								'registries',
																								index,
																								'sarsai',
																							],
																						),
																					);
																				}}
																			/>
																		</InputGroup>
																	</FormGroup>

																	<FormGroup className='col-md-3'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend'>
																				Feet
																			</InputGroupText>
																			<Input
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				id='validationfeer2'
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].feet
																				}
																				onChange={(e) => {
																					dispatch(
																						updateKhasraInnerProperties(
																							[
																								e
																									.target
																									.value,
																								'khasra_record',
																								i,
																								'registries',
																								index,
																								'feet',
																							],
																						),
																					);
																				}}
																			/>
																		</InputGroup>
																	</FormGroup>
																</div>
																<CardHeader>
																	<CardLabel>
																		<CardTitle>Fard</CardTitle>
																	</CardLabel>
																</CardHeader>
																<div className='row g-4'>
																	<FormGroup className='col-md-4'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend'>
																				Fard number
																			</InputGroupText>
																			<Input
																				id={`amount${i}`}
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				onChange={(e) => {
																					dispatch(
																						updateKhasraInnerProperties(
																							[
																								e
																									.target
																									.value,
																								'khasra_record',
																								i,
																								'registries',
																								index,
																								'fard_number',
																							],
																						),
																					);
																				}}
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].fard_number
																				}
																				// onBlur={formik.handleBlur}
																				// isValid={formik.isValid}
																				// isTouched={formik.touched
																				// 	.bayana_amount`${i}`}
																				// invalidFeedback={formik.errors
																				// 	.bayana_amount`${i}`}
																				validFeedback='Looks good!'
																			/>
																		</InputGroup>
																	</FormGroup>
																	<FormGroup
																		className='col-md-2'
																		id={`date-${i}`}>
																		<Flatpickr
																			className='form-control'
																			// eslint-disable-next-line react/jsx-boolean-value

																			options={{
																				dateFormat: 'd/m/y',
																				allowInput: true,
																				defaultDate:
																					new Date(),
																			}}
																			onClose={(
																				date,
																				dateStr,
																			) => {
																				dispatch(
																					updateKhasraInnerProperties(
																						[
																							dateStr,
																							'khasra_record',
																							i,
																							'registries',
																							index,
																							'fard_date',
																						],
																					),
																				);
																			}}
																			onChange={(
																				date,
																				dateStr,
																			) => {
																				dispatch(
																					updateKhasraInnerProperties(
																						[
																							dateStr,
																							'khasra_record',
																							i,
																							'registries',
																							index,
																							'fard_date',
																						],
																					),
																				);
																			}}
																			value={
																				store.data
																					.khasra_record[
																					i
																				].registries[index]
																					.fard_date
																			}
																			id='default-picker'
																		/>
																	</FormGroup>
																	<div className='form-group col-md-3'>
																		<input
																			type='file'
																			name='file'
																			className='form-control'
																			onChange={(e) =>
																				changeHandlerFileFard(
																					e,
																					i,
																					index,
																				)
																			}
																		/>
																	</div>
																</div>
																<CardHeader>
																	<CardLabel>
																		<CardTitle>
																			Inteqal
																		</CardTitle>
																	</CardLabel>
																</CardHeader>
																<div className='row g-4'>
																	<FormGroup className='col-md-4'>
																		<InputGroup>
																			<InputGroupText id='inputGroupPrepend'>
																				Mutation number
																			</InputGroupText>
																			<Input
																				id={`amount${i}`}
																				type='number'
																				min='0'
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				onChange={(e) => {
																					dispatch(
																						updateKhasraInnerProperties(
																							[
																								e
																									.target
																									.value,
																								'khasra_record',
																								i,
																								'registries',
																								index,
																								'inteqal_number',
																							],
																						),
																					);
																				}}
																				value={
																					store.data
																						.khasra_record[
																						i
																					].registries[
																						index
																					].inteqal_number
																				}
																				// onBlur={formik.handleBlur}
																				// isValid={formik.isValid}
																				// isTouched={formik.touched
																				// 	.bayana_amount`${i}`}
																				// invalidFeedback={formik.errors
																				// 	.bayana_amount`${i}`}
																				validFeedback='Looks good!'
																			/>
																		</InputGroup>
																	</FormGroup>
																	<FormGroup
																		className='col-md-2'
																		id={`date-${i}`}>
																		<Flatpickr
																			className='form-control'
																			// eslint-disable-next-line react/jsx-boolean-value

																			options={{
																				dateFormat: 'd/m/y',
																				allowInput: true,
																				defaultDate:
																					new Date(),
																			}}
																			onClose={(
																				date,
																				dateStr,
																			) => {
																				dispatch(
																					updateKhasraInnerProperties(
																						[
																							dateStr,
																							'khasra_record',
																							i,
																							'registries',
																							index,
																							'inteqal_date',
																						],
																					),
																				);
																			}}
																			onChange={(
																				date,
																				dateStr,
																			) => {
																				dispatch(
																					updateKhasraInnerProperties(
																						[
																							dateStr,
																							'khasra_record',
																							i,
																							'registries',
																							index,
																							'inteqal_date',
																						],
																					),
																				);
																			}}
																			value={
																				store.data
																					.khasra_record[
																					i
																				].registries[index]
																					.inteqal_date
																			}
																			id='default-picker'
																		/>
																	</FormGroup>
																	<div className='form-group col-md-3'>
																		<input
																			type='file'
																			name='file'
																			className='form-control'
																			onChange={(e) =>
																				changeHandlerFileInteqal(
																					e,
																					i,
																					index,
																				)
																			}
																		/>
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
																					updateKhasraInnerProperties(
																						[
																							e.target
																								.value,
																							'khasra_record',
																							i,
																							'registries',
																							index,
																							'inteqal_description',
																						],
																					),
																				);
																			}}
																			value={
																				store.data
																					.khasra_record[
																					i
																				].registries[index]
																					.inteqal_description
																			}
																		/>
																	</FormGroup>
																</div>
																<br />
																<Accordion
																	id={`accLandDistributionHeading${i}${index}`}
																	activeItemId='accLandDistribution'
																	shadow='lg'>
																	<AccordionItem
																		id={`accLandDistribution${i}${index}`}
																		icon='Person'
																		title={`Land Distribution for Registry# ${data.label} `}>
																		<CardHeader>
																			<CardLabel>
																				<CardTitle>
																					Bakhana
																					Malkiyyat{' '}
																				</CardTitle>
																			</CardLabel>
																		</CardHeader>

																		<div className='row g-4'>
																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend1'>
																						kanal
																					</InputGroupText>
																					<Input
																						id='validationkanal2'
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bm_kanal
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bm_kanal',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Marla
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationmarla2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bm_marla
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bm_marla',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Sarsai
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationsarsai2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bm_sarsai
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bm_sarsai',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Feet
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationfeer2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bm_feet
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bm_feet',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>
																		</div>
																		<CardHeader>
																			<CardLabel>
																				<CardTitle>
																					Bakhana Kasht{' '}
																				</CardTitle>
																			</CardLabel>
																		</CardHeader>

																		<div className='row g-4'>
																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend1'>
																						kanal
																					</InputGroupText>
																					<Input
																						id='validationkanal2'
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bk_kanal
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bk_kanal',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Marla
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationmarla2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bk_marla
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bk_marla',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Sarsai
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationsarsai2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bk_sarsai
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bk_sarsai',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Feet
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationfeer2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.bk_feet
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'bk_feet',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>
																		</div>
																		<CardHeader>
																			<CardLabel>
																				<CardTitle>
																					RDA{' '}
																				</CardTitle>
																			</CardLabel>
																		</CardHeader>

																		<div className='row g-4'>
																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend1'>
																						kanal
																					</InputGroupText>
																					<Input
																						id='validationkanal2'
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.rda_kanal
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'rda_kanal',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Marla
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationmarla2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.rda_marla
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'rda_marla',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Sarsai
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationsarsai2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.rda_sarsai
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'rda_sarsai',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>

																			<FormGroup className='col-md-3'>
																				<InputGroup>
																					<InputGroupText id='inputGroupPrepend'>
																						Feet
																					</InputGroupText>
																					<Input
																						type='number'
																						min='0'
																						onWheel={(
																							e,
																						) =>
																							e.target.blur()
																						}
																						id='validationfeer2'
																						value={
																							store
																								.data
																								.khasra_record[
																								i
																							]
																								.registries[
																								index
																							]
																								.rda_feet
																						}
																						onChange={(
																							e,
																						) => {
																							dispatch(
																								updateKhasraInnerProperties(
																									[
																										e
																											.target
																											.value,
																										'khasra_record',
																										i,
																										'registries',
																										index,
																										'rda_feet',
																									],
																								),
																							);
																						}}
																					/>
																				</InputGroup>
																			</FormGroup>
																		</div>
																	</AccordionItem>
																</Accordion>
															</AccordionItem>
														);
													},
												)}
										</Accordion>
										{/* Land Distribution Ends */}
									</CardBody>
								</AccordionItem>
							);
						})}
					</Accordion>
					<br />
					<CardBody>
						<div className='mx-auto' style={{ width: 300 }}>
							<CardHeader>
								<CardLabel>
									<CardTitle>Total Purchasing Land </CardTitle>
								</CardLabel>
							</CardHeader>
						</div>
						<div className='row g-4'>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>Kanal</InputGroupText>
									<Input
										id='validationkanal2'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										readOnly
										value={
											ConvertPurchasingLandTo_(store.data.khasra_record).kanal
										}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>Marla</InputGroupText>
									<Input
										id='validationkanal2'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										readOnly
										value={
											ConvertPurchasingLandTo_(store.data.khasra_record).marla
										}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>Sarsai</InputGroupText>
									<Input
										id='validationkanal2'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										readOnly
										value={
											ConvertPurchasingLandTo_(store.data.khasra_record)
												.sarsai
										}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>Feet</InputGroupText>
									<Input
										id='validationkanal2'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										readOnly
										value={
											ConvertPurchasingLandTo_(store.data.khasra_record).feet
										}
									/>
								</InputGroup>
							</FormGroup>
						</div>
					</CardBody>
					<CardFooter>
						<CardFooterLeft>
							{/* <Button type='reset' color='info' isOutline onClick={formik.resetForm}>
								Reset
							</Button> */}
						</CardFooterLeft>
						<CardFooterRight>
							{/* <Button
								type='submit'
								color='primary'
								isDisable={!formik.isValid && !!formik.submitCount}>
								Submit form
							</Button> */}
						</CardFooterRight>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default ValidationPage;
