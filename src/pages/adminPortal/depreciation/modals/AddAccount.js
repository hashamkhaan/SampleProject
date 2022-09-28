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
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
// ** Axios Imports
import Axios from 'axios';
import Select from 'react-select';
import Spinner from '../../../../components/bootstrap/Spinner';
import { updateMasterDetails } from '../../redux/purchaseLandStore/index';
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

const validate = (values) => {
	let errors = {};

	if (!values.coa_sub_group_id) {
		errors.coa_sub_group_id = 'Required';
	}
	if (values.list.length < 1) {
		errors.list = 'Please choose at least one account';
	}
	values.list.forEach((data, index) => {
		if (!data.dep_percentage) {
			errors = {
				...errors,
				[`list[${index}]dep_percentage`]: 'Required',
			};
		}
	});
	console.log(errors);
	console.log(values);
	return errors;
};

const AddAccount = (props) => {
	const [subGroupsLoading, setSubGroupsLoading] = useState(true);
	const [accountsLoading, setAccountsLoading] = useState(false);

	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
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

	const formik = useFormik({
		initialValues: {
			list: [],
			coa_sub_group_id: '',
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const submitForm = (myFormik) => {
		const url = `${baseURL}/addDepreciableAccounts`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify(myFormik.values),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					props.setRefreshAccountsView(props.refreshAccountsView + 1);
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);
					setLastSave(moment());
					myFormik.resetForm();
					dispatch(
						updateMasterDetails([
							store.data.masterDetails.refreshDropdowns + 1,
							'refreshDropdowns',
						]),
					);
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
		setSizeStatus('lg');
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};

	const handleSave = () => {
		submitForm(formik);
		setLastSave(moment());
	};

	const [coeSubGroupOptions, setCoeSubGroupOptions] = useState([]);

	useEffect(() => {
		setSubGroupsLoading(true);
		Axios.get(`${baseURL}/coaSubGroupsByGroup?coa_group_id=2`)
			.then((response) => {
				const rec = response.data.coaSubGroups.map(({ id, name, code }) => ({
					id,
					value: id,
					label: `${code}-${name}`,
				}));
				setCoeSubGroupOptions(rec);
				setSubGroupsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		if (formik.values.coa_sub_group_id !== '') {
			setAccountsLoading(true);

			Axios.get(
				`${baseURL}/getDepreciableOrNonDepreciableAccounts?isDepreciable=0&sub_group_id=${formik.values.coa_sub_group_id}`,
			)
				.then((response) => {
					const rec = response.data.coaAccounts.map(({ id, name, code }) => ({
						id,
						name,
						code,
						dep_percentage: '',
					}));
					formik.setFieldValue('list', rec);
					setAccountsLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setAccountsLoading(false);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formik.values.coa_sub_group_id]);

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
				Add New Depreciable Account
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
					<ModalTitle id='exampleModalLabel'>Add New Account</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch>
							<CardBody>
								<div className='row g-4'>
									<FormGroup
										id='coa_sub_group_id'
										label='Sub group'
										className='col-md-12'>
										<Select
											isLoading={subGroupsLoading}
											className='col-md-11'
											classNamePrefix='select'
											options={coeSubGroupOptions}
											value={coeSubGroupOptions.find(
												(c) => c.value === formik.values.coa_sub_group_id,
											)}
											// value={formik.values.mouza_id}
											onChange={(val) => {
												formik.setFieldValue('coa_sub_group_id', val.id);
											}}
										/>
									</FormGroup>
								</div>
								<div className='row g-4'>
									<CardBody className='col-md-6 '>
										<h3 className=' d-flex justify-content-center'>
											Depreciable Accounts
										</h3>

										<table className='table table-modern'>
											<thead>
												<tr>
													<th>S No</th>
													<th>Code</th>
													<th>Account Name</th>
													<th>Depreciation %</th>
												</tr>
											</thead>
											{accountsLoading ? (
												<tbody>
													<tr>
														<td colSpan='11'>
															<div className='d-flex justify-content-center'>
																<Spinner
																	color='primary'
																	size='5rem'
																/>
															</div>
														</td>
													</tr>
												</tbody>
											) : (
												<tbody>
													{formik.values.list?.map((item, index) => (
														<tr key={item.id}>
															<td> {index + 1}</td>

															<td>{item.code}</td>
															<td>{item.name}</td>

															<td>
																<FormGroup
																	id={`list[${index}].dep_percentage`}
																	isFloating>
																	<Input
																		type='number'
																		min='0'
																		max={100}
																		onWheel={(e) =>
																			e.target.blur()
																		}
																		placeholder='amount'
																		onBlur={formik.handleBlur}
																		value={item.dep_percentage}
																		onChange={
																			formik.handleChange
																		}
																		isValid={formik.isValid}
																		isTouched
																		invalidFeedback={
																			formik.errors[
																				`list[${index}]dep_percentage`
																			]
																		}
																		validFeedback='Looks good!'
																	/>
																</FormGroup>
															</td>
														</tr>
													))}
												</tbody>
											)}
										</table>
										{formik.errors.list && (
											// <div className={classNames( "invalid-feedback")}>
											<p
												style={{
													color: 'red',
												}}>
												{formik.errors.list}
											</p>
										)}
									</CardBody>
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
						onClick={() => setState(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default AddAccount;
