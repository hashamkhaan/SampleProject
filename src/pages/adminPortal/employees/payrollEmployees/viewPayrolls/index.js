// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import moment from 'moment';

// eslint-disable-next-line import/order
import FormGroup from '../../../../../components/bootstrap/forms/FormGroup';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';
import monthSelectPlugin from 'flatpickr/dist/plugins/monthSelect';

import Page from '../../../../../layout/Page/Page';
import PageWrapper from '../../../../../layout/PageWrapper/PageWrapper';

import Button, { ButtonGroup } from '../../../../../components/bootstrap/Button';
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
} from '../../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../../../baseURL/baseURL';

import ViewEmployees from './viewEmployees';

const TablePage = () => {
	const [dateForPayroll, setDateForPayroll] = useState(moment().format('MM/YY'));

	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);
	const [refreshTableRecords, setRefreshTableRecords] = useState(0);

	const [departmentsOptions, setDepartmentsOptions] = useState([]);
	const [departmentsOptionsLoading, setDepartmentsOptionsLoading] = useState(true);
	const [departmentSelected, setDepartmentSelected] = useState(null);

	const refreshTableRecordsHandler = (arg) => {
		setRefreshTableRecords(arg);
	};

	useEffect(() => {
		setDepartmentsOptionsLoading(true);

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
	}, []);
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(`${baseURL}/getPayRoles?month=${dateForPayroll}`)
			.then((response) => {
				setTableRecords(response.data.salarySlips);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [dateForPayroll]);
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(
			`${baseURL}/getPayRoles?month=${dateForPayroll}&department_id=${
				departmentSelected !== null ? departmentSelected.id : ''
			}`,
		)
			.then((response) => {
				setTableRecords(response.data.salarySlips);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
								<FormGroup label='Month' className='col-md-3'>
									<Flatpickr
										className='form-control'
										value={dateForPayroll}
										// eslint-disable-next-line react/jsx-boolean-value

										options={{
											minDate: '2022-09-1',
											maxDate: 'today',
											plugins: [
												// eslint-disable-next-line new-cap
												new monthSelectPlugin({
													shorthand: true,
													dateFormat: 'm/y',
													allowInput: true,
												}),
											],
										}}
										onChange={(date, dateStr) => {
											setDateForPayroll(dateStr);
										}}
										onClose={(date, dateStr) => {
											setDateForPayroll(dateStr);
										}}
										id='default-picker'
									/>
								</FormGroup>
								<FormGroup label='Department' className='col-md-3' id='mainGroup'>
									<Select
										className='col-md-12'
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
