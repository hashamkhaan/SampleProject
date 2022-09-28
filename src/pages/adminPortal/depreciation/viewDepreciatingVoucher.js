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
import Spinner from '../../../components/bootstrap/Spinner';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
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
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import showNotification from '../../../components/extras/showNotification';
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import Checks from '../../../components/bootstrap/forms/Checks';
import Icon from '../../../components/icon/Icon';
import { componentsMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';

const SubGroups = (props) => {
	const [refreshSubgroups, setRefreshSubgroups] = useState(0);
	const { themeStatus, darkModeStatus } = useDarkMode();
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { items, requestSort, getClassNamesFor } = useSortableData(props.tableRecords);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	// const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

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

	const [deletingSubgroupId, setDeletingSubgroupId] = useState('');

	const deleteSubgroup = (id) => {
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
	const updateSubgroup = (id) => {
		Axios.get(`${baseURL}/updateSubgroup?voucher_id=${id}`)
			.then((response) => {
				showNotification('Voucher updated', 'Voucher updated Successfully', 'success');
				setRefreshSubgroups(refreshSubgroups + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const getEditingPayroll = (idd) => {
		setEditingPayrollDataLoading(true);
		setEditingPayrollData(
			props.tableRecords.find((obj) => {
				return obj.id === idd;
			}),
		);
		const tempData = props.tableRecords.find((obj) => {
			return obj.id === idd;
		});
		initialStatusEdit();

		setStateEdit(true);
		setStaticBackdropStatusEdit(true);
		console.log(':::editingPayrollData', tempData);
		setEditingPayrollDataLoading(false);
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

	const [editingSubgroupId, setEditingSubgroupId] = useState('');

	const [editingPayrollIndex, setEditingPayrollIndex] = useState(null);
	const [editingPayrollData, setEditingPayrollData] = useState([]);
	const [editingPayrollDataLoading, setEditingPayrollDataLoading] = useState(false);

	return (
		<>
			<CardBody>
				<table className='table table-modern'>
					<thead>
						<tr>
							<th>Account Code</th>
							<th>Account Name</th>
							<th>totalValue</th>
							<th>depreciatedAmount</th>
							<th>remaining</th>
							<th>depreciatingAmount</th>
							<th>depreciatingPer</th>
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
							{onCurrentPageData.map((item, index) => (
								<tr key={item.code}>
									<td> {item.code}</td>
									<td> {item.name}</td>
									<td>
										{' '}
										{item.totalValue.toLocaleString(undefined, {
											maximumFractionDigits: 2,
										})}
									</td>
									<td>
										{' '}
										{item.depreciatedAmount.toLocaleString(undefined, {
											maximumFractionDigits: 2,
										})}
									</td>
									<td>
										{' '}
										{item.remaining.toLocaleString(undefined, {
											maximumFractionDigits: 2,
										})}
									</td>
									<td>
										{' '}
										{item.depreciatingAmount.toLocaleString(undefined, {
											maximumFractionDigits: 2,
										})}
									</td>
									<td> {item.depreciatingPer}%</td>
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
								Deletion Confirmation Employee Name: {editingPayrollData?.code}
								<small> Employee ID: {editingPayrollData?.name}</small>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								<CardBody>
									<h2>In progress</h2>
									{/* Are you sure you want to delete Employee? <br />
									code: {editingPayrollData?.code}
									name: {editingPayrollData?.name} <br />
									This cannot be undone! */}
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
											isDisable
											color='danger'
											onClick={() => deleteSubgroup(deletingSubgroupId)}>
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
									Editing Payroll: {editingPayrollData?.employee_details?.name}{' '}
									<br />
									<small> Employee ID: {editingPayrollData?.employee_id}</small>
								</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								{editingPayrollDataLoading ? (
									<div className='d-flex justify-content-center'>
										<Spinner color='primary' size='5rem' />
									</div>
								) : (
									<h1>Edit</h1>
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
