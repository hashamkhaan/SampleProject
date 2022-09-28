// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-nested-ternary */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */

import React, { useState } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import Spinner from '../../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
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

import EditPerson from './EditPerson';
import EditCustomer from './EditCustomer';

const SubGroups = (props) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	const { items, requestSort, getClassNamesFor } = useSortableData(props.tableRecords);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const toggleStatus = (id) => {
		Axios.get(`${baseURL}/makePersonActiveOrInactive?employee_id=${id}`)
			.then((response) => {
				showNotification('Person activated', response.data.message, 'success');

				props.refreshTableRecordsHandler(props.refreshTableRecords + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	// Edit/Update/Delete

	const [stateDelete, setStateDelete] = useState(false);

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

	const [deletingPersonId, setDeletingPersonId] = useState('');
	const [deletingPersonName, setDeletingPersonName] = useState('');

	const deletePerson = (id) => {
		Axios.get(`${baseURL}/deletePerson?person_id=${id}`)
			.then((response) => {
				if (response.data.status === 'ok') {
					showNotification('Success', response.message, 'success');
				} else {
					showNotification('Error', response.data.message, 'danger');
				}

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

	const [editingPersonData, setEditingPersonData] = useState(null);
	const [editingPersonDataLoading, setEditingPersonDataLoading] = useState(false);

	const getEditingPerson = (id) => {
		setEditingPersonDataLoading(true);
		Axios.get(`${baseURL}/editPerson?person_id=${id}`)
			.then((response) => {
				setEditingPersonData(response.data.person);
				// setRefreshSubgroups(refreshSubgroups + 1);
				setEditingPersonDataLoading(false);
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
								ID
								<Icon
									size='lg'
									className={getClassNamesFor('Serial_No')}
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
							<th
								onClick={() => requestSort('father_name')}
								className='cursor-pointer text-decoration-underline'>
								Father Name{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('father_name')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('phone_no')}
								className='cursor-pointer text-decoration-underline'>
								Contact{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('phone_no')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('name')}
								className='cursor-pointer text-decoration-underline'>
								Role{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('name')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('cnic')}
								className='cursor-pointer text-decoration-underline'>
								cnic{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('cnic')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('address')}
								className='cursor-pointer text-decoration-underline'>
								address{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('address')}
									icon='FilterList'
								/>
							</th>

							<th>Actions </th>
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
									<td> {item.name}</td>
									<td> {item.father_name}</td>
									<td> {item.phone_no}</td>
									<td>
										{' '}
										{item.people_person_type.map((item2) => (
											<>
												<br />
												<p>{item2.person_type.type}</p>
											</>
										))}
									</td>
									<td> {item.cnic}</td>
									<td> {item.address}</td>

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
															getEditingPerson(item.id);

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
															setDeletingPersonId(item.id);
															setDeletingPersonName(item.name);

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
								Deletion Confirmation <br /> Person Name: {deletingPersonName}
								<br /> <small> Person ID: {deletingPersonId}</small>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								<CardBody>
									Are you sure you want to delete Person? <br />
									ID: {deletingPersonId}
									<br />
									Name: {deletingPersonName} <br />
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
											disabled
											onClick={() => deletePerson(deletingPersonId)}>
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
									Editing Person: {editingPersonData?.name} <br />
									<small> Person ID: {editingPersonData?.person_id}</small>
								</CardTitle>
							</CardLabel>
						</CardHeader>
					</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='row g-4'>
						<div className='col-12'>
							<Card>
								{editingPersonDataLoading ? (
									<div className='d-flex justify-content-center'>
										<Spinner color='primary' size='5rem' />
									</div>
								) : editingPersonData !== null &&
								  editingPersonData?.personTypes[0]?.person_type_id === 4 ? (
									<EditCustomer
										editingPersonData={editingPersonData}
										handleStateEdit={handleStateEdit}
										refreshTableRecordsHandler={
											props.refreshTableRecordsHandler
										}
										refreshTableRecords={props.refreshTableRecords}
									/>
								) : (
									<EditPerson
										editingPersonData={editingPersonData}
										handleStateEdit={handleStateEdit}
										refreshTableRecordsHasndler={
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
