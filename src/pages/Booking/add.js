// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-array-index-key */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports
import Axios from 'axios';
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
import Select from 'react-select';
import Flatpickr from 'react-flatpickr';
import Icon from '../../components/icon/Icon';
import 'flatpickr/dist/themes/light.css';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import AddAgent from '../adminPortal/purchaseLand/modals/AddAgent';
import useDarkMode from '../../hooks/useDarkMode';
import validate from './helper/editPagesValidate';
import baseURL from '../../baseURL/baseURL';
import showNotification from '../../components/extras/showNotification';
import { demoPages } from '../../menu';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Spinner from '../../components/bootstrap/Spinner';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import AddCustomer from './AddOersonModal';

import AddStreets from './AddStreets';

const EditModernPage = () => {
	const { themeStatus } = useDarkMode();

	const formik = useFormik({
		initialValues: {
			customers: [],
			block: '',
			commission: '',
			agent: '',
			plot: '',
			name: '',
			street: '',
			paymentPlan: '',
			discount: '',
			// total_installlment: '',
			lateFee: '',
			installment_array: [],
			installment_amount: '',
			down_payment: '',
		},
		errors: {},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});

	/**
	 * Common
	 */

	const [GetBlocksArray, setGetBlocksArray] = useState([]);
	const [GetStreetsArray, setGetStreetsArray] = useState([]);
	const [GetPlotsArray, setGetPlotsArray] = useState([]);
	const [GetAgentsArray, setGetAgentsArray] = useState([]);
	const [GetCustomersArray, setGetCustomersArray] = useState([]);
	const [GetPayemtInstallmentArray, setGetPayemtInstallmentArray] = useState([]);
	const [GetPayemtInstallmentDetails, setGetPayemtInstallmentDetails] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);
	const [PlotNo, setPlotNo] = useState('Please choose a plot');

	const [SizeID, setSizeID] = useState(0);
	const [Price, setPrice] = useState(0);
	const [TotalInstallNo, setTotalInstallNo] = useState('');
	const [InstallDate, setInstallDate] = useState(moment().format('DD/MM/YY'));
	const [InstallDate2, setInstallDate2] = useState(moment());

	const [plotData, setPlotData] = useState('');
	const [plotDataLoading, setPlotDataLoading] = useState(false);

	const [TotalInstallmentPrice, setTotalInstallmentPrice] = useState(0);
	const [customErrors, setCustomErrors] = useState({});

	const getPlotDetails = (idd) => {
		setPlotDataLoading(true);
		Axios.get(`${baseURL}/getPlotDetails?plot_id=${idd}`)
			.then((response) => {
				console.log('Plot details based on id: ::::::', response);
				setPlotData(response.data.getPlotDetails);
				setPlotNo(response.data.getPlotDetails?.plot_no);

				setSizeID(response.data.getPlotDetails?.size_id);
				setPrice(response.data.getPlotDetails?.price);
				setPlotDataLoading(false);
			})

			.catch((err) => {
				console.log(err);
				setPlotDataLoading(false);
			});
	};
	useEffect(() => {
		Axios.get(`${baseURL}/getBlocksDropdown`)
			.then((response) => {
				console.log('blockkk Dropdown: ::::::', response);
				const rec = response.data.blocks.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetBlocksArray(rec);
				// setPurchaserOptionsLoading(false)
			})

			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getInstallmentPlane`)
			.then((response) => {
				console.log('getInstallmentPlane Dropdown: ::::::', response);
				const rec = response.data.InstallmentPlane.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetPayemtInstallmentArray(rec);
				// setPurchaserOptionsLoading(false)
			})

			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getAgents`)
			.then((response) => {
				const rec = response.data.agents.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));

				setGetAgentsArray(rec);
				// setAgentsOptionsLoading(false);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getStreetsDropdown`)
			.then((response) => {
				console.log('Strret Dropdown: ::::::', response);
				const rec = response.data.streets.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetStreetsArray(rec);
				// setPurchaserOptionsLoading(false)
			})

			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getClients`)
			.then((response) => {
				console.log('block Dropdown getClients :::::::', response);
				const rec = response.data.clients.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
					amount_receivable: 0,
				}));
				setGetCustomersArray(rec);
				// setPurchaserOptionsLoading(false)
			})

			.catch((err) => console.log(err));
	}, [Price]);
	useEffect(() => {
		if (formik.values.block !== null)
			Axios.get(`${baseURL}/getPlotsByBlock?block_id=${formik.values?.block?.id}`)
				.then((response) => {
					console.log('block p Dropdown: ::::::', response);
					const rec = response.data.plots.map(({ id, file_no, reg_no }) => ({
						id,
						value: id,
						label: `${file_no}-${reg_no}`,
					}));
					setGetPlotsArray(rec);
					// setPurchaserOptionsLoading(false)
				})

				.catch((err) => console.log(err));
	}, [formik.values.block]);

	useEffect(
		() => {
			setCustomErrors({});
			let errors = {};
			let totalAmount = 0;
			formik.values.installment_array.forEach((data, index) => {
				totalAmount += Number(data.installment_rate ? data.installment_rate : 0);
				if (data.installment_rate === '' || !data.installment_rate > 0) {
					errors = {
						...errors,
						[`installment_array[${index}]installment_rate`]: 'Please provide amount!',
					};
				}
				if (!data.installmentDate) {
					errors = {
						...errors,
						[`installment_array[${index}]installmentDate`]: 'Please provide date!',
					};
				}
			});
			if (totalAmount !== TotalInstallmentPrice) {
				errors = {
					...errors,
					[`installment_array[${formik.values.installment_array.length - 1}]balance`]:
						'Balance must be 0!',
				};
			}
			setCustomErrors(errors);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formik.values.installment_array],
	);

	let balance = TotalInstallmentPrice;

	const submitForm = (data) => {
		const url = `${baseURL}/addBooking`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				block_id: data.block.id,
				street_id: data.street.id,

				plot_id: data.plot.id,
				customers: data.customers,
				plot_no: PlotNo,
				payment_plan: data.paymentPlan.id,
				size: SizeID,

				total_installment: TotalInstallNo,
				agent_id: data.agent.id,
				comission: data.commission,
				start_date: InstallDate,
				installment_rate: data.InstallmentRate,
				installment_array: data.installment_array,
				price: Price,
				discount: data.plot.discount,
				total_payable: data.total_payable,
				down_payment: data.down_payment,
				installment_amount: data.installment_amount,
			}),
		};
		console.log('lllll', options);
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);
				if (res.status === 'ok') {
					formik.resetForm();
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>Saved Successfully</span>
						</span>,
						`${res.message}`,
					);
				} else {
					showNotification('Error', res.message, 'danger');
				}
			})
			.catch((err) => showNotification('Error', err.message, 'danger'));
	};
	const handleSave = () => {
		submitForm(formik.values);
		setLastSave(moment());
	};
	useEffect(() => {
		const getInstallmentTable = () => {
			Axios.get(
				`${baseURL}/addBookingInstallment?price=${formik.values.installment_amount}&&payment_plan=${formik.values.paymentPlan.id}&&total_installments=${TotalInstallNo}&&start_date=${InstallDate}`,
			)
				.then((response) => {
					console.log(
						'Install Table::::',
						response.data.array,
						GetPayemtInstallmentDetails,
					);
					let Total = 0;
					const rec = response.data.array.map(({ amount, due_date }) => ({
						installment_rate: Number(amount).toFixed(0),
						installmentDate: moment(due_date).format('DD-MM-YY'),
					}));
					formik.setFieldValue('installment_array', rec);
					setGetPayemtInstallmentDetails(rec);

					const rec2 = response.data.array.forEach((data) => {
						Total = Number(Total) + Number(data.amount);
						setTotalInstallmentPrice(Total);
						console.log('Total:::', Total);
					});
					console.log(rec2);
				})

				.catch((err) => console.log(err));
		};
		if (
			TotalInstallNo > 0 &&
			formik.values.installment_amount > 0 &&
			formik.values.paymentPlan.id &&
			InstallDate
		) {
			getInstallmentTable();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		TotalInstallNo,
		formik.values.installment_amount,
		formik.values.paymentPlan.id,
		InstallDate,
	]);

	useEffect(() => {
		if (plotData.price > 0) {
			formik.setFieldValue(
				'installment_amount',
				plotData.price +
					(plotData.is_corner === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_boulevard === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_west_open === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_facing_park === 1 ? (plotData.price * 15) / 100 : 0) -
					(formik.values.down_payment ? formik.values.down_payment : 0) -
					(formik.values.discount ? formik.values.discount : 0),
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.down_payment, plotData, formik.values.discount]);
	useEffect(() => {
		if (plotData.price > 0) {
			formik.setFieldValue(
				'total_payable',
				plotData.price +
					(plotData.is_corner === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_boulevard === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_west_open === 1 ? (plotData.price * 15) / 100 : 0) +
					(plotData.is_facing_park === 1 ? (plotData.price * 15) / 100 : 0) -
					(formik.values.discount ? formik.values.discount : 0),
			);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [plotData, formik.values.discount]);

	return (
		<PageWrapper title={demoPages.editPages.subMenu.editModern.text}>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Phonelink' iconColor='danger'>
									<CardTitle>Booking Section</CardTitle>
									<CardSubTitle>Add</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-4'>
										<div className='row g-4'>
											<AddCustomer />
											<div className='col-md-10'>
												<FormGroup id='customers' label='Customers'>
													<Select
														isMulti
														options={GetCustomersArray}
														// isLoading={crAccountLoading}
														value={formik.values.customers}
														onChange={(e) => {
															formik.setFieldValue('customers', e);
														}}
														onBlur={formik.handleBlur}
														isValid={formik.isValid}
														isTouched={formik.touched.customers}
														invalidFeedback={formik.errors.customers}
														validFeedback='Looks good!'
													/>
												</FormGroup>
												{formik.errors.customers && (
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors.customers}
													</p>
												)}
											</div>
										</div>
									</div>

									{/* <AddBlocks /> */}

									<div className='col-md-2'>
										<FormGroup id='block' label='Block'>
											<Select
												isClearable
												className='col-md-12'
												options={GetBlocksArray}
												// isLoading={crAccountLoading}
												value={formik.values.block}
												onChange={(e) => {
													formik.setFieldValue('block', e);
												}}
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.block}
												invalidFeedback={formik.errors.block}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.block && (
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.block}
											</p>
										)}
									</div>

									<div className='col-md-3'>
										<div className='row g-4'>
											<AddStreets />
											<div className='col-md-10'>
												<FormGroup id='street' label='Streets'>
													<Select
														isClearable
														className='col-md-11'
														options={GetStreetsArray}
														// isLoading={crAccountLoading}
														value={formik.values.street}
														onChange={(e) => {
															formik.setFieldValue('street', e);
														}}
														onBlur={formik.handleBlur}
														isValid={formik.isValid}
														isTouched={formik.touched.street}
														invalidFeedback={formik.errors.street}
														validFeedback='Looks good!'
													/>
												</FormGroup>
												{formik.errors.street && (
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors.street}
													</p>
												)}
											</div>
										</div>
									</div>
									<div className='col-md-3'>
										<FormGroup id='plot' label='Plot'>
											<Select
												className='col-md-11'
												options={GetPlotsArray}
												// isLoading={crAccountLoading}
												value={formik.values.plot}
												onChange={(e) => {
													formik.setFieldValue('plot', e);
													console.log('e::::::', e);
													getPlotDetails(e.id);
												}}
												isClearable
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.plot}
												invalidFeedback={formik.errors.plot}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.plot && (
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.plot}
											</p>
										)}
									</div>
								</div>

								{/* end of Row 1 */}

								<hr />
								<div className='row g-4'>
									<AddAgent />
									<div className='col-md-4'>
										<FormGroup id='agent' label='Agents'>
											<Select
												className='col-md-12'
												options={GetAgentsArray}
												// isLoading={crAccountLoading}
												value={formik.values.agent}
												onChange={(e) => {
													formik.setFieldValue('agent', e);
												}}
												isClearable
												onBlur={formik.handleBlur}
												isValid={formik.isValid}
												isTouched={formik.touched.agent}
												invalidFeedback={formik.errors.agent}
												validFeedback='Looks good!'
											/>
										</FormGroup>
										{formik.errors.agent && (
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.agent}
											</p>
										)}
									</div>

									<div className='col-md-2'>
										<FormGroup id='commission' label={`Agent's commission %`}>
											<Input
												type='number'
												onWheel={(e) => e.target.blur()}
												min='0'
												placeholder=''
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.commission}
												isValid={formik.isValid}
												isTouched={formik.touched.commission}
												invalidFeedback={formik.errors.commission}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<br />
										<br />
										<h5>
											Agent's Payable: PKR{' '}
											{formik.values?.commission > 0 &&
											formik.values.total_payable > 0
												? (
														(formik.values.commission *
															formik.values.total_payable) /
														100
												  ).toLocaleString(undefined, {
														maximumFractionDigits: 2,
												  })
												: 0}
										</h5>
									</div>
								</div>

								{/* End row 2nd */}

								{/* End row 3rd */}

								<br />
								{/* Table */}
								<hr />

								<div className='row g-4'>
									<Card className='col-md-4 border-end border-start'>
										<div className='col-md-12'>
											<div className='d-flex justify-content-evenly'>
												<CardLabel icon='Calculate' iconColor='danger'>
													<CardTitle>
														<CardLabel>Plot Details</CardLabel>
													</CardTitle>
												</CardLabel>
											</div>
											<hr />
											{plotDataLoading === true ? (
												<h2>Loading...</h2>
											) : (
												<>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>File no:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5> {plotData.file_no}</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Reg no:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>{plotData.reg_no}</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Type:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>{plotData.plot_type}</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Size:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.plot_type ===
																		'Residential'
																			? `${plotData?.plotsize?.size}=${plotData?.plotsize?.size_in_SQFT}`
																			: plotData.size_in_SRFT}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>General:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_general ===
																			1 && 'Yes'}
																		{plotData.is_general ===
																			0 && 'No'}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Corner:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_corner === 1 &&
																			'Yes'}
																		{plotData.is_corner === 0 &&
																			'No'}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Boulevard:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_boulevard ===
																			1 && 'Yes'}
																		{plotData.is_boulevard ===
																			0 && 'No'}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>West Open:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_west_open ===
																			1 && 'Yes'}
																		{plotData.is_west_open ===
																			0 && 'No'}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Facing Park:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_facing_park ===
																			1 && 'Yes'}
																		{plotData.is_facing_park ===
																			0 && 'No'}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<hr />
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Basic Price:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData?.price?.toLocaleString(
																			undefined,
																			{
																				maximumFractionDigits: 2,
																			},
																		)}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Corner:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_corner === 1 &&
																			(
																				(plotData.price *
																					10) /
																				100
																			).toLocaleString(
																				undefined,
																				{
																					maximumFractionDigits: 2,
																				},
																			)}
																		{plotData.is_corner === 0 &&
																			0}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Boulevard:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_boulevard ===
																			1 &&
																			(
																				(plotData.price *
																					10) /
																				100
																			).toLocaleString(
																				undefined,
																				{
																					maximumFractionDigits: 2,
																				},
																			)}
																		{plotData.is_boulevard ===
																			0 && 0}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>West Open:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_west_open ===
																			1 &&
																			(
																				(plotData.price *
																					10) /
																				100
																			).toLocaleString(
																				undefined,
																				{
																					maximumFractionDigits: 2,
																				},
																			)}
																		{plotData.is_west_open ===
																			0 && 0}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Facing Park:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{plotData.is_facing_park ===
																			1 &&
																			(
																				(plotData.price *
																					10) /
																				100
																			).toLocaleString(
																				undefined,
																				{
																					maximumFractionDigits: 2,
																				},
																			)}
																		{plotData.is_facing_park ===
																			0 && 0}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>

													<hr />
													<hr />
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	{' '}
																	Total Plot Price:
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	{(
																		0 +
																		plotData.price +
																		(plotData.is_corner === 1
																			? (plotData.price *
																					10) /
																			  100
																			: 0) +
																		(plotData.is_boulevard === 1
																			? (plotData.price *
																					10) /
																			  100
																			: 0) +
																		(plotData.is_west_open === 1
																			? (plotData.price *
																					10) /
																			  100
																			: 0) +
																		(plotData.is_facing_park ===
																		1
																			? (plotData.price *
																					10) /
																			  100
																			: 0)
																	).toLocaleString(undefined, {
																		maximumFractionDigits: 2,
																	})}
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													<hr />
													<div className='d-flex justify-content-between'>
														<CardTitle>
															<CardLabel>
																<h5>Discount:</h5>
															</CardLabel>
														</CardTitle>
														<CardTitle>
															<CardLabel>
																<FormGroup id='discount'>
																	<Input
																		type='number'
																		min='0'
																		placeholder=''
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		value={
																			formik.values.discount
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.discount
																		}
																		invalidFeedback={
																			formik.errors.discount
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</CardLabel>
														</CardTitle>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	{' '}
																	Total Payable:
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	{formik.values?.total_payable?.toLocaleString(
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
														<CardTitle>
															<CardLabel>
																<h5>Down Payment:</h5>
															</CardLabel>
														</CardTitle>
														<CardTitle>
															<CardLabel>
																<FormGroup id='down_payment'>
																	<Input
																		type='number'
																		min='0'
																		placeholder=''
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		value={
																			formik.values
																				.down_payment
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched
																				.down_payment
																		}
																		invalidFeedback={
																			formik.errors
																				.down_payment
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</CardLabel>
														</CardTitle>
													</div>
													<div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>Balance:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>
																		{formik.values.installment_amount.toLocaleString(
																			undefined,
																			{
																				maximumFractionDigits: 2,
																			},
																		)}
																	</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>
													{/* <div className='d-flex justify-content-between'>
														<CardLabel>
															<CardTitle>
																<CardLabel>
																	<h5>To be received from:</h5>
																</CardLabel>
															</CardTitle>
														</CardLabel>
													</div>

													{formik.values.customers?.map((data, index) => {
														return (
															<div
																key={index}
																className='d-flex justify-content-between'>
																<CardLabel>
																	<CardTitle>
																		<p>
																			<h5>{data.label}</h5>
																		</p>
																	</CardTitle>
																</CardLabel>
																<FormGroup
																	id={`customers[${index}]amount_receivable`}
																	label=''
																	isFloating>
																	<Input
																		type='number'
																		min='0'
																		placeholder=''
																		onChange={
																			formik.handleChange
																		}
																		onBlur={formik.handleBlur}
																		value={
																			data?.amount_receivable
																		}
																		isValid={formik.isValid}
																		isTouched={
																			formik.touched.customers
																				?.amount_receivable
																		}
																		invalidFeedback={
																			customErrors[
																				`customers[${index}]amount_receivable`
																			]
																		}
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</div>
														);
													})} */}
												</>
											)}

											<br />
										</div>
									</Card>

									<Card shadow='default' className='col-md-8 border-start'>
										<div className='row g-4'>
											<div className='d-flex justify-content-evenly'>
												<CardLabel icon='Payment' iconColor='danger'>
													<CardTitle>
														<CardLabel> Installment Plan:</CardLabel>
													</CardTitle>
												</CardLabel>
											</div>
										</div>
										<hr />

										<div className='row g-4'>
											<div className='col-md-3'>
												<FormGroup id='paymentPlan' label='Payment Plan'>
													<Select
														className='col-md-11'
														options={GetPayemtInstallmentArray}
														// isLoading={crAccountLoading}
														value={formik.values.paymentPlan}
														onChange={(e) => {
															formik.setFieldValue('paymentPlan', e);

															// setPaymentPlanID(formik.values.paymentPlan.id)
														}}
														onBlur={formik.handleBlur}
														isValid={formik.isValid}
														isTouched={formik.touched.paymentPlan}
														invalidFeedback={formik.errors.paymentPlan}
														validFeedback='Looks good!'
													/>
												</FormGroup>
												{formik.errors.paymentPlan && (
													<p
														style={{
															color: 'red',
														}}>
														{formik.errors.paymentPlan}
													</p>
												)}
											</div>

											<div className='col-md-3'>
												<FormGroup
													id='total_installlment'
													label='Installments'>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														placeholder=''
														onChange={(e) => {
															// formik.handleChange()
															setTotalInstallNo(e.target.value);
														}}
														// onBlur={formik.handleBlur}
														value={TotalInstallNo}
														// isValid={formik.isValid}
														// isTouched={formik.touched.total_installlment}
														// invalidFeedback={formik.errors.total_installlment}
														// validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>

											<div className='col-md-3'>
												<FormGroup id='date' label='Start Date'>
													<Flatpickr
														className='form-control'
														value={InstallDate}
														options={{
															dateFormat: 'd/m/y',
															allowInput: true,
															defaultDate: new Date(),
														}}
														onChange={(date, dateStr) => {
															// console.log('1', formik.values.date);
															console.log(
																'Raw Date:::ect: :',
																dateStr,
																date,
																InstallDate2,
																InstallDate,
															);
															setInstallDate(dateStr);
															setInstallDate2(date[0]);

															// formik.setFieldValue('date', dateStr);
														}}
														onClose={(date, dateStr) => {
															setInstallDate(dateStr);
															setInstallDate2(date[0]);
															// formik.setFieldValue('date', dateStr);
														}}
														id='default-picker'
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='lateFee' label='Late Fee'>
													<Input
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														placeholder=''
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.lateFee}
														isValid={formik.isValid}
														isTouched={formik.touched.lateFee}
														invalidFeedback={formik.errors.lateFee}
														validFeedback='Looks good!'
													/>
												</FormGroup>
											</div>
										</div>
										<hr />

										<div className='row g-4'>
											<table className='table table-modern'>
												<thead>
													<tr>
														<th scope='col'>Sr. No</th>
														<th scope='col'>Amount</th>
														<th scope='col'>Date</th>
														<th scope='col'>Balance</th>
													</tr>
												</thead>
												<tbody>
													{formik.values.installment_array.map(
														(data, index) => {
															balance -= Number(
																data.installment_rate
																	? data.installment_rate
																	: 0,
															);

															return (
																<tr
																	onClick={() => {
																		console.log(
																			'Clicked on TR',
																		);
																	}}>
																	<th scope='row'>{index + 1}</th>
																	<td>
																		<FormGroup
																			id={`installment_array[${index}]installment_rate`}
																			label=''
																			isFloating>
																			<Input
																				readOnly={
																					formik.values
																						.paymentPlan
																						.label !==
																					'Custom'
																				}
																				type='number'
																				min='0'
																				placeholder=''
																				onChange={
																					formik.handleChange
																				}
																				onBlur={
																					formik.handleBlur
																				}
																				value={
																					data.installment_rate
																				}
																				isValid={
																					formik.isValid
																				}
																				isTouched={
																					formik.touched
																						.installment_array
																						?.installment_rate
																				}
																				invalidFeedback={
																					customErrors[
																						`installment_array[${index}]installment_rate`
																					]
																				}
																				onWheel={(e) =>
																					e.target.blur()
																				}
																				validFeedback='Looks good!'
																			/>
																		</FormGroup>
																	</td>
																	<td>
																		<FormGroup
																			id={`installment_array[${index}]installmentDate`}
																			label=''
																			isFloating>
																			<Flatpickr
																				disabled={
																					formik.values
																						.paymentPlan
																						.label !==
																					'Custom'
																				}
																				className='form-control'
																				value={
																					data?.installmentDate
																				}
																				options={{
																					dateFormat:
																						'd-m-y',
																					allowInput: true,
																					defaultDate:
																						new Date(),
																				}}
																				onChange={(
																					date,
																					dateStr,
																				) => {
																					// console.log('1', formik.values.date);
																					console.log(
																						'Raw Date:::ect: :',
																						dateStr,
																						date,
																					);

																					formik.setFieldValue(
																						`installment_array[${index}]installmentDate`,
																						dateStr,
																					);
																				}}
																				onClose={(
																					date,
																					dateStr,
																				) => {
																					formik.setFieldValue(
																						`installment_array[${index}]installmentDate`,
																						dateStr,
																					);
																				}}
																				id='default-picker'
																			/>
																		</FormGroup>
																		{customErrors[
																			`installment_array[${index}]installmentDate`
																		] && (
																			// <div className='invalid-feedback'>
																			<p
																				style={{
																					color: 'red',
																				}}>
																				{
																					customErrors[
																						`installment_array[${index}]installmentDate`
																					]
																				}
																			</p>
																		)}
																	</td>
																	<td>
																		<FormGroup>
																			<Input
																				id={`balance${index}`}
																				type='text'
																				min='0'
																				readOnly
																				value={balance.toLocaleString(
																					undefined,
																					{
																						maximumFractionDigits: 2,
																					},
																				)}
																				validFeedback='Looks good!'
																				isTouched
																				invalidFeedback={
																					customErrors[
																						`installment_array[${index}]balance`
																					]
																				}
																			/>
																		</FormGroup>
																	</td>
																</tr>
															);
														},
													)}
												</tbody>
											</table>
										</div>
									</Card>
								</div>
								{/* End of Table */}

								<div className='row g-4'>
									<div className='col-md-10' />
									<div className='col-auto'>
										<div className='row g-1'>
											<div className='col-auto'>
												<br />
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
											</div>

											<div className='col-auto'>
												<br />
												<Dropdown direction='up'>
													<DropdownToggle hasIcon={false}>
														<Button
															color={themeStatus}
															icon='MoreVert'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<DropdownItem>
															<Button
																className='me-3'
																icon='Save'
																isLight
																isDisable={isLoading}
																onClick={formik.resetForm}>
																Reset
															</Button>
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default EditModernPage;
