// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import AddEmployee from './addEmployee';
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

import ViewEmployees from './viewEmployees';

const TablePage = () => {
	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);
	const [refreshTableRecords, setRefreshTableRecords] = useState(0);

	const [departmentsOptions, setDepartmentsOptions] = useState([]);
	const [departmentsOptionsLoading, setDepartmentsOptionsLoading] = useState(true);
	const [departmentSelected, setDepartmentSelected] = useState(null);

	const [activeInactiveOptionSelected, setActiveInactiveOptionSelected] = useState({
		id: 1,
		value: 1,
		label: 'Active',
	});

	const refreshTableRecordsHandler = (arg) => {
		setRefreshTableRecords(arg);
	};

	const activeInactiveOptions = [
		{
			id: 1,
			value: 1,
			label: 'Active',
		},
		{
			id: 2,
			value: 2,
			label: 'Inactive',
		},
		{
			id: 3,
			value: 3,
			label: 'All',
		},
	];
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(`${baseURL}/getEmployees`)
			.then((response) => {
				setTableRecords(response.data.employees);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getDepartments`)
			.then((response) => {
				const rec = response.data.departments.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setDepartmentsOptions(rec);
				setDepartmentsOptionsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [refreshTableRecords]);
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(
			`${baseURL}/getEmployees?department_id=${
				departmentSelected !== null ? departmentSelected.id : ''
			}`,
		)
			.then((response) => {
				setTableRecords(response.data.employees);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [departmentSelected]);

	return (
		<PageWrapper>
			<Page>
				<Card shadow='none' className='border-0'>
					<CardHeader className='px-0 pt-0'>
						<CardLabel icon='Person' iconColor='danger'>
							<CardTitle>
								Employees <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<AddEmployee
								refreshTableRecordsHandler={refreshTableRecordsHandler}
								refreshTableRecords={refreshTableRecords}
								tableRecordsLoading={tableRecordsLoading}
								tableRecords={tableRecords}
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
						</CardActions>
					</CardHeader>
					<CardBody className='px-0'>
						<>
							<div className='row g-4'>
								<div className='col-md-3'>
									<FormGroup label='Department' id='mainGroup'>
										<Select
											className='col-md-11'
											isClearable
											classNamePrefix='select'
											options={departmentsOptions}
											isLoading={departmentsOptionsLoading}
											value={departmentSelected}
											onChange={(val) => {
												console.log(':::', val);
												setDepartmentSelected(val);
											}}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup label='Active/Inactive' id='filter'>
										<Select
											className='col-md-11'
											classNamePrefix='select'
											options={activeInactiveOptions}
											value={activeInactiveOptionSelected}
											onChange={(val) => {
												setActiveInactiveOptionSelected(val);
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
																	<CardTitle>
																		Accounts Subgroups
																	</CardTitle>
																</CardLabel>
															</CardHeader> */}

										<ViewEmployees
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
