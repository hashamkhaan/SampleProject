// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair

import React, { useState } from 'react';
import Axios from 'axios';
import classNames from 'classnames';

// ** Axios Imports

import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import baseURL from '../../../baseURL/baseURL';
import Icon from '../../../components/icon/Icon';
import Checks from '../../../components/bootstrap/forms/Checks';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import useSelectTable from '../../../hooks/useSelectTable';
import showNotification from '../../../components/extras/showNotification';

// import GeneratePDF2 from './print/ReportII'
import Spinner from '../../../components/bootstrap/Spinner';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../../components/bootstrap/Card';
import EditPlot from './Edit';
import useDarkMode from '../../../hooks/useDarkMode';
import EditOpen from './EditOpen';

export const searchByOptions = [
	{ value: 1, text: 'Reg No' },
	{ value: 2, text: 'Plot no' },
	{ value: 3, text: 'File No' },
];
export const blockOptions = [
	{ value: 0, text: 'All' },
	{ value: 1, text: 'Umar Block' },
	{ value: 2, text: 'Ali Block' },
];
export const typeOptions = [
	{ value: 1, text: 'All' },
	{ value: 2, text: 'Residential' },
	{ value: 3, text: 'Commercial' },
];
export const isOpenOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Non Balloted' },
	{ value: 0, text: 'Balloted' },
];
export const isBookedOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Booked' },
	{ value: 0, text: 'Not booked' },
];
export const isApprovedOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Approved' },
	{ value: 0, text: 'Unapproved' },
];

const TablePage = (props) => {
	const { themeStatus } = useDarkMode();

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [editingItemLoading, setEditingItemLoading] = useState(false);

	const { items, requestSort, getClassNamesFor } = useSortableData(props.tableData);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const [editingItem, setEditingItem] = useState({});

	const getEditingPlot = (idd) => {
		setEditingItemLoading(true);
		Axios.get(`${baseURL}/editplot?id=${idd}`)
			.then((response) => {
				setEditingItem(response.data.plot);
				setEditingItemLoading(false);
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
	// delete
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

	const [deletingPlotId, setDeletingPlotId] = useState('');
	const [deletingPlotRegno, setDeletingPlotRegno] = useState('');
	const deleteFile = (id) => {
		Axios.get(`${baseURL}/deletePlot?id=${id}`)
			.then((response) => {
				showNotification('Plot deleted', response.message, 'success');
				props.refreshTableData();
				setStateDelete(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	const handleStateEdit = (status) => {
		props.refreshTableData();
		setStateEdit(status);
	};
	return (
		<>
			<CardBody>
				<table className='table table-modern'>
					<thead>
						<tr>
							<th style={{ width: 50 }}>{SelectAllCheck}</th>
							<th
								onClick={() => requestSort('id')}
								className='cursor-pointer text-decoration-underline'>
								id{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('id')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('file_no')}
								className='cursor-pointer text-decoration-underline'>
								File No{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('file_no')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('plot_no')}
								className='cursor-pointer text-decoration-underline'>
								Plot No{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('plot_no')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('reg_no')}
								className='cursor-pointer text-decoration-underline'>
								Reg No{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('reg_no')}
									icon='FilterList'
								/>
							</th>

							<th
								onClick={() => requestSort('block.name')}
								className='cursor-pointer text-decoration-underline'>
								Block{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('block.name')}
									icon='FilterList'
								/>
							</th>

							<th
								onClick={() => requestSort(`plotsize.size_in_SQFT`)}
								className='cursor-pointer text-decoration-underline'>
								Size{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('plotsize.size_in_SQFT')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('price')}
								className='cursor-pointer text-decoration-underline'>
								Price{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('price')}
									icon='FilterList'
								/>
							</th>

							<th
								onClick={() => requestSort('plot_type')}
								className='cursor-pointer text-decoration-underline'>
								Type{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('plot_type')}
									icon='FilterList'
								/>
							</th>

							<th
								onClick={() => requestSort('is_general')}
								className='cursor-pointer text-decoration-underline'>
								General{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('is_general')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('is_booked')}
								className='cursor-pointer text-decoration-underline'>
								Booking Status{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('is_booked')}
									icon='FilterList'
								/>
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
					{props.tableDataLoading ? (
						<tbody>
							<tr>
								<td colSpan='12'>
									<div className='d-flex justify-content-center'>
										<Spinner color='primary' size='3rem' />
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
														item.isApproved === 0 ? `danger` : `success`
													}`,
												)}>
												<span className='visually-hidden'>
													{item.isApproved}
												</span>
											</span>
											<span className='text-nowrap'>{item.id}</span>
										</div>
									</td>
									<td>{item.file_no}</td>
									<td>{item.plot_no}</td>
									<td>{item.reg_no}</td>

									<td> {item.block?.name}</td>

									<td>
										{' '}
										{item.plot_type === 'Residential'
											? `${item?.plotsize?.size}=${item?.plotsize?.size_in_SQFT}`
											: item.size_in_SRFT}
									</td>

									<td>
										{item.price.toLocaleString(undefined, {
											maximumFractionDigits: 2,
										})}
									</td>

									<td>{item.plot_type}</td>

									<td>{item.is_general === 0 ? 'No' : 'Yes'}</td>
									<td>{item.is_booked === 0 ? 'Not Booked' : 'Booked'}</td>

									<td>
										<ButtonGroup>
											<Button
												isDisable={item.isApproved === 1}
												onClick={() => {
													getEditingPlot(item.id);

													initialStatusEdit();

													setStateEdit(true);
													setStaticBackdropStatusEdit(true);
												}}
												isOutline
												color='primary'
												className={classNames('text-nowrap', {
													'border-light': true,
												})}
												icon='Edit'>
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
													setDeletingPlotId(item.id);
													setDeletingPlotRegno(item.reg_no);

													initialStatusDelete();

													setStateDelete(true);
													setStaticBackdropStatusDelete(false);
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
													<DropdownItem isHeader>Actions</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</ButtonGroup>
									</td>
									{/* <td>
                        <ViewRegistryFiles FileNo={item.FileNo} />
                    </td> */}
								</tr>
							))}
						</tbody>
					)}
					{props.tableDataLoading === false && (
						<tr>
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />
							<td />

							<td>
								<h3 className='d-flex justify-content-end px-4'>Total</h3>
							</td>

							<td>
								<h3 className='px-0'>
									{props.amountTotal.toLocaleString(undefined, {
										maximumFractionDigits: 2,
									})}
								</h3>
							</td>
						</tr>
					)}
				</table>

				<PaginationButtons
					data={items}
					label='items'
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
					perPage={perPage}
					setPerPage={setPerPage}
				/>
			</CardBody>
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
									Deletion Confirmation Plot Reg no {deletingPlotRegno}
									<small> Plot Reg no: {deletingPlotRegno}</small>
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
										Are you sure you want to delete Plot? <br /> Reg no:
										{deletingPlotRegno} <br />
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
											onClick={() => deleteFile(deletingPlotId)}>
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
									Editing Plot
									<small> Plot Reg no: {editingItem.reg_no} </small>
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
									{editingItemLoading ? (
										<div className='d-flex justify-content-center'>
											<Spinner color='primary' size='5rem' />
										</div>
									) : (
										<>
											{editingItem.block_id !== null && (
												<EditPlot
													editingItem={editingItem}
													handleStateEdit={handleStateEdit}
												/>
											)}
											{editingItem.block_id === null && (
												<EditOpen
													editingItem={editingItem}
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
		</>
	);
};

export default TablePage;
