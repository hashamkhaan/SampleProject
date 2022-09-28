// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import AddNewLoan from './addNewLoan';
import AddInvestor from '../modals/AddInvestor';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';

import ViewLoan from './viewLoan';

const TablePage = () => {
	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);
	const [refreshTableRecords, setRefreshTableRecords] = useState(0);

	const [investorsOptions, setInvestorsOptions] = useState([]);
	const [investorsOptionsLoading, setInvestorsOptionsLoading] = useState(true);
	const [investorSelected, setInvestorSelected] = useState(null);

	const refreshTableRecordsHandler = (arg) => {
		setRefreshTableRecords(arg);
	};

	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(`${baseURL}/getLoanAmortization`)
			.then((response) => {
				setTableRecords(response.data.loanAmortizations);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getInvestors`)
			.then((response) => {
				const rec = response.data.investors.map(({ person }) => ({
					id: person.id,
					value: person.id,
					label: person.name,
				}));
				setInvestorsOptions(rec);
				setInvestorsOptionsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(`${baseURL}/getLoanAmortization?investor_id=${investorSelected}`)
			.then((response) => {
				setTableRecords(response.data.loanAmortizations);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [investorSelected]);

	return (
		<PageWrapper>
			<Page>
				<Card shadow='none' className='border-0'>
					<CardHeader className='px-0 pt-0'>
						<CardLabel icon='Person' iconColor='danger'>
							<CardTitle>
								Loan Amortization <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<div className='row g-4'>
								<div className='col-auto'>
									<AddInvestor />
								</div>
								<div className='col-auto'>
									<AddNewLoan
										refreshTableRecordsHandler={refreshTableRecordsHandler}
										refreshTableRecords={refreshTableRecords}
										tableRecordsLoading={tableRecordsLoading}
										tableRecords={tableRecords}
									/>
								</div>
								<div className='col-auto'>
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
												<DropdownItem isHeader>Other Actions</DropdownItem>
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
								</div>
							</div>
						</CardActions>
					</CardHeader>
					<CardBody className='px-0'>
						<>
							<div className='row g-4'>
								<div className='col-md-3'>
									<FormGroup label='Investors' id='mainGroup'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											options={investorsOptions}
											isLoading={investorsOptionsLoading}
											value={investorSelected}
											onChange={(val) => {
												setInvestorSelected(val);
											}}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup label='FIlter' id='filter'>
										<Select
											className='col-md-11'
											classNamePrefix='select'
											// options={activeFilterSubGroupsOptions}
											// value={activeFilterSubGroupsSelected}
											// onChange={(val) => {
											// 	setActiveFilterSubGroupsSelected(val);
											// }}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<Card>
										{/* <CardHeader>
																<CardLabel icon='Assignment'>
																	<CardTitle>
																		Accounts Subgroups
																	</CardTitle>
																</CardLabel>
															</CardHeader> */}

										<ViewLoan
											refreshTableRecordsHandler={refreshTableRecordsHandler}
											refreshTableRecords={refreshTableRecords}
											tableRecordsLoading={tableRecordsLoading}
											tableRecords={tableRecords}
										/>
									</Card>
								</div>
							</div>
						</>
					</CardBody>
					<CardFooter className='px-0 pb-0'>
						<CardFooterLeft />
						<CardFooterRight />
					</CardFooter>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default TablePage;
