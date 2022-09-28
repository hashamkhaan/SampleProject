// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import AddPerson from './AddPerson';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';

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

import baseURL from '../../../../baseURL/baseURL';

import ViewPersons from './ViewPersons';

const TablePage = () => {
	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);

	const [personTypesOptionsSelected, setPersonTypesOptionsSelected] = useState(null);

	const [activeInactiveOptionSelected, setActiveInactiveOptionSelected] = useState({
		id: 1,
		value: 1,
		label: 'Active',
	});

	const personTypesOptions = [
		{ id: 1, person_type_id: 1, value: 1, label: 'Purchaser' },
		{ id: 2, person_type_id: 2, value: 2, label: 'Seller' },
		{ id: 3, person_type_id: 3, value: 3, label: 'Agent' },
		{ id: 4, person_type_id: 4, value: 4, label: 'Client' },
		{ id: 6, person_type_id: 6, value: 6, label: 'Invester' },
	];

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

		Axios.get(`${baseURL}/getPersons`)
			.then((response) => {
				setTableRecords(response.data.persons);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	const refreshTableRecords = () => {
		Axios.get(`${baseURL}/getPersons`)
			.then((response) => {
				setTableRecords(response.data.persons);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(
			`${baseURL}/getPersons?person_type_id=${
				personTypesOptionsSelected !== null ? personTypesOptionsSelected.id : ''
			}`,
		)
			.then((response) => {
				setTableRecords(response.data.persons);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [personTypesOptionsSelected]);

	return (
		<PageWrapper>
			<Page>
				<Card shadow='none' className='border-0'>
					<CardHeader className='px-0 pt-0'>
						<CardLabel icon='Person' iconColor='danger'>
							<CardTitle>
								Persons <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<AddPerson
								refreshTableRecords={refreshTableRecords}
								tableRecordsLoading={tableRecordsLoading}
								tableRecords={tableRecords}
							/>
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
											options={personTypesOptions}
											value={personTypesOptionsSelected}
											onChange={(val) => {
												console.log(':::', val);
												setPersonTypesOptionsSelected(val);
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

										<ViewPersons
											tableRecordsLoading={tableRecordsLoading}
											tableRecords={tableRecords}
											refreshTableRecords={refreshTableRecords}
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
