// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import moment from 'moment';
import Spinner from '../../../../components/bootstrap/Spinner';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardCodeView,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTabItem,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
import showNotification from '../../../../components/extras/showNotification';
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';
import useSortableData from '../../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../../components/PaginationButtons';
import useSelectTable from '../../../../hooks/useSelectTable';
import Checks from '../../../../components/bootstrap/forms/Checks';
import Icon from '../../../../components/icon/Icon';
import { componentsMenu } from '../../../../menu';
import useDarkMode from '../../../../hooks/useDarkMode';
import EditLoan from './editLoan';

const SubGroups = (props) => {
	const [refreshLoans, setRefreshLoans] = useState(0);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { items, requestSort, getClassNamesFor } = useSortableData(props.tableRecords);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const toggleStatus = (id) => {
		Axios.get(`${baseURL}/makeSubGroupActiveOrInactive?sub_group_id=${id}`)
			.then((response) => {
				showNotification(
					'Employee activated',
					'Employee activated Successfully',
					'success',
				);

				props.refreshTableRecordsHandler(props.refreshTableRecords + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	// Edit/Update/Delete

	const [stateDelete, setStateDelete] = useState(false);

	const handleStateDelete = (status) => {
		setStateDelete(status);
	};
	const handleStateEdit = (status) => {
		setStateEdit(status);
	};

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

	const [deletingLoanId, setDeletingLoanId] = useState('');

	const deleteLoan = (id) => {
		Axios.get(`${baseURL}/deleteCoaSubGroup?coa_sub_group_id=${id}`)
			.then((response) => {
				showNotification('Employee deleted', 'Employee deleted Successfully', 'success');

				setStateDelete(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const updateLoan = (id) => {
		Axios.get(`${baseURL}/updateLoan?voucher_id=${id}`)
			.then((response) => {
				showNotification('Voucher updated', 'Voucher updated Successfully', 'success');
				setRefreshLoans(refreshLoans + 1);
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

	const [editingLoanId, setEditingLoanId] = useState('');

	const [editingLoanData, setEditingLoanData] = useState([]);
	const [editingLoanDataLoading, setEditingLoanDataLoading] = useState(false);

	const getEditingLoan = (id) => {
		setEditingLoanDataLoading(true);
		Axios.get(`${baseURL}/getLoanAmortizationDetails?loan_amortization_id=${id}`)
			.then((response) => {
				setEditingLoanData(response.data.loanAmortization);
				// setRefreshLoans(refreshLoans + 1);
				setEditingLoanDataLoading(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	return (
		<>
			<CardBody>
				<table className='table table-modern'>
					<thead>
						<tr>
							<th
								style={{
									width: 50,
								}}>
								{SelectAllCheck}
							</th>

							<th>ID</th>
							<th>Investor</th>
							<th>Start Date</th>
							<th>Loan Amount</th>
							<th>Annual Profit Rate</th>
							<th>Loan Period in Years</th>
							<th>Payments per year</th>

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
					{props.tableRecordsLoading ? (
						<tbody>
							<tr>
								<td colSpan='11'>
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

									{/* <td>
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
														item.isActive === 0 ? `danger` : `success`
													}`,
												)}>
												<span className='visually-hidden'>
													{item.isActive}
												</span>
											</span>
										</div>
									</td> */}
									<td> {item.id}</td>
									<td> {item.investor.name}</td>
									<td>{moment(item.start_date).format('DD-MM-YYYY')}</td>
									<td> {item.loan_amount}</td>
									<td> {item.annual_profit_rate}</td>
									<td> {item.loan_period_in_years}</td>
									<td> {item.no_of_payments_per_year}</td>

									<td>
										<ButtonGroup>
											{Cookies.get('role') === 'Admin' && (
												<>
													<Button
														isOutline
														color='primary'
														isDisable={item.isApproved === 1}
														// isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': true,
														})}
														icon='Edit'
														onClick={() => {
															setEditingLoanId(item.voucher_no);

															getEditingLoan(item.id);

															initialStatusEdit();

															setStateEdit(true);
															setStaticBackdropStatusEdit(true);
														}}>
														Edit
													</Button>
													{/* <Button
														isOutline
														color='primary'
														isDisable={item.isApproved === 1}
														// isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': true,
														})}
														icon='Delete'
														onClick={() => {
															setDeletingLoanId(item.id);

															initialStatusDelete();

															setStateDelete(true);
															setStaticBackdropStatusDelete(false);
														}}>
														Delete
													</Button> */}
												</>
											)}
											{/* <Dropdown>
												<DropdownToggle hasIcon={false}>
													<Button
														color='primary'
														isLight
														hoverShadow='default'
														icon='MoreVert'
													/>
												</DropdownToggle>
												<DropdownMenu isAlignmentEnd>
													<DropdownItem isHeader>Actions</DropdownItem>

													{Cookies.get('role') === 'Admin' && (
														<DropdownItem>
															<Button
																isOutline
																color='primary'
																// isLight={darkModeStatus}
																className={classNames(
																	'text-nowrap',
																	{
																		'border-light': true,
																	},
																)}
																icon='Preview'
																onClick={() => {
																	toggleStatus(item.id);
																}}>
																{item.isActive === 0
																	? `Activate`
																	: `Deactivate`}
															</Button>
														</DropdownItem>
													)}
												</DropdownMenu>
											</Dropdown> */}
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
								Deletion Confirmation Employee Name: {editingLoanData?.code}
								<small> Employee ID: {editingLoanData?.name}</small>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								<CardBody>
									Are you sure you want to delete Employee? <br />
									code: {editingLoanData?.code}
									name: {editingLoanData?.name} <br />
									This cannot be undone!
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
											onClick={() => deleteLoan(deletingLoanId)}>
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
									Editing Loan Amortization Details: {editingLoanData?.name}{' '}
									<br />
									<small> Employee Code: {editingLoanData?.code}</small>
								</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								{editingLoanDataLoading ? (
									<div className='d-flex justify-content-center'>
										<Spinner color='primary' size='5rem' />
									</div>
								) : (
									<EditLoan
										editingLoanData={editingLoanData}
										handleStateEdit={handleStateEdit}
										refreshTableRecordsHandler={
											props.refreshTableRecordsHandler
										}
										refreshTableRecords={props.refreshTableRecords}
									/>
								)}

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
		</>
	);
};

export default SubGroups;
