// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';

import AddKhasra from './AddKhasra';
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

import ViewKhasras from './ViewKhasras';

const TablePage = () => {
	const [tableRecords, setTableRecords] = useState([]);
	const [tableRecordsLoading, setTableRecordsLoading] = useState([]);

	const [mouzaOptions, setMouzaOptions] = useState(null);
	const [mouzaOptionsLoading, setMouzaOptionsLoading] = useState(null);
	const [mouzaOptionsSelected, setMouzaOptionsSelected] = useState(null);

	const [activeInactiveOptionSelected, setActiveInactiveOptionSelected] = useState({
		id: 1,
		value: 1,
		label: 'Active',
	});

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
		setMouzaOptionsLoading(true);

		Axios.get(`${baseURL}/getMouzas`)
			.then((response) => {
				const rec = response.data.mouzas.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setMouzaOptions(rec);
				setMouzaOptionsLoading(false);
			})
			.catch((err) => console.log(err));

		Axios.get(`${baseURL}/getKhasras`)
			.then((response) => {
				setTableRecords(response.data.khasras);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);
	useEffect(() => {
		setTableRecordsLoading(true);

		Axios.get(
			`${baseURL}/getKhasras?mouza_id=${
				mouzaOptionsSelected !== null ? mouzaOptionsSelected.id : ''
			}`,
		)
			.then((response) => {
				setTableRecords(response.data.khasras);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [mouzaOptionsSelected]);

	const refreshTableRecords = () => {
		setTableRecordsLoading(true);

		Axios.get(
			`${baseURL}/getKhasras?mouza_id=${
				mouzaOptionsSelected !== null ? mouzaOptionsSelected.id : ''
			}`,
		)
			.then((response) => {
				setTableRecords(response.data.khasras);
				setTableRecordsLoading(false);
			})
			.catch((err) => console.log(err));
	};
	return (
		<PageWrapper>
			<Page>
				<Card shadow='none' className='border-0'>
					<CardHeader className='px-0 pt-0'>
						<CardLabel icon='Khasra' iconColor='danger'>
							<CardTitle>
								Khasra <small>Small</small>
							</CardTitle>
							<CardSubTitle>Subtitle</CardSubTitle>
						</CardLabel>
						<CardActions>
							<AddKhasra
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
											isLoading={mouzaOptionsLoading}
											classNamePrefix='select'
											options={mouzaOptions}
											value={mouzaOptionsSelected}
											onChange={(val) => {
												console.log(':::', val);
												setMouzaOptionsSelected(val);
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

										<ViewKhasras
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
