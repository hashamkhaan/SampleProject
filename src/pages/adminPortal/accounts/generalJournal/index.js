// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import { componentsMenu } from '../../../../menu';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardTitle,
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

import Select from '../../../../components/bootstrap/forms/Select';

export const _selectOptions = [
	{ value: 1, text: 'Voucher No' },
	// { value: 2, text: 'Mutation No' },
	// { value: 3, text: 'Khasra No' },
];

const DashboardPage = () => {
	const [searchNo, setSearchNo] = useState('');

	const [searchBy, setSearchBy] = useState('1');
	useEffect(() => {
		Axios.get(`${baseURL}/getGeneralJournal`)
			.then((response) => {
				setLandsView(response.data.data);
				//   setLoading(false)
			})
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		const getAllLands = () => {
			Axios.get(`${baseURL}/getGeneralJournal`)
				.then((response) => {
					setLandsView(response.data.data);
					//   setLoading(false)
				})
				.catch((err) => console.log(err));
		};

		if (searchNo === '') {
			getAllLands();
		} else if (searchBy === '1') {
			getAllLands();
			// getLandsbyFileNo();
		} else if (searchBy === '2') {
			// getLandsbyMutationNo();
		} else if (searchBy === '3') {
			// getLandsbyKhasraNo();
		}
	}, [searchBy, searchNo]);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [landsView, setLandsView] = useState([]);
	const [printreport, setPrintreport] = useState([]);

	// const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const { items, requestSort, getClassNamesFor } = useSortableData(landsView);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const { selectTable, SelectAllCheck } = useSelectTable(onCurrentPageData);

	const printReportI = (id) => {
		Axios.get(`${baseURL}/printLand?land_id=${id}`)
			.then((response) => {
				setPrintreport(response.data.land_details);
				//   setLoading(false)

				// showNotification('Printing Reports', 'Printing 2 reports Successfully', 'success');
			})
			.catch((err) => {
				console.log(err);
				showNotification('Error', err, 'danger');
			});
	};
	return (
		<PageWrapper title={componentsMenu.components.subMenu.table.text}>
			<SubHeader>
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
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>General Journal</CardTitle>
								</CardLabel>
							</CardHeader>

							<CardBody>
								<div className='row g-4'>
									<div className='row g-4'>
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
												onClick={() => requestSort('voucher_id')}
												className='cursor-pointer text-decoration-underline'>
												voucher_id{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('voucher_id')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												voucher_number{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												coa_account{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												description{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												credit{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												debit{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
											</th>
											{/* <th
												onClick={() => requestSort('file_no')}
												className='cursor-pointer text-decoration-underline'>
												Balance{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('file_no')}
													icon='FilterList'
												/>
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
												<td>{item.voucher_id}</td>
												<td>
													{item.voucher_number &&
														item.voucher_number.voucher_no}
												</td>
												<td>{item.coa_account.name}</td>
												<td>{item.description}</td>
												<td>{item.debit}</td>
												<td>{item.credit}</td>
												{/* <td>{item.balance}</td> */}

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
																		// onClick={handleUpcomingEdit}
																	>
																		View
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
																		icon='Print'
																		// onClick={() => printReportI(item.id)}
																	>
																		Print
																	</Button>
																</DropdownItem>
															</DropdownMenu>
														</Dropdown>
													</ButtonGroup>
												</td>
											</tr>
										))}
									</tbody>
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

export default DashboardPage;
