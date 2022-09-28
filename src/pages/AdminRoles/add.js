// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import classNames from 'classnames';

// ** Axios Imports

import { useNavigate } from 'react-router';
import moment from 'moment';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import baseURL from '../../baseURL/baseURL';
import Icon from '../../components/icon/Icon';
import Checks from '../../components/bootstrap/forms/Checks';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';
import PaginationButtons, { dataPagination } from '../../components/PaginationButtons';
import useDarkMode from '../../hooks/useDarkMode';
import useSortableData from '../../hooks/useSortableData';
import useSelectTable from '../../hooks/useSelectTable';
import showNotification from '../../components/extras/showNotification';
import AddRole from './modals/AddRole';
import GeneratePDF from './print/ReportI';
// import GeneratePDF2 from './print/ReportII'
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Select from '../../components/bootstrap/forms/Select';
import Input from '../../components/bootstrap/forms/Input';
import Spinner from '../../components/bootstrap/Spinner';
import Accordion, { AccordionItem } from '../../components/bootstrap/Accordion';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../components/bootstrap/Card';

export const _selectOptions = [
	{ value: 1, text: 'File No' },
	{ value: 2, text: 'Mutation No' },
	{ value: 3, text: 'Khasra No' },
];

const TablePage = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const navigate = useNavigate();

	const [searchNo, setSearchNo] = useState('');
	const [refreshLands, setRefreshLands] = useState(0);

	const [searchBy, setSearchBy] = useState('1');
	useEffect(() => {
		setLandsViewLoading(true);
		Axios.get(`${baseURL}/getUsers?pageNo=1&&records=10&&sort=asc&&colName=id`)
			.then((response) => {
				console.log('GET USERS::::::::', response.data);
				setLandsView(response.data.users.data);
				setLandsViewLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	const [fileNo, setFileNo] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [landsView, setLandsView] = useState([]);
	const [landsViewLoading, setLandsViewLoading] = useState(true);
	const [printreport, setPrintreport] = useState([]);

	// const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const approveFile = (id) => {
		Axios.get(`${baseURL}/approveLand?land_id=${id}`)
			.then((response) => {
				showNotification('File Approved', 'File approved Successfully', 'success');
				setRefreshLands(refreshLands + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};

	const deleteFile = (id) => {
		Axios.get(`${baseURL}/deleteLand?land_id=${id}`)
			.then((response) => {
				showNotification('File deleted', 'File deleted Successfully', 'success');
				setRefreshLands(refreshLands + 1);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const printReportI = (dataa, docType) => {
		GeneratePDF(dataa, docType);
	};

	const [state, setState] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus('xl');
		setFullScreenStatus(null);
		setAnimationStatus(true);
		setHeaderCloseStatus(true);
	};

	const [MpuzaOptions, setMpuzaOptions] = useState([]);

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

	const [deletingFileId, setDeletingFileId] = useState([]);
	const [deletingFileNumber, setDeletingFileNumber] = useState([]);
	const [deletingFileName, setDeletingFileName] = useState([]);

	const [count, setCount] = useState(0);
	const [isLoadingEdit, setIsLoadingEdit] = useState(false);
	const [lastSaveEdit, setLastSaveEdit] = useState(null);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);
	const [lastSaveDelete, setLastSaveDelete] = useState(null);

	return (
		<PageWrapper>
			{/* title={componentsMenu.components.subMenu.table.text} */}
			{/* <SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{
								title: componentsMenu.components.text,
								to: `/${componentsMenu.components.path}`,
							},
							{
								title: componentsMenu.components.subMenu.table.text,
								to: `/${componentsMenu.components.subMenu.table.path}`,
							},
						]}
					/>
				</SubHeaderLeft>
			</SubHeader> */}

			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Person Role List</CardTitle>
								</CardLabel>
							</CardHeader>

							<CardBody>
								<div className='row g-4'>
									{/* <div className='row g-4'>
										<h4>Filter</h4>
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
									</div> */}
									{/* <div className='col-md-3'>
										<Input
											id='searchFileNo'
											type='number' min='0' onWheel={(e) => e.target.blur()}
											onChange={(e) => {
												setSearchNo(e.target.value);
											}}
											value={searchNo}
											validFeedback='Looks good!'
										/>
									</div> */}
									<div className='col-md-3'>
										<AddRole />
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
												id{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('firstName')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('FileNo')}
												className='cursor-pointer text-decoration-underline'>
												Name{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('FileNo')}
													icon='FilterList'
												/>
											</th>

											<th
												onClick={() => requestSort('mouza_id')}
												className='cursor-pointer text-decoration-underline'>
												Email{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('mouza_id')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('mouza_id')}
												className='cursor-pointer text-decoration-underline'>
												Role{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('mouza_id')}
													icon='FilterList'
												/>
											</th>

											{/* <th className='cursor-pointer text-decoration-underline'>
												Status{' '}
											</th> */}
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
													<td>{item.id}</td>
													<td>{item.name}</td>

													<td> {item.email}</td>

													<td>{item.role.role}</td>
													{/* <td>
														{moment(item.purchase_date).format(
															'DD-MM-YY',
														)}
													</td> */}

													{/* <td>
													
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
																				approveFile(
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
													
													</td> */}
													<td>
														<ButtonGroup>
															<Button
																isOutline
																color='primary'
																isDisable={
																	item.isApproved === 1 ||
																	isLoadingEdit
																}
																// isLight={darkModeStatus}
																className={classNames(
																	'text-nowrap',
																	{
																		'border-light': true,
																	},
																)}
																icon={isLoadingEdit ? null : 'Edit'}
																// onClick={() => editLand(item.id)}
															>
																{isLoadingEdit && (
																	<Spinner isSmall inButton />
																)}
																{isLoadingEdit
																	? (lastSaveEdit && 'Loading') ||
																	  'Loading'
																	: (lastSaveEdit && 'Edit') ||
																	  'Edit'}
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
																// onClick={() => {
																// 	setDeletingFileId(item.id);
																// 	setDeletingFileNumber(
																// 		item.FileNo,
																// 	);
																// 	setDeletingFileName(
																// 		item.file_name,
																// 	);

																// 	initialStatusDelete();

																// 	setStateDelete(true);
																// 	setStaticBackdropStatusDelete(
																// 		false,
																// 	);
																// }}
															>
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
																			color='primary'
																			// isLight={darkModeStatus}
																			className={classNames(
																				'text-nowrap',
																				{
																					'border-light': true,
																				},
																			)}
																			icon='Preview'
																			onClick={() =>
																				printReportI(
																					items,
																					2,
																				)
																			}>
																			View File Report
																		</Button>
																	</DropdownItem>
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
																			icon='FilePdfFill'
																			onClick={() =>
																				printReportI(
																					items,
																					1,
																				)
																			}>
																			Save File Report
																		</Button>
																	</DropdownItem>
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
							<ModalTitle id='exampleModalLabel'>Registry Files</ModalTitle>
						</ModalHeader>
						<ModalBody>
							<div className='row g-4'>
								<div className='col-12'>
									<Card>
										<CardBody>
											<Accordion
												id='RegistryFilesAccordian'
												activeItemId={false}
												shadow='lg'>
												{MpuzaOptions.map((dataFiles, i) => {
													return (
														<AccordionItem
															id={`itemFiles${dataFiles.khasra_no}`}
															title={`${i + 1}: Khasra No: ${
																dataFiles.khasra_no
															}				  `}
															icon='Assignment'>
															<Accordion
																id='RegistryFilesAccordian'
																activeItemId={false}
																shadow='lg'>
																{dataFiles.registries.map(
																	(registries, ii) => {
																		return (
																			<AccordionItem
																				id={`itemRegistry${registries.registry_no}`}
																				title={`${
																					ii + 1
																				}: Files Registry No: ${
																					registries.registry_no
																				}				  `}
																				icon='Assignment'>
																				<div
																					key={
																						registries.registry_no
																					}>
																					<Accordion
																						id={`RegistryFilesInner${ii}`}
																						activeItemId={
																							false
																						}
																						shadow='lg'>
																						<AccordionItem
																							id={`itemRegistry${ii}`}
																							title={`${
																								ii +
																								1
																							}: Registry  No: ${
																								registries.registry_no
																							}				  `}
																							icon='Assignment'>
																							<img
																								src={`${registries.registry_file}`}
																								alt={`Registry No:${registries.registry_no}`}
																							/>
																						</AccordionItem>
																						<AccordionItem
																							id={`itemFard${registries.fard_number}`}
																							title={`${
																								ii +
																								1
																							}: Fard  No: ${
																								registries.fard_number
																							}				  `}
																							icon='Assignment'>
																							<img
																								src={`${registries.fard_file_path}`}
																								alt={`Fard No:${registries.fard_number}`}
																							/>
																						</AccordionItem>
																						<AccordionItem
																							id={`itemInteqal${registries.inteqal_number}`}
																							title={`${
																								ii +
																								1
																							}: Inteqal  No: ${
																								registries.inteqal_number
																							}				  `}
																							icon='Assignment'>
																							<img
																								src={`${registries.int_file_path}`}
																								alt={`Inteqal No:${registries.inteqal_number}`}
																							/>
																						</AccordionItem>
																					</Accordion>
																				</div>
																			</AccordionItem>
																		);
																	},
																)}
															</Accordion>
														</AccordionItem>
													);
												})}
											</Accordion>
										</CardBody>
										<CardFooter>
											<CardFooterLeft />
											<CardFooterRight>
												{/* <Button
										icon='Save'
										type='submit'
										color='primary'
										isDisable={
											!formikAddPurchaser.isValid &&
											!!formikAddPurchaser.submitCount
										}>
										Save changes
									</Button> */}
											</CardFooterRight>
										</CardFooter>
									</Card>
								</div>
							</div>
						</ModalBody>
						<ModalFooter />
					</Modal>
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
											Deletion Confirmation File# {deletingFileNumber}
											<small>File Name: {deletingFileName}</small>
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
												Are you sure you want to delete File #{' '}
												{deletingFileNumber}? This cannot be undone!
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
													onClick={() => deleteFile(deletingFileId)}>
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
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;
