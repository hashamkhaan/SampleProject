// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import classNames from 'classnames';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import AddAccount from './modals/AddAccount';

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
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../components/PaginationButtons';
import useSelectTable from '../../../hooks/useSelectTable';

import Icon from '../../../components/icon/Icon';
import Heads from './Heads';
import GenerateDepreciation from './generateDepreciation';

const TablePage = () => {
	const [activeFilterSubGroupsOptions, setActiveFilterSubGroupsOptions] = useState([
		{ id: 1, value: 1, label: 'All' },
		{ id: 2, value: 2, label: 'Active' },
		{ id: 3, value: 3, label: 'Inactive' },
	]);
	const [activeFilterSubGroupsSelected, setActiveFilterSubGroupsSelected] = useState({
		id: 2,
		value: 2,
		label: 'Active',
	});
	const [activeFilterAccountsSelected, setActiveFilterAccountsSelected] = useState({
		id: 2,
		value: 2,
		label: 'Active',
	});

	const [subGroupsOptions, setSubGroupsOptions] = useState('');
	const [subGroupsOptionsLoading, setSubGroupsOptionsLoading] = useState(true);
	const [subGroupsSelected, setSubGroupsSelected] = useState(null);

	const [coaAccountsView, setCoaAccountsView] = useState([]);

	const [coaAccountsViewLoading, setCoaAccountsViewLoading] = useState([]);

	const [refreshAccountsView, setRefreshAccountsView] = useState(0);

	const refreshAccountsHandler = (arg) => {
		setRefreshAccountsView(arg);
	};

	useEffect(() => {
		setCoaAccountsViewLoading(true);

		Axios.get(`${baseURL}/getDepreciableOrNonDepreciableAccounts?isDepreciable=1`)
			.then((response) => {
				setCoaAccountsView(response.data.coaAccounts);
				setCoaAccountsViewLoading(false);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/coaSubGroupsByGroup?coa_group_id=2`)
			.then((response) => {
				const rec = response.data.coaSubGroups.map(({ id, name, code }) => ({
					id,
					value: id,
					label: `${code}-${name}`,
				}));
				setSubGroupsOptions(rec);
				setSubGroupsOptionsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		setCoaAccountsViewLoading(true);

		Axios.get(
			`${baseURL}/getDepreciableOrNonDepreciableAccounts?isDepreciable=1&sub_group_id=${
				subGroupsSelected !== null ? subGroupsSelected.id : ''
			}`,
		)
			.then((response) => {
				setCoaAccountsView(response.data.coaAccounts);
				setCoaAccountsViewLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subGroupsSelected]);

	return (
		<PageWrapper title='ddd'>
			<Page>
				<div className='row'>
					<div className='col-12'>
						{/* <div className='col-12 mt-5 mb-3'>
							<h3 id='card-hasTab' className='scroll-margin'>
								Manage Accounts subGroups
							</h3>
						</div> */}

						<Card hasTab tabButtonColor='info'>
							<CardTabItem
								id='tab-item-1'
								title='Depreciable Accounts'
								icon='Architecture'>
								<Card shadow='none' className='border-0'>
									<CardHeader className='px-0 pt-0'>
										<CardLabel icon='Engineering' iconColor='danger'>
											<CardTitle>
												Depreciable Accounts <small>Small</small>
											</CardTitle>
											<CardSubTitle>Subtitle</CardSubTitle>
										</CardLabel>
										<CardActions>
											<AddAccount
												setRefreshAccountsView={refreshAccountsHandler}
												refreshAccountsView={refreshAccountsView}
											/>

											<ButtonGroup>
												<Dropdown>
													<DropdownToggle hasIcon={false}>
														<Button
															color='danger'
															isLight
															hoverShadow='default'
															icon='MoreVert'
														/>
													</DropdownToggle>
													<DropdownMenu isAlignmentEnd>
														<DropdownItem isHeader>
															Other Actions
														</DropdownItem>
														<DropdownItem>
															{/* <NavLink to='/components/popovers'>
																			<Icon icon='Send' />{' '}
																			Popover
																		</NavLink> */}
															Other Actions 2
														</DropdownItem>
													</DropdownMenu>
												</Dropdown>
											</ButtonGroup>
										</CardActions>
									</CardHeader>
									<CardBody className='px-0'>
										<div className='row g-4'>
											<div className='col-md-3'>
												<FormGroup label='Sub Group' id='subGroup'>
													<Select
														className='col-md-11'
														isClearable
														classNamePrefix='select'
														options={subGroupsOptions}
														isLoading={subGroupsOptionsLoading}
														value={subGroupsSelected}
														onChange={(val) => {
															setSubGroupsSelected(val);
														}}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup label='FIlter' id='filter'>
													<Select
														className='col-md-11'
														classNamePrefix='select'
														options={activeFilterSubGroupsOptions}
														value={activeFilterAccountsSelected}
														onChange={(val) => {
															setActiveFilterAccountsSelected(val);
														}}
													/>
												</FormGroup>
											</div>
										</div>
										<div className='row'>
											<div className='col-12'>
												<Card>
													{/* <CardHeader>
																<CardLabel icon='Assignment'>
																	<CardTitle>Accounts</CardTitle>
																</CardLabel>
															</CardHeader> */}
													<Heads
														coaAccountsView={coaAccountsView}
														setRefreshAccountsView={
															refreshAccountsHandler
														}
														refreshAccountsView={refreshAccountsView}
														coaAccountsViewLoading={
															coaAccountsViewLoading
														}
													/>
												</Card>
											</div>
										</div>
									</CardBody>
									<CardFooter className='px-0 pb-0'>
										<CardFooterLeft>
											<Button color='info' isOutline icon='DocumentScanner'>
												Action
											</Button>
										</CardFooterLeft>
										<CardFooterRight>
											<Button color='info' icon='CleaningServices'>
												Other Action
											</Button>
										</CardFooterRight>
									</CardFooter>
								</Card>
							</CardTabItem>
							<CardTabItem
								id='tab-item-2'
								title='Generate Depreciation'
								icon='Architecture'>
								<GenerateDepreciation />
							</CardTabItem>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;
