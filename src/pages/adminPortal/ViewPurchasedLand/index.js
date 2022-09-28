// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import moment from 'moment';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import SelectReact from 'react-select';
import subDirForNavigation from '../../../baseURL/subDirForNavigation';
import Spinner from '../../../components/bootstrap/Spinner';
import { componentsMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardTitle,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
} from '../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import EVENT_STATUS from '../../../common/data/enumEventStatus';
// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Input from '../../../components/bootstrap/forms/Input';
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';
import Checks from '../../../components/bootstrap/forms/Checks';
import Icon from '../../../components/icon/Icon';
import GeneratePDF from '../purchaseLand/print/ReportI';
import GeneratePDF2 from '../purchaseLand/print/ReportII';
import GeneratePDF3 from '../purchaseLand/print/ReportIII';
import showNotification from '../../../components/extras/showNotification';
import ViewRegistryFiles from './modals/ViewRegistryFiles';
import useDarkMode from '../../../hooks/useDarkMode';

import Select from '../../../components/bootstrap/forms/Select';
// ***********
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

export const _selectOptions = [
	{ value: 1, text: 'File No' },
	{ value: 2, text: 'Mutation No' },
	{ value: 3, text: 'Khasra No' },
];

const TablePage = () => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const navigate = useNavigate();
	const store = useSelector((state) => state.purchaseLand);
	const dispatch = useDispatch();
	const [searchNo, setSearchNo] = useState('');
	const [refreshLands, setRefreshLands] = useState(0);
	const [landsData, setLandsData] = useState([]);

	const [mouza_options, setmouza_options] = useState([]);
	const [mouzaOptionsSelected, setMouzaOptionsSelected] = useState(null);
	const [mouzaOptionsLoading, setMouzaOptionsLoading] = useState(true);

	const [searchBy, setSearchBy] = useState('1');
	useEffect(() => {
		let amount = 0;

		setLandsViewLoading(true);
		Axios.get(`${baseURL}/getLands`)
			.then((response) => {
				setLandsView(response.data.lands);
				const calc = response.data.lands.forEach((item, index) => {
					amount += item.total_price;
				});

				setAmountTotal(parseFloat(Math.abs(amount)));
				setLandsViewLoading(false);
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
	}, []);
	useEffect(() => {
		landsView.file_no = parseInt(landsView.file_no, 2);
		setFileNo(parseInt(landsView.file_no, 2));
	}, [landsView]);
	useEffect(() => {
		let amount = 0;

		setLandsViewLoading(true);
		const getAllLandsByMouza = () => {
			Axios.get(`${baseURL}/getLands?mouza_id=${mouzaOptionsSelected.id}`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getAllLands = () => {
			Axios.get(`${baseURL}/getLands`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};

		if (mouzaOptionsSelected !== null) {
			getAllLandsByMouza();
		} else {
			getAllLands();
		}
	}, [mouzaOptionsSelected]);
	useEffect(() => {
		searchFilterTrigger();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshLands]);

	const searchFilterTrigger = () => {
		let amount = 0;
		setLandsViewLoading(true);
		const getLandsbyFileNo = () => {
			Axios.get(`${baseURL}/getLands?file_no=${searchNo}`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getLandsbyMutationNo = () => {
			Axios.get(`${baseURL}/getLands?file_no=${searchNo}`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getLandsbyKhasraNo = () => {
			Axios.get(`${baseURL}/getLands?khasra_no=${searchNo}`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getAllLands = () => {
			Axios.get(`${baseURL}/getLands`)
				.then((response) => {
					setLandsView(response.data.lands);
					const calc = response.data.lands.forEach((item, index) => {
						amount += item.total_price;
					});

					setAmountTotal(parseFloat(Math.abs(amount)));
					setLandsViewLoading(false);
				})
				.catch((err) => console.log(err));
		};

		// if (mouzaOptionsSelected === null) {
		if (searchNo === '') {
			getAllLands();
		} else if (searchBy === '1') {
			getLandsbyFileNo();
		} else if (searchBy === '2') {
			getLandsbyMutationNo();
		} else if (searchBy === '3') {
			getLandsbyKhasraNo();
		}
	};

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

	const [amountTotal, setAmountTotal] = useState(0);

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
	const printReportI = (id, docType) => {
		Axios.get(`${baseURL}/printLand?land_id=${id}`)
			.then((response) => {
				setPrintreport(response.data.land_details);
				//   setLoading(false)

				GeneratePDF(response.data.land_details, docType);

				showNotification(
					'Printing File Reports',
					'Printing  report Successfully',
					'success',
				);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const printReportII = (id, docType) => {
		Axios.get(`${baseURL}/printLand?land_id=${id}`)
			.then((response) => {
				setPrintreport(response.data.land_details);
				//   setLoading(false)

				GeneratePDF2(response.data.land_details, docType);
				showNotification(
					'Printing Transactions Report',
					'Printing  report Successfully',
					'success',
				);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const printReportIII = (id, docType) => {
		Axios.get(`${baseURL}/getLandTransactions?land_id=${id}`)
			.then((response) => {
				setPrintreport(response.data);
				//   setLoading(false)

				GeneratePDF3(response.data, docType);
				showNotification(
					'Printing Transactions Report',
					'Printing  report Successfully',
					'success',
				);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const editLand = (id) => {
		setIsLoadingEdit(true);
		Axios.get(`${baseURL}/editLand?land_id=${id}`)
			.then((response) => {
				console.log('ddd', response.data);
				const dataEdit = JSON.stringify(response.data);
				window.localStorage.setItem('PurchasingLandDetails', dataEdit);
				setLastSaveEdit(moment());
				navigate(`${subDirForNavigation}adminPortal/lands/editPurchaseLand`);
				setIsLoadingEdit(false);
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	const viewRegstryImages = (id) => {
		Axios.get(`${baseURL}/printLand?land_id=${id}`)
			.then((response) => {
				// setPrintreport(response.data.land_details);
				//   setLoading(false)
				// GeneratePDF(response.data.land_details);
				// GeneratePDF2(response.data.land_details);
				// showNotification('Printing Reports', 'Printing 2 reports Successfully', 'success');
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	// ****************

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

	const getFiles = (file_no) => {
		// eslint-disable-next-line react/destructuring-assignment, react/prop-types
		Axios.get(`${baseURL}/getLandfiles?file_no=${file_no}`)
			.then((response) => {
				const rec = response.data.files.map(({ khasra_no }) => ({
					id: khasra_no,
				}));

				setLandsData(response.data.files);

				//   setLoading(false)
			})
			.catch((err) => console.log(err));
	};
	return (
		<PageWrapper title={componentsMenu.components.subMenu.table.text}>
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
									<CardTitle>Purchased Lands</CardTitle>
								</CardLabel>
							</CardHeader>

							<CardBody>
								<div className='row g-4'>
									<SelectReact
										className='col-md-4'
										isClearable
										classNamePrefix='select'
										options={mouza_options}
										isLoading={mouzaOptionsLoading}
										value={mouzaOptionsSelected}
										onChange={(val) => {
											setMouzaOptionsSelected(val);
											// GetKhasra(val ? val.id : 0);
										}}
									/>

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
											type='number'
											min='0'
											onWheel={(e) => e.target.blur()}
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
												onClick={() => requestSort('mouza.name')}
												className='cursor-pointer text-decoration-underline'>
												Mouza{' '}
												<Icon
													size='lg'
													className={getClassNamesFor(`mouza.id`)}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												File Number{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>

											<th
												onClick={() => requestSort('mouza_id')}
												className='cursor-pointer text-decoration-underline'>
												Khasra{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('mouza_id')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('lastName')}
												className='cursor-pointer text-decoration-underline'>
												Total Land Value{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('rate_per_marla')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('lastName')}
												className='cursor-pointer text-decoration-underline'>
												purchase_date{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('purchase_date')}
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

													<td>{item.mouza.name}</td>

													<td>{item.file_no}</td>
													{/* <td>{item.mutation_no[0].number}</td> */}
													<td>
														{item.khasra_records.map((i) => (
															<h6>
																{i.khasra && i.khasra.khasra_no}
															</h6>
														))}
													</td>

													<td>
														{item.total_price.toLocaleString(
															undefined,
															{
																maximumFractionDigits: 2,
															},
														)}
													</td>
													<td>
														{moment(item.purchase_date).format(
															'DD-MM-YYYY',
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
																onClick={() => editLand(item.id)}>
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
																onClick={() => {
																	setDeletingFileId(item.id);
																	setDeletingFileNumber(
																		item.file_no,
																	);
																	setDeletingFileName(
																		item.file_name,
																	);

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
																					item.id,
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
																					item.id,
																					1,
																				)
																			}>
																			Save File Report
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
																			icon='Preview'
																			onClick={() =>
																				printReportII(
																					item.id,
																					2,
																				)
																			}>
																			View File Transactions
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
																				printReportII(
																					item.id,
																					1,
																				)
																			}>
																			Save File Transactions
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
																			icon='Preview'
																			onClick={() =>
																				printReportIII(
																					item.id,
																					2,
																				)
																			}>
																			View File Transactions
																			(Vouchers)
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
																				printReportIII(
																					item.id,
																					1,
																				)
																			}>
																			Save File Transactions
																			(Vouchers)
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
																			icon='Preview'
																			onClick={() => {
																				getFiles(
																					item.file_no,
																				);
																				initialStatus();

																				setState(true);
																				setStaticBackdropStatus(
																					false,
																				);
																			}}>
																			View Images
																		</Button>
																	</DropdownItem>
																</DropdownMenu>
															</Dropdown>
														</ButtonGroup>
													</td>
													{/* <td>
													<ViewRegistryFiles file_no={item.file_no} />
												</td> */}
												</tr>
											))}
										</tbody>
									)}
									<tr>
										<td />
										<td />
										<td />

										<td>
											<h3 className='d-flex justify-content-end px-4'>
												Total
											</h3>
										</td>

										<td>
											<h3 className='px-0'>
												{amountTotal.toLocaleString(undefined, {
													maximumFractionDigits: 2,
												})}
											</h3>
										</td>
									</tr>
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
												{landsData.map((dataFiles, i) => {
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
