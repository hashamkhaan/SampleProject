// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react';
import moment from 'moment';
// ** Axios Imports
import Axios from 'axios';

// Base URL
import { useFormik } from 'formik';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
// ** Utils

import { Row, Col } from 'reactstrap';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import Icon from '../../../components/icon/Icon';
// import Flatpickr from 'react-flatpickr';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// import Flatpickr from 'shortcut-buttons-flatpickr';
import 'flatpickr/dist/themes/light.css';
// import 'shortcut-buttons-flatpickr/dist/themes/light.css';
// import 'shortcut-buttons-flatpickr/dist/types/shortcut-buttons-flatpickr';
// ** Utils
import { selectThemeColors } from '../../../utility/Utils';
// // ** Styles
// import '../../../utility/custom/flatpickr/flatpickr.scss';

import baseURL from '../../../baseURL/baseURL';
// import { selectThemeColors } from '../../../utility/Utils';

import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';

// ** Third Party Components

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
// import Select from '../../../components/bootstrap/forms/Select';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Button from '../../../components/bootstrap/Button';
import AddPerson from './modals/AddPerson';

import AddMouza from './modals/AddMouza';
import AddKhasra from './modals/AddKhasra';
import showNotification from '../../../components/extras/showNotification';
import {
	updateForm,
	updateNoOfKhasra,
	updateFormIsValid,
	updateKhasraRecord,
	updateMasterDetails,
	//	updateFormDetails,
} from '../redux/purchaseLandStore/index';

const validate = (values) => {
	const errors = {};
	if (!values.file_no) {
		errors.file_no = 'Required';
	} else if (values.file_no.length > 35) {
		errors.file_no = 'Must be 35 characters or less';
	}

	if (!values.date) {
		errors.date = 'Date is Required';
	}
	if (!values.mouza) {
		errors.mouza = 'Mouza is Required';
	}
	if (values.khasra.length === 0) {
		errors.khasra = 'Khasra is Required';
	}

	return errors;
};

const ValidationPage = () => {
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);

	const formik = useFormik({
		initialValues: store.data.form1,
		enableReinitialize: true,
		// file_no: '',
		// khatoni: '',
		// khasra: '',
		// mouza: '',
		// validationtotal_price: '',
		// validationDcPrice: '',
		// validationpurchase_date: '',
		// land_category_id: 'Residential',
		// validationCheck: false,
		// kanal: 30,
		// marla: 30,
		// sarsai: 30,
		// feet: 30,
		// },
		validate,

		onSubmit: (values) => {
			showNotification(
				'Step 1 is Saved temporarily',
				' Press next to go to nest step',
				'success',
			);
			dispatch(updateMasterDetails([true, 'isEnabledNext1']));

			dispatch(updateForm([values, 'form1']));
		},
	});
	const [startDate, setStartDate] = useState(new Date());
	useEffect(() => {
		dispatch(updateMasterDetails([false, 'isEnabledNext1']));
		// 	// dispatch(updateForm([formik.values, 'form1']));
		dispatch(updateFormIsValid([formik.isValid, 'form1Isvalid']));
		// if (!(!formik.isValid && !!formik.submitCount) === true) {
		// 	dispatch(updateForm([formik.values, 'form1']));
		// }
		// 	dispatch(updateFormDetails([formik.values.file_no, 'file_no', 'form1']));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values]);

	const [purchaser_options, setpurchaser_options] = useState([]);
	const [seller_options, setseller_options] = useState([]);
	const [agents_options, setagents_options] = useState([]);
	const [mouza_options, setmouza_options] = useState([]);
	const [khasra_options, setkhasra_options] = useState([]);
	const [landCategoriesOptions, setLandCategoriesOptions] = useState([]);

	const [mouzaOptionsLoading, setMouzaOptionsLoading] = useState(true);
	const [purchaserOptionsLoading, setPurchaserOptionsLoading] = useState(true);
	const [sellersOptionsLoading, setSellersOptionsLoading] = useState(true);
	const [agentsOptionsLoading, setAgentsOptionsLoading] = useState(true);
	const [khasraOptionsLoading, setKhasraOptionsLoading] = useState(false);
	const [landCategoriesOptionsLoading, setLandCategoriesOptionsLoading] = useState(true);

	useEffect(() => {
		if (formik.values.mouza !== null) {
			setKhasraOptionsLoading(true);
			Axios.get(`${baseURL}/getKhasras?mouza_id=${formik.values.mouza.id}`)
				.then((response) => {
					const rec = response.data.khasras.map(({ id, khasra_no, size }) => ({
						id,
						value: id,
						label: khasra_no,
						Tkanal: size.kanal,
						Tmarla: size.marla,
						Tsarsai: size.sarsai,
						Tfeet: size.feet,
					}));

					setkhasra_options(rec);
					setKhasraOptionsLoading(false);
				})
				.catch((err) => console.log(err));
		}
	}, [formik.values.mouza, store.data.masterDetails.refreshDropdowns]);

	useEffect(() => {
		const _titleErrorConnection = (
			<span className='d-flex align-items-center'>
				<Icon icon='Warning' size='lg' className='me-1' />
				<span>Error Connecting to Server </span>
			</span>
		);
		setSellersOptionsLoading(true);
		setPurchaserOptionsLoading(true);
		setAgentsOptionsLoading(true);
		setLandCategoriesOptionsLoading(true);
		setMouzaOptionsLoading(true);
		Axios.get(`${baseURL}/getSellers`)
			.then((response) => {
				const rec = response.data.sellers.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setseller_options(rec);
				setSellersOptionsLoading(false);
			})
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getPurchasers`)
			.then((response) => {
				const rec = response.data.purchasers.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setpurchaser_options(rec);
				setPurchaserOptionsLoading(false);
			})
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getAgents`)
			.then((response) => {
				const rec = response.data.agents.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));

				setagents_options(rec);
				setAgentsOptionsLoading(false);
			})
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getMouzas`)
			.then((response) => {
				const rec = response.data.mouzas.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setmouza_options(rec);
				setMouzaOptionsLoading(false);
				//   setLoading(false)
			})
			.catch((err) => console.log(err));
		Axios.get(`${baseURL}/getLandCategories`)
			.then((response) => {
				const rec = response.data.landCategories.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setLandCategoriesOptions(rec);
				// setkhasraOptionsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				// showNotification(_titleErrorConnection, err.message, 'danger');
			});
	}, [store.data.masterDetails.refreshDropdowns]);

	const [khasraRecordOptions, setKhasraRecordOptions] = useState([]);
	useEffect(() => {
		const rec = khasra_options.map(({ id, label, Tkanal, Tmarla, Tsarsai, Tfeet }) => ({
			id,
			value: id,
			label,
			khasra_id: id,
			khasra_number: label,
			Tkanal,
			Tmarla,
			Tsarsai,
			Tfeet,
			kanal: '',
			marla: '',
			sarsai: '',
			feet: '',
			khewat: '',
			khatoni: '',
			cleared_land_count: 0,
			cleared_land: [],
			registries: [],
		}));
		setKhasraRecordOptions(rec);

		//   setLoading(false)
	}, [khasra_options]);
	const [picker, setPicker] = useState(new Date());
	return (
		<div className='row'>
			<div className='col-12'>
				<Card stretch tag='form' onSubmit={formik.handleSubmit}>
					<div className='mx-auto' style={{ width: 300 }}>
						<CardHeader>
							<CardLabel>
								<CardTitle> Manage File creation </CardTitle>
							</CardLabel>
						</CardHeader>
					</div>
					<CardBody>
						<div className='row g-4'>
							<div className='col-md-4' />
							<div className='col-md-4'>
								<div className='mx-auto' style={{ width: 200 }}>
									<FormGroup className='col-md-12' label='Inteqal Bezubani'>
										<ChecksGroup
											isValid={formik.isValid}
											isTouched={formik.touched.inteqal_bezubani}
											invalidFeedback={formik.errors.inteqal_bezubani}>
											<Checks
												type='switch'
												id='inteqal_bezubani'
												label={
													formik.values.inteqal_bezubani === true
														? `Yes`
														: `No`
												}
												name='checkedCheck'
												onChange={(e) => {
													formik.setFieldValue(
														'inteqal_bezubani',
														e.target.checked,
													);
												}}
												checked={formik.values.inteqal_bezubani}
											/>
										</ChecksGroup>
									</FormGroup>
								</div>
							</div>
							<div className='col-md-4' />
						</div>

						<div className='row g-4'>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>
										File Number
									</InputGroupText>
									<Input
										id='file_no'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.file_no}
										isValid={formik.isValid}
										isTouched={formik.touched.file_no}
										invalidFeedback={formik.errors.file_no}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-5'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>
										File Name
									</InputGroupText>
									<Input
										id='file_name'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.file_name}
										isValid={formik.isValid}
										isTouched={formik.touched.file_name}
										invalidFeedback={formik.errors.file_name}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<div className='col-md-2'>
								<FormGroup>
									{/* <DatePicker
									todayButton='Today'
									// selected={formik.values.date}
									onChange={(date, dateStr) => {
										formik.setFieldValue('date', date);
									}}
									dateFormat='dd/MM/yyyy'
									// showMonthYearDropdown
								/> */}
									<Flatpickr
										className='form-control'
										value={formik.values.date}
										// eslint-disable-next-line react/jsx-boolean-value

										options={{
											dateFormat: 'd/m/y',
											allowInput: true,
										}}
										onChange={(date, dateStr) => {
											formik.setFieldValue('date', dateStr);
										}}
										onClose={(date, dateStr) => {
											formik.setFieldValue('date', dateStr);
										}}
										id='default-picker'
									/>
								</FormGroup>
								{formik.errors.date && (
									// <div className='invalid-feedback'>
									<p
										style={{
											color: 'red',
										}}>
										{formik.errors.date}
									</p>
								)}
							</div>
							<FormGroup className='col-lg-2'>
								<ChecksGroup
									isValid={formik.isValid}
									isTouched={formik.touched.land_category_id}
									isLoading={landCategoriesOptionsLoading}
									invalidFeedback={formik.errors.land_category_id}>
									<div className='row'>
										{landCategoriesOptions !== undefined &&
											landCategoriesOptions.map((data, index) => {
												return (
													<Checks
														type='radio'
														id={`validationRadio${data.id}`}
														label={`${data.label}`}
														name='land_category_id'
														value={`${data.id}`}
														onChange={formik.handleChange}
														checked={formik.values.land_category_id}
														isInline
													/>
												);
											})}
									</div>
								</ChecksGroup>
							</FormGroup>
						</div>

						<div className='row g-4'>
							<CardHeader className='col-md-4'>
								<CardLabel>
									<CardTitle>Purchasers </CardTitle>
								</CardLabel>
								<AddPerson />
							</CardHeader>
							<CardHeader className='col-md-4'>
								<CardLabel>
									<CardTitle>Seller </CardTitle>
								</CardLabel>
								<AddPerson />
							</CardHeader>
							<CardHeader className='col-md-4'>
								<CardLabel>
									<CardTitle>Agent </CardTitle>
								</CardLabel>
								<AddPerson />
							</CardHeader>
						</div>
						<div className='row g-4'>
							<FormGroup className='col-md-4' id='purchasers'>
								<InputGroup>
									<Select
										className='col-md-11'
										isClearable
										isMulti
										classNamePrefix='select'
										options={purchaser_options}
										isLoading={purchaserOptionsLoading}
										value={formik.values.purchasers}
										onChange={(val) => {
											formik.setFieldValue('purchasers', val);
										}}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched={formik.touched.purchasers}
										invalidFeedback={formik.errors.purchasers}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className='col-md-4' id='sellers'>
								<InputGroup>
									<Select
										className='col-md-11'
										isMulti
										isClearable
										classNamePrefix='select'
										options={seller_options}
										value={formik.values.sellers}
										onChange={(val) => {
											formik.setFieldValue('sellers', val);
										}}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched={formik.touched.sellers}
										invalidFeedback={formik.errors.sellers}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-4' id='agents'>
								<InputGroup>
									<Select
										className='col-md-11'
										isClearable
										isMulti
										classNamePrefix='select'
										isLoading={agentsOptionsLoading}
										options={agents_options}
										value={formik.values.agents}
										onChange={(val) => {
											formik.setFieldValue('agents', val);
										}}
										onBlur={formik.handleBlur}
										isValid={formik.isValid}
										isTouched={formik.touched.agents}
										invalidFeedback={formik.errors.agents}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div>

						<CardHeader>
							<CardLabel>
								<CardTitle>File Details </CardTitle>
							</CardLabel>
						</CardHeader>
						<div className='row g-4'>
							<div className='col-md-4'>
								<FormGroup label='Mouza' id='mouza'>
									<InputGroup>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											options={mouza_options}
											isLoading={mouzaOptionsLoading}
											value={formik.values.mouza}
											onChange={(val) => {
												formik.setFieldValue('mouza', val);
												// GetKhasra(val ? val.id : 0);
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.mouza}
											invalidFeedback={formik.errors.mouza}
											validFeedback='Looks good!'
										/>
										<AddMouza />
									</InputGroup>
								</FormGroup>

								{formik.errors.mouza && (
									// <div className='invalid-feedback'>
									<p
										style={{
											color: 'red',
										}}>
										{formik.errors.mouza}
									</p>
								)}
							</div>
							<div className='col-md-4'>
								<FormGroup label='Khasra' id='khasra'>
									<InputGroup>
										<Select
											className='col-md-11'
											isClearable
											isMulti
											classNamePrefix='select'
											options={khasraRecordOptions}
											isLoading={khasraOptionsLoading}
											// theme={selectThemeColors}

											// value={formik.values.khasra}
											value={store.data.khasra_record}
											// value={formik.values.khasra}
											onChange={(val) => {
												formik.setFieldValue('khasra', val);

												dispatch(
													updateKhasraRecord([val, 'khasra_record']),
												);
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.khasra}
											invalidFeedback={formik.errors.khasra}
											validFeedback='Looks good!'
										/>
										<AddKhasra />
									</InputGroup>
								</FormGroup>
								{formik.errors.khasra && (
									// <div className='invalid-feedback'>
									<p
										style={{
											color: 'red',
										}}>
										{formik.errors.khasra}
									</p>
								)}
							</div>
						</div>
						{/* Size */}

						<CardHeader>
							<CardLabel>
								<CardTitle>Initial size </CardTitle>
							</CardLabel>
						</CardHeader>
						<div className='row g-4'>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Kanal</InputGroupText>
									<Input
										id='initialKanal'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.initialKanal}
										isValid={formik.isValid}
										isTouched={formik.touched.rate_per_marla}
										invalidFeedback={formik.errors.rate_per_marla}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Marla</InputGroupText>
									<Input
										id='initialMarla'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.initialMarla}
										isValid={formik.isValid}
										isTouched={formik.touched.initialMarla}
										invalidFeedback={formik.errors.initialMarla}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Sarsai</InputGroupText>
									<Input
										id='initialSarsai'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.initialSarsai}
										isValid={formik.isValid}
										isTouched={formik.touched.totalPrice}
										invalidFeedback={formik.errors.totalPrice}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Feet</InputGroupText>
									<Input
										id='initialFeet'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.initialFeet}
										isValid={formik.isValid}
										isTouched={formik.touched.totalPrice}
										invalidFeedback={formik.errors.totalPrice}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div>
						<CardHeader>
							<CardLabel>
								<CardTitle>Cardinal Details </CardTitle>
							</CardLabel>
						</CardHeader>
						<div className='row g-4'>
							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend1'>North</InputGroupText>
									<Input
										id='north'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.north}
										isValid={formik.isValid}
										isTouched={formik.touched.north}
										invalidFeedback={formik.errors.north}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>south</InputGroupText>
									<Input
										id='south'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.south}
										isValid={formik.isValid}
										isTouched={formik.touched.south}
										invalidFeedback={formik.errors.south}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>East</InputGroupText>
									<Input
										id='east'
										ariaDescribedby='inputGroupPrepend'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.east}
										isValid={formik.isValid}
										isTouched={formik.touched.east}
										invalidFeedback={formik.errors.east}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>

							<FormGroup className='col-md-3'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>West</InputGroupText>
									<Input
										id='west'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.west}
										isValid={formik.isValid}
										isTouched={formik.touched.west}
										invalidFeedback={formik.errors.west}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div>
						<CardHeader>
							<CardLabel>
								<CardTitle>Price Details </CardTitle>
							</CardLabel>
						</CardHeader>
						<div className='row g-4'>
							{/* <FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>
										Rate per marla PKR
									</InputGroupText>
									<Input
										id='rate_per_marla'
										type='number' min='0' onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.rate_per_marla}
										isValid={formik.isValid}
										isTouched={formik.touched.rate_per_marla}
										invalidFeedback={formik.errors.rate_per_marla}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup> */}
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>
										Market Price PKR
									</InputGroupText>
									<Input
										id='totalPrice'
										type='number'
										min='0'
										onWheel={(e) => e.target.blur()}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.totalPrice}
										isValid={formik.isValid}
										isTouched={formik.touched.totalPrice}
										invalidFeedback={formik.errors.totalPrice}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div>

						{/* <CardHeader>
							<CardLabel>
								<CardTitle>Location Details </CardTitle>
							</CardLabel>
						</CardHeader>
						<div className='row g-4'>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Area</InputGroupText>
									<Input
										id='Area'
										onChange={formik.handleChange}
										value={formik.values.Area}
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Block</InputGroupText>
									<Input
										id='block'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.block}
										isValid={formik.isValid}
										isTouched={formik.touched.block}
										invalidFeedback={formik.errors.block}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Street</InputGroupText>
									<Input
										id='street'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.street}
										isValid={formik.isValid}
										isTouched={formik.touched.street}
										invalidFeedback={formik.errors.street}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div>
						<div className='row g-4'>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Tehsil</InputGroupText>
									<Input
										id='tehsil'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.tehsil}
										isValid={formik.isValid}
										isTouched={formik.touched.tehsil}
										invalidFeedback={formik.errors.tehsil}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Zilla</InputGroupText>
									<Input
										id='zilla'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.zilla}
										isValid={formik.isValid}
										isTouched={formik.touched.zilla}
										invalidFeedback={formik.errors.zilla}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
							<FormGroup className='col-md-4'>
								<InputGroup>
									<InputGroupText id='inputGroupPrepend'>Province</InputGroupText>
									<Input
										id='province'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.province}
										isValid={formik.isValid}
										isTouched={formik.touched.province}
										invalidFeedback={formik.errors.province}
										validFeedback='Looks good!'
									/>
								</InputGroup>
							</FormGroup>
						</div> */}
						<CardHeader>
							<CardLabel>
								<CardTitle>Other details </CardTitle>
							</CardLabel>
						</CardHeader>

						<div className='row g-4'>
							<FormGroup id='description' label='Description' className='col-lg-6'>
								<Textarea
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.description}
									isValid={formik.isValid}
									isTouched={formik.touched.description}
									invalidFeedback={formik.errors.description}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='row g-4' />
					</CardBody>
					<CardFooter>
						<CardFooterLeft />
						<CardFooterRight>
							<Button
								type='submit'
								color='primary'
								isDisable={store.data.masterDetails.isEnabledNext1}
								// isDisable={!formik.isValid && !!formik.submitCount}
								onClick={() => {
									if (!formik.isValid) {
										showNotification(
											'Please provide required fields',
											'Please Fill Form',
											'warning',
										);
									}
								}}>
								Save form
							</Button>
						</CardFooterRight>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};

export default ValidationPage;
