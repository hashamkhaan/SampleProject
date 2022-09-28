// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import SelectReact from 'react-select';
import { componentsMenu } from '../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Spinner from '../../../components/bootstrap/Spinner';
import Button, { ButtonGroup } from '../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
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
import Select from '../../../components/bootstrap/forms/Select';
import Input from '../../../components/bootstrap/forms/Input';
import showNotification from '../../../components/extras/showNotification';
import GeneratePDF from './printKhasraReport';

export const _selectOptions = [{ value: 1, text: 'Khasra No' }];

const TablePage = () => {
	const [searchNo, setSearchNo] = useState('');

	const [mouza_options, setmouza_options] = useState([]);
	const [mouzaOptionsSelected, setMouzaOptionsSelected] = useState(null);
	const [mouzaOptionsLoading, setMouzaOptionsLoading] = useState(true);

	const [searchBy, setSearchBy] = useState('1');
	const [khasrasView, setKhasrasView] = useState([]);
	const [khasrasViewLoading, setKhasrasViewLoading] = useState(true);
	useEffect(() => {
		setKhasrasViewLoading(true);
		Axios.get(`${baseURL}/getPurchasedKhasraLand`)
			.then((response) => {
				setKhasrasView(response.data.TotalPurchasedLand);
				setKhasrasViewLoading(false);
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

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);

	// const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const { items, requestSort, getClassNamesFor } = useSortableData(khasrasView);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const searchFilterTrigger = () => {
		setKhasrasViewLoading(true);
		const getPurchasedKhasraLandByKhasraNo = () => {
			Axios.get(`${baseURL}/getPurchasedKhasraLand?khasra_no=${searchNo}`)
				.then((response) => {
					setKhasrasView(response.data.TotalPurchasedLand);
					setKhasrasViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getAllPurchasedKhasraLand = () => {
			Axios.get(`${baseURL}/getPurchasedKhasraLand`)
				.then((response) => {
					setKhasrasView(response.data.TotalPurchasedLand);
					setKhasrasViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		if (searchNo === '') {
			getAllPurchasedKhasraLand();
		} else if (searchBy === '1') {
			getPurchasedKhasraLandByKhasraNo();
		}
	};
	useEffect(() => {
		setKhasrasViewLoading(true);
		const getKhasraRecordsByMouza = () => {
			Axios.get(`${baseURL}/getPurchasedKhasraLand?mouza_id=${mouzaOptionsSelected.id}`)
				.then((response) => {
					setKhasrasView(response.data.TotalPurchasedLand);
					setKhasrasViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		const getAllPurchasedKhasraLand = () => {
			Axios.get(`${baseURL}/getPurchasedKhasraLand`)
				.then((response) => {
					setKhasrasView(response.data.TotalPurchasedLand);
					setKhasrasViewLoading(false);
				})
				.catch((err) => console.log(err));
		};
		if (mouzaOptionsSelected !== null) {
			getKhasraRecordsByMouza();
		} else {
			getAllPurchasedKhasraLand();
		}
	}, [mouzaOptionsSelected]);

	const printReportI = (id, docType) => {
		Axios.get(`${baseURL}/getKhasraOverallDetails?khasra_no=${id}`)
			.then((response) => {
				GeneratePDF(response.data.data, id, docType);

				showNotification(
					'Printing Khasra Report',
					'Printing  report Successfully',
					'success',
				);
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
									<CardTitle>All Khasras Record</CardTitle>
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
											isDisable={khasrasViewLoading}
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
												onClick={() => requestSort('Serial_No')}
												className='cursor-pointer text-decoration-underline'>
												Serial_No{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('Serial_No')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('khasra_no')}
												className='cursor-pointer text-decoration-underline'>
												khasra_no{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('khasra_no')}
													icon='FilterList'
												/>
											</th>
											{/* <th
												onClick={() => requestSort('T_kanal')}
												className='cursor-pointer text-decoration-underline'>
												T_Kanal{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('T_Kanal')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('T_Marla')}
												className='cursor-pointer text-decoration-underline'>
												T_Marla{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('T_Marla')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('T_sarsai')}
												className='cursor-pointer text-decoration-underline'>
												T_sarsai{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('T_sarsai')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('T_feet')}
												className='cursor-pointer text-decoration-underline'>
												T_feet{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('T_feet')}
													icon='FilterList'
												/>
											</th> */}
											<th
												onClick={() => requestSort('Total Land')}
												className='cursor-pointer text-decoration-underline'>
												Total Land <br /> (k-m-s-f){' '}
												<Icon
													size='lg'
													className={getClassNamesFor('Total Land')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('Purchasing Land ')}
												className='cursor-pointer text-decoration-underline'>
												Purchasing Land <br /> (k-m-s-f){' '}
												<Icon
													size='lg'
													className={getClassNamesFor('Purchasing Land ')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('Cleared Land')}
												className='cursor-pointer text-decoration-underline'>
												Cleared Land
												<Icon
													size='lg'
													className={getClassNamesFor('Cleared Land')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('Remaining Land')}
												className='cursor-pointer text-decoration-underline'>
												Remaining Land
												<Icon
													size='lg'
													className={getClassNamesFor('Remaining Land')}
													icon='FilterList'
												/>
											</th>

											<th
												onClick={() => requestSort('Bakhana Malkiyyat')}
												className='cursor-pointer text-decoration-underline'>
												Bakhana Malkiyyat <br /> (k-m-s-f){' '}
												<Icon
													size='lg'
													className={getClassNamesFor(
														'Bakhana Malkiyyat',
													)}
													icon='FilterList'
												/>
											</th>

											<th
												onClick={() => requestSort('Category')}
												className='cursor-pointer text-decoration-underline'>
												Remarks{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('Category')}
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
									{khasrasViewLoading ? (
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
													<td>{item.id}</td>
													<td>{item.khasra_no}</td>

													<td>
														{item.total_land.kanal}-
														{item.total_land.marla}-
														{item.total_land.sarsai}-
														{item.total_land.feet}
													</td>
													<td>
														{item.purchased_land.kanal}-
														{item.purchased_land.marla}-
														{item.purchased_land.sarsai}-
														{item.purchased_land.feet}
													</td>
													<td>
														{item.cleared_land?.kanal}-
														{item.cleared_land?.marla}-
														{item.cleared_land?.sarsai}-
														{item.cleared_land?.feet}
													</td>
													<td>
														{item.remaining_land.kanal}-
														{item.remaining_land.marla}-
														{item.remaining_land.sarsai}-
														{item.remaining_land.feet}
													</td>
													<td>
														{item.bmLand.kanal}-{item.bmLand.marla}-
														{item.bmLand.sarsai}-{item.bmLand.feet}
													</td>

													<td>Done</td>

													<td>
														<ButtonGroup>
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
																					item.khasra_no,
																					2,
																				)
																			}>
																			View Report
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
																					item.khasra_no,
																					1,
																				)
																			}>
																			Save as PDF
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
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;
