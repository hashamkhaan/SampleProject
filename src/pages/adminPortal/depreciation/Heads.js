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
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Spinner from '../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
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
} from '../../../components/bootstrap/Card';
import EditAccount from './modalsEdit/AddAccount';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import Checks from '../../../components/bootstrap/forms/Checks';
import Icon from '../../../components/icon/Icon';
import { componentsMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';

const Heads = (props) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const { themeStatus, darkModeStatus } = useDarkMode();
	// const { items, requestSort, getClassNamesFor } = useSortableData(landsView);

	const { items, requestSort, getClassNamesFor } = useSortableData(props.coaAccountsView);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const toggleStatus = (id) => {
		Axios.get(`${baseURL}/makeAccountActiveOrInactive?account_id=${id}`)
			.then((response) => {
				showNotification('Account activated', 'Account activated Successfully', 'success');

				props.setRefreshAccountsView(props.refreshAccountsView + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	// Edit/Update/Delete

	const handleStateEdit = (status) => {
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

	const [deletingAccountId, setDeletingAccountId] = useState('');
	const [selectedAccountData, setSelectedAccountData] = useState(null);

	const deleteAccount = (id) => {
		Axios.get(`${baseURL}/deleteCoaAccount?account_id=${id}`)
			.then((response) => {
				showNotification('Account deleted', 'Account deleted Successfully', 'success');
				props.setRefreshAccountsView(props.refreshAccountsView + 1);
				setStateDelete(false);
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
		setSizeStatusEdit('md');
		setFullScreenStatusEdit(false);
		setAnimationStatusEdit(true);
		setHeaderCloseStatusEdit(true);
	};

	const [editingAccountId, setEditingAccountId] = useState('');

	const [editingAccountData, setEditingAccountData] = useState([]);
	const [editingAccountDataLoading, setEditingAccountDataLoading] = useState(false);

	const getEditingAccount = (id) => {
		setEditingAccountDataLoading(true);
		Axios.get(`${baseURL}/editCoaAccount?account_id=${id}`)
			.then((response) => {
				setEditingAccountData(response.data.coaAccount);
				// props.setRefreshAccountsView(props.refreshAccountsView + 1);
				setEditingAccountDataLoading(false);
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
							<th
								onClick={() => requestSort('id')}
								className='cursor-pointer text-decoration-underline'>
								<Icon
									size='lg'
									className={getClassNamesFor('id')}
									icon='FilterList'
								/>
							</th>

							{/* <th
								onClick={() => requestSort('Category')}
								className='cursor-pointer text-decoration-underline'>
								parent{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('Category')}
									icon='FilterList'
								/>
							</th> */}

							<th
								onClick={() => requestSort('name')}
								className='cursor-pointer text-decoration-underline'>
								Sub Group{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('name')}
									icon='FilterList'
								/>
							</th>

							<th
								onClick={() => requestSort('code')}
								className='cursor-pointer text-decoration-underline'>
								Code{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('code')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('name')}
								className='cursor-pointer text-decoration-underline'>
								Name{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('name')}
									icon='FilterList'
								/>
							</th>
							<th>Depreciation %</th>
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
					{props.coaAccountsViewLoading ? (
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

									<td>
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
									</td>
									{/* <td> {item.coa_group.parent}</td> */}

									<td>
										{' '}
										{item.coa_sub_group?.code}-{item.coa_sub_group?.name}
									</td>

									<td> {item.code}</td>
									<td> {item.name}</td>
									<td> {item.dep_percentage}%</td>

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
															setEditingAccountId(item.voucher_no);

															getEditingAccount(item.id);
															setSelectedAccountData(item);

															initialStatusEdit();

															setStateEdit(true);
															setStaticBackdropStatusEdit(true);
														}}>
														Edit
													</Button>
													<Button
														isOutline
														color='primary'
														isDisable={item.isApproved === 1}
														// isLight={darkModeStatus}
														className={classNames('text-nowrap', {
															'border-light': true,
														})}
														icon='Delete'
														onClick={() => {
															setDeletingAccountId(item.id);
															setSelectedAccountData(item);

															initialStatusDelete();

															setStateDelete(true);
															setStaticBackdropStatusDelete(false);
														}}>
														Delete
													</Button>
												</>
											)}
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
									Deletion Confirmation Account Code {selectedAccountData?.code}
									<small> Account Name: {selectedAccountData?.name}</small>
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
										Are you sure you want to delete Account? <br />
										code: {selectedAccountData?.code}
										name: {selectedAccountData?.name} <br />
										This cannot be undone!
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
											onClick={() => deleteAccount(selectedAccountData?.id)}>
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
									Editing Account: {selectedAccountData?.name} <br />
									<small> Account Code: {selectedAccountData?.code}</small>
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
									{editingAccountDataLoading ? (
										<div className='d-flex justify-content-center'>
											<Spinner color='primary' size='5rem' />
										</div>
									) : (
										<EditAccount
											editingAccountData={editingAccountData}
											handleStateEdit={handleStateEdit}
										/>
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
		</>
	);
};

export default Heads;
