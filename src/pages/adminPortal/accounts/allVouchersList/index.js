// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import moment from 'moment';
import { componentsMenu } from '../../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Spinner from '../../../../components/bootstrap/Spinner';
import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';

import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardTitle,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';

// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../../components/bootstrap/forms/InputGroup';
import Input from '../../../../components/bootstrap/forms/Input';
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';
import useSortableData from '../../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../../components/PaginationButtons';
import useSelectTable from '../../../../hooks/useSelectTable';
import Checks from '../../../../components/bootstrap/forms/Checks';
import Icon from '../../../../components/icon/Icon';

import showNotification from '../../../../components/extras/showNotification';
import GeneratePVVoucherPDF from '../vouchers/printVouchers/GeneratePVVoucherPDF';
import GenerateRVVoucherPDF from '../vouchers/printVouchers/GenerateRVVoucherPDF';
import GenerateJVVoucherPDF from '../vouchers/printVouchers/GenerateJVVoucherPDF';
import GenerateCVVoucherPDF from '../vouchers/printVouchers/GenerateCVVoucherPDF';
import GenerateLPVVoucherPDF from '../filesVouchers/printVouchers/GenerateLPVVoucherPDF';
import GenerateLRVVoucherPDF from '../filesVouchers/printVouchers/GenerateLRVVoucherPDF';
import GenerateLJVVoucherPDF from '../filesVouchers/printVouchers/GenerateLJVVoucherPDF';
import Select from '../../../../components/bootstrap/forms/Select';
import useDarkMode from '../../../../hooks/useDarkMode';
import PaymentVoucher from './editVouchers/PaymentVoucher/index';
import ReceiptVoucher from './editVouchers/ReceiptVoucher/index';
import JVVoucher from './editVouchers/JVVoucher/index';
import CVVoucher from './editVouchers/CVVoucher/index';
import LPaymentVoucher from './editVouchers/landEditVouchers/PaymentVoucher/index';
import LReceiptVoucher from './editVouchers/landEditVouchers/ReceiptVoucher/index';
import LJVVoucher from './editVouchers/landEditVouchers/JVVoucher/index';

export const _selectOptions = [
	{ value: 1, text: 'Voucher No' },
	// { value: 2, text: 'Mutation No' },
	// { value: 3, text: 'Khasra No' },
];
export const _voucherOptions = [
	{ value: 1, text: 'All' },
	{ value: 2, text: 'PV' },
	{ value: 3, text: 'RV' },
	{ value: 4, text: 'JV' },
	{ value: 5, text: 'CV' },
	{ value: 6, text: 'LPV' },
	{ value: 7, text: 'LRV' },
	{ value: 8, text: 'LJV' },
];

const DashboardPage = () => {
	const [refreshVouchers, setRefreshVouchers] = useState(0);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [searchNo, setSearchNo] = useState('');
	const [searchByVoucherNoTrigger, setSearchByVoucherNoTrigger] = useState(1);

	const [searchBy, setSearchBy] = useState('1');
	const [voucherType, setVoucherType] = useState('1');
	useEffect(() => {
		setLandsViewLoading(true);

		Axios.get(`${baseURL}/getVouchers`)
			.then((response) => {
				setLandsView(response.data.vouchers);
				setLandsViewLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	const searchFilterTrigger = () => {
		setLandsViewLoading(true);

		Axios.get(`${baseURL}/getVouchers?voucher_no=${searchNo}`)
			.then((response) => {
				setLandsView(response.data.vouchers);
				setLandsViewLoading(false);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};
	useEffect(() => {
		setLandsViewLoading(true);

		const getAllLands = () => {
			Axios.get(`${baseURL}/getVouchers`)
				.then((response) => {
					setLandsView(response.data.vouchers);
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getVouchersByType = (typeSearch) => {
			Axios.get(`${baseURL}/getVouchers?type=${typeSearch}`)
				.then((response) => {
					setLandsView(response.data.vouchers);
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};

		if (voucherType === '1') {
			getAllLands();
		} else if (voucherType === '2') {
			getVouchersByType(1);
		} else if (voucherType === '3') {
			getVouchersByType(2);
		} else if (voucherType === '4') {
			getVouchersByType(3);
		} else if (voucherType === '5') {
			getVouchersByType(4);
		} else if (voucherType === '6') {
			getVouchersByType(5);
		} else if (voucherType === '7') {
			getVouchersByType(6);
		} else if (voucherType === '8') {
			getVouchersByType(7);
		}
	}, [voucherType, refreshVouchers]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [landsView, setLandsView] = useState([]);
	const [landsViewLoading, setLandsViewLoading] = useState(true);
	const [printreport, setPrintreport] = useState([]);

	// const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);
	const approveVoucher = (id) => {
		Axios.get(`${baseURL}/approveOrUnapproveVoucher?voucher_id=${id}`)
			.then((response) => {
				showNotification('Voucher Approved', 'Voucher approved Successfully', 'success');
				setRefreshVouchers(refreshVouchers + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	const printVoucher = (id, VoucherType, docType) => {
		Axios.get(`${baseURL}/getVoucherDetails?voucher_id=${id}`)
			.then((response) => {
				setPrintreport(response.data.voucher);
				//   setLoading(false)
				if (VoucherType === 1) {
					GeneratePVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 2) {
					GenerateRVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 3) {
					GenerateJVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 4) {
					GenerateCVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 5) {
					GenerateLPVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 6) {
					GenerateLRVVoucherPDF(response.data.voucher, docType);
				} else if (VoucherType === 7) {
					GenerateLJVVoucherPDF(response.data.voucher, docType);
				}

				showNotification('Printing Voucher', 'Printing  Voucher Successfully', 'success');

				// showNotification('Printing Reports', 'Printing 2 reports Successfully', 'success');
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	const handleStateEdit = (status) => {
		setRefreshVouchers(refreshVouchers + 1);
		setStateEdit(status);
	};

	const [stateDelete, setStateDelete] = useState(false);

	const [staticBackdropStatusDelete, setStaticBackdropStatusDelete] = useState(false);
	const [scrollableStatusDelete, setScrollableStatusDelete] = useState(false);
	const [centeredStatusDelete, setCenteredStatusDelete] = useState(false);
	const [sizeStatusDelete, setSizeStatusDelete] = useState(null);
	const [fullScreenStatusDelete, setFullScreenStatusDelete] = useState(null);
	const [animationStatusDelete, setAnimationStatusDelete] = useState(true);

	const [headerCloseStatusDelete, setHeaderCloseStatusDelete] = useState(true);

	const initialStatusDelete = () => {
		setStaticBackdropStatusDelete(false);
		setScrollableStatusDelete(false);
		setCenteredStatusDelete(false);
		setSizeStatusDelete('md');
		setFullScreenStatusDelete(null);
		setAnimationStatusDelete(true);
		setHeaderCloseStatusDelete(true);
	};

	const [deletingVoucherId, setDeletingVoucherId] = useState('');

	const deleteFile = (id) => {
		Axios.get(`${baseURL}/deleteVoucher?voucher_id=${id}`)
			.then((response) => {
				showNotification('Voucher deleted', 'Voucher deleted Successfully', 'success');
				setRefreshVouchers(refreshVouchers + 1);
				setStateDelete(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const updateVoucher = (id) => {
		Axios.get(`${baseURL}/updateVoucher?voucher_id=${id}`)
			.then((response) => {
				showNotification('Voucher updated', 'Voucher updated Successfully', 'success');
				setRefreshVouchers(refreshVouchers + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	// Edit
	const [stateEdit, setStateEdit] = useState(false);

	const [staticBackdropStatusEdit, setStaticBackdropStatusEdit] = useState(true);
	const [scrollableStatusEdit, setScrollableStatusEdit] = useState(false);
	const [centeredStatusEdit, setCenteredStatusEdit] = useState(false);
	const [sizeStatusEdit, setSizeStatusEdit] = useState(null);
	const [fullScreenStatusEdit, setFullScreenStatusEdit] = useState(null);
	const [animationStatusEdit, setAnimationStatusEdit] = useState(true);

	const [headerCloseStatusEdit, setHeaderCloseStatusEdit] = useState(true);

	const initialStatusEdit = () => {
		setStaticBackdropStatusEdit(true);
		setScrollableStatusEdit(false);
		setCenteredStatusEdit(false);
		setSizeStatusEdit('xl');
		setFullScreenStatusEdit(false);
		setAnimationStatusEdit(true);
		setHeaderCloseStatusEdit(true);
	};

	const [editingVoucherId, setEditingVoucherId] = useState('');
	const [editingVoucherType, setEditingVoucherType] = useState('');
	const [editingVoucherData, setEditingVoucherData] = useState([]);
	const [editingVoucherDataLoading, setEditingVoucherDataLoading] = useState(false);

	const getEditingVoucher = (id) => {
		setEditingVoucherDataLoading(true);
		Axios.get(`${baseURL}/editVoucher?voucher_id=${id}`)
			.then((response) => {
				setEditingVoucherData(response.data.voucher);
				setRefreshVouchers(refreshVouchers + 1);
				setEditingVoucherDataLoading(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	return (
		<PageWrapper title={componentsMenu.components.subMenu.table.text}>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Vouchers</CardTitle>
								</CardLabel>
							</CardHeader>

							<CardBody>
								<div className='row g-4'>
									<div className='col-md-2'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setVoucherType(e.target.value);
											}}
											value={voucherType}
											list={_voucherOptions}
										/>
									</div>
									<div className='col-md-2'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setSearchBy(e.target.value);
											}}
											value={searchBy}
											list={_selectOptions}
										/>
									</div>
									<div className='col-md-3'>
										<Input
											id='searchFileNo'
											type='text'
											onChange={(e) => {
												setSearchNo(e.target.value);
											}}
											value={searchNo}
											validFeedback='Looks good!'
										/>
									</div>
									<div className='col-auto'>
										<Button
											color='primary'
											onClick={() => searchFilterTrigger()}
											isOutline
											isDisable={landsViewLoading}
											isActive>
											Search
										</Button>
									</div>
								</div>
								<br />
								<table className='table table-modern'>
									<thead>
										<tr>
											<th style={{ width: 50 }}>{SelectAllCheck}</th>
											<th
												onClick={() => requestSort('id')}
												className='cursor-pointer text-decoration-underline'>
												voucher no{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('firstName')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('voucher_id')}
												className='cursor-pointer text-decoration-underline'>
												V Type{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('voucher_id')}
													icon='FilterList'
												/>
											</th>

											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												Name Person{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												Date{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												total_amount{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th className='cursor-pointer text-decoration-underline'>
												Status{' '}
											</th>

											<th className='cursor-pointer text-decoration-underline'>
												Actions{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('Actions')}
													icon='FilterList'
												/>
											</th>
										</tr>
									</thead>
									{landsViewLoading ? (
										<tbody>
											<tr>
												<td colSpan='8'>
													<div className='d-flex justify-content-center'>
														<Spinner color='primary' size='5rem' />
													</div>
												</td>
											</tr>
										</tbody>
									) : (
										<tbody>
											{onCurrentPageData.map((item) => (
												<tr key={item.id}>
													<td>
														<Checks
															id={item.id.toString()}
															name='selectedList'
															value={item.id}
															onChange={selectTable.handleChange}
															checked={selectTable.values.selectedList.includes(
																item.id.toString(),
															)}
														/>
													</td>
													<td>{item.voucher_no}</td>
													<td>
														{item.type === 1 && `PV`}
														{item.type === 2 && `RV`}
														{item.type === 3 && `JV`}
														{item.type === 4 && `CV`}
														{item.type === 5 && `LPV`}
														{item.type === 6 && `LRV`}
														{item.type === 7 && `LJV`}
													</td>

													<td>{item.name}</td>
													<td>
														{moment(item.date).format('DD-MM-YYYY')}
													</td>

													<td>
														{item.total_amount.toLocaleString(
															undefined,
															{
																maximumFractionDigits: 2,
															},
														)}
													</td>
													<td>
														{Cookies.get('role') === 'Admin' && (
															<Dropdown>
																<DropdownToggle hasIcon={false}>
																	<Button
																		isLink
																		color={
																			item.isApproved === 0
																				? `danger`
																				: `success`
																		}
																		icon='Circle'
																		className='text-nowrap'>
																		{item.isApproved === 0
																			? `Pending`
																			: `Approved`}
																	</Button>
																</DropdownToggle>

																<DropdownMenu>
																	<DropdownItem key={1}>
																		<Button
																			onClick={() => {
																				approveVoucher(
																					item.id,
																				);
																			}}>
																			<Icon
																				icon='Circle'
																				color={
																					item.isApproved ===
																					1
																						? `danger`
																						: `success`
																				}
																			/>
																			{item.isApproved === 1
																				? `Pending`
																				: `Approved`}
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														)}
														{Cookies.get('role') !== 'Admin' && (
															<div className='d-flex align-items-center'>
																<span
																	className={classNames(
																		'badge',
																		'border border-2',
																		[`border-${themeStatus}`],
																		'rounded-circle',
																		'bg-success',
																		'p-2 me-2',
																		`bg-${
																			item.isApproved === 0
																				? `danger`
																				: `success`
																		}`,
																	)}>
																	<span className='visually-hidden'>
																		{item.isApproved}
																	</span>
																</span>
																<span className='text-nowrap'>
																	{item.isApproved === 0
																		? `Pending`
																		: `Approved`}
																</span>
															</div>
														)}
													</td>
													<td>
														<ButtonGroup>
															<Button
																isOutline
																color='primary'
																isDisable={item.isApproved === 1}
																// isLight={darkModeStatus}
																className={classNames(
																	'text-nowrap',
																	{
																		'border-light': true,
																	},
																)}
																icon='Edit'
																onClick={() => {
																	setEditingVoucherId(
																		item.voucher_no,
																	);
																	setEditingVoucherType(
																		item.type,
																	);
																	getEditingVoucher(item.id);

																	initialStatusEdit();

																	setStateEdit(true);
																	setStaticBackdropStatusEdit(
																		true,
																	);
																}}>
																Edit
															</Button>
															<Button
																isOutline
																color='primary'
																isDisable={item.isApproved === 1}
																// isLight={darkModeStatus}
																className={classNames(
																	'text-nowrap',
																	{
																		'border-light': true,
																	},
																)}
																icon='Delete'
																onClick={() => {
																	setDeletingVoucherId(item.id);

																	initialStatusDelete();

																	setStateDelete(true);
																	setStaticBackdropStatusDelete(
																		false,
																	);
																}}>
																Delete
															</Button>
															<Dropdown>
																<DropdownToggle hasIcon={false}>
																	<Button
																		color='primary'
																		isLight
																		hoverShadow='default'
																		icon='MoreVert'
																	/>
																</DropdownToggle>
																<DropdownMenu isAlignmentEnd>
																	<DropdownItem isHeader>
																		Actions
																	</DropdownItem>
																	<DropdownItem>
																		<Button
																			isOutline
																			color='info'
																			// isLight={darkModeStatus}
																			className={classNames(
																				'text-nowrap',
																				{
																					'border-light': true,
																				},
																			)}
																			icon='Preview'
																			onClick={() =>
																				printVoucher(
																					item.id,
																					item.type,
																					2,
																				)
																			}>
																			View
																		</Button>
																	</DropdownItem>
																	<DropdownItem>
																		<Button
																			isOutline
																			color='dark'
																			// isLight={darkModeStatus}

																			icon='FilePdfFill'
																			onClick={() =>
																				printVoucher(
																					item.id,
																					item.type,
																					1,
																				)
																			}>
																			Save to pdf
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</ButtonGroup>
													</td>
												</tr>
											))}
										</tbody>
									)}
								</table>
							</CardBody>
							<PaginationButtons
								data={items}
								label='items'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
					<Modal
						isOpen={stateDelete}
						setIsOpen={setStateDelete}
						titleId='exampleModalLabel'
						isStaticBackdrop={staticBackdropStatusDelete}
						isScrollable={scrollableStatusDelete}
						isCentered={centeredStatusDelete}
						size={sizeStatusDelete}
						fullScreen={fullScreenStatusDelete}
						isAnimation={animationStatusDelete}>
						<ModalHeader setIsOpen={headerCloseStatusDelete ? setStateDelete : null}>
							<ModalTitle id='deltefile'>
								{' '}
								<CardHeader>
									<CardLabel icon='Delete' iconColor='info'>
										<CardTitle>
											Deletion Confirmation Voucher Id {deletingVoucherId}
											<small> Voucher Id: {deletingVoucherId}</small>
										</CardTitle>
									</CardLabel>
								</CardHeader>
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div className='row g-4'>
								<div className='col-12'>
									<Card>
										<CardBody>
											<h5>
												Are you sure you want to delete Voucher Id{' '}
												{deletingVoucherId}? This cannot be undone!
											</h5>
										</CardBody>
										<CardFooter>
											<CardFooterLeft>
												<Button
													color='info'
													icon='cancel'
													isOutline
													className='border-0'
													onClick={() => setStateDelete(false)}>
													Cancel
												</Button>
											</CardFooterLeft>
											<CardFooterRight>
												<Button
													icon='delete'
													color='danger'
													onClick={() => deleteFile(deletingVoucherId)}>
													Yes, Delete!
												</Button>
											</CardFooterRight>
										</CardFooter>
									</Card>
								</div>
							</div>
						</ModalBody>
						<ModalFooter />
					</Modal>
					<Modal
						isOpen={stateEdit}
						setIsOpen={setStateEdit}
						titleId='EditVoucher'
						isStaticBackdrop={staticBackdropStatusEdit}
						isScrollable={scrollableStatusEdit}
						isCentered={centeredStatusEdit}
						size={sizeStatusEdit}
						fullScreen={fullScreenStatusEdit}
						isAnimation={animationStatusEdit}>
						<ModalHeader setIsOpen={headerCloseStatusEdit ? setStateEdit : null}>
							<ModalTitle id='editVoucher'>
								{' '}
								<CardHeader>
									<CardLabel icon='Edit' iconColor='info'>
										<CardTitle>
											Editing Voucher {editingVoucherId}
											<small> Voucher Id: {editingVoucherId}</small>
										</CardTitle>
									</CardLabel>
								</CardHeader>
							</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div className='row g-4'>
								<div className='col-12'>
									<Card>
										<CardBody>
											{editingVoucherDataLoading ? (
												<div className='d-flex justify-content-center'>
													<Spinner color='primary' size='5rem' />
												</div>
											) : (
												<>
													{editingVoucherType === 1 && (
														<PaymentVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 2 && (
														<ReceiptVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 3 && (
														<JVVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 4 && (
														<CVVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 5 && (
														<LPaymentVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 6 && (
														<LReceiptVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
													{editingVoucherType === 7 && (
														<LJVVoucher
															editingVoucherData={editingVoucherData}
															voucherId={editingVoucherId}
															handleStateEdit={handleStateEdit}
														/>
													)}
												</>
											)}
										</CardBody>
										<CardFooter>
											<CardFooterLeft>
												<Button
													color='info'
													icon='cancel'
													isOutline
													className='border-0'
													onClick={() => setStateEdit(false)}>
													Cancel
												</Button>
											</CardFooterLeft>
										</CardFooter>
									</Card>
								</div>
							</div>
						</ModalBody>
						<ModalFooter />
					</Modal>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
