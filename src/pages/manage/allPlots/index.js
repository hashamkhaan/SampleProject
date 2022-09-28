// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
// eslint-disable-next-line eslint-comments/disable-enable-pair

import React, { useEffect, useState } from 'react';
import Axios from 'axios';

// ** Axios Imports

import baseURL from '../../../baseURL/baseURL';
import Button from '../../../components/bootstrap/Button';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Input from '../../../components/bootstrap/forms/Input';

import Card, {
	CardBody,
	CardHeader,
	CardActions,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import AddPlots from './AddPlots';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import ViewPlots from './ViewPlots';
import AddOpenPlots from './AddOpenPlots';

export const searchByOptions = [
	{ value: 1, text: 'Reg No' },
	{ value: 2, text: 'Plot no' },
	{ value: 3, text: 'File No' },
];
export const blockOptions = [
	{ value: 0, text: 'All' },
	{ value: 1, text: 'Umar Block' },
	{ value: 2, text: 'Ali Block' },
];
export const typeOptions = [
	{ value: 1, text: 'All' },
	{ value: 2, text: 'Residential' },
	{ value: 3, text: 'Commercial' },
];
export const isOpenOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Non Balloted' },
	{ value: 0, text: 'Balloted' },
];
export const isBookedOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Booked' },
	{ value: 0, text: 'Not booked' },
];
export const isApprovedOptions = [
	{ value: 2, text: 'All' },
	{ value: 1, text: 'Approved' },
	{ value: 0, text: 'Unapproved' },
];

const TablePage = () => {
	const [searchNo, setSearchNo] = useState('');
	const [amountTotal, setAmountTotal] = useState(0);
	const [searchBy, setSearchBy] = useState('1');

	const [tableData, setTableData] = useState([]);
	const [tableDataLoading, setTableDataLoading] = useState(true);

	const [blockOptionsSelected, setBlockOptionsSelected] = useState({
		value: '0',
		text: 'All',
	});
	const [typeOptionsSelected, setTypeOptionsSelected] = useState({ value: '1', text: 'All' });
	const [isOpenOptionsSelected, setIsOpenOptionsSelected] = useState({ value: '2', text: 'All' });
	const [isApprovedOptionsSelected, setIsApprovedOptionsSelected] = useState({
		value: '2',
		text: 'All',
	});
	const [isBookedOptionsSelected, setIsBookedOptionsSelected] = useState({
		value: '2',
		text: 'All',
	});

	useEffect(() => {
		refreshTableData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		blockOptionsSelected,
		isOpenOptionsSelected,
		typeOptionsSelected,
		isApprovedOptionsSelected,
		isBookedOptionsSelected,
	]);

	const refreshTableData = () => {
		setTableDataLoading(true);
		Axios.get(
			`${baseURL}/getPlots?block_id=${
				blockOptionsSelected.value !== '0' ? blockOptionsSelected.value : ''
			}&plot_type=${
				// eslint-disable-next-line no-nested-ternary
				typeOptionsSelected.value !== '1'
					? typeOptionsSelected.value === '2'
						? 'Residential'
						: 'Commercial'
					: ''
			}
				&is_open=${isOpenOptionsSelected.value !== '2' ? isOpenOptionsSelected.value : ''}
				&isApproved=${isApprovedOptionsSelected.value !== '2' ? isApprovedOptionsSelected.value : ''}
				&is_booked=${isBookedOptionsSelected.value !== '2' ? isBookedOptionsSelected.value : ''}
				`,
		)
			.then((response) => {
				setTableData(response.data.plots);
				let amount = 0;
				const calc = response.data.plots.forEach((item) => {
					amount += item.price;
				});

				setAmountTotal(parseFloat(Math.abs(amount)));
				setTableDataLoading(false);
			})
			.catch((err) => console.log(err));
	};

	const searchFilterTrigger = () => {
		setTableDataLoading(true);

		Axios.get(`${baseURL}/getPlots?${searchBy === '1' && `reg_no=${searchNo}`}`)
			.then((response) => {
				setTableData(response.data.plots);
				let amount = 0;
				const calc = response.data.plots.forEach((item) => {
					amount += item.price;
				});

				setAmountTotal(parseFloat(Math.abs(amount)));
				setTableDataLoading(false);
			})
			.catch((err) => console.log(err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	};

	return (
		<PageWrapper>
			<Page>
				<div className='row'>
					<div className='col-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Assignment'>
									<CardTitle>Plots List</CardTitle>
								</CardLabel>
								<CardActions>
									<AddPlots refreshTableData={refreshTableData} />

									<AddOpenPlots refreshTableData={refreshTableData} />
								</CardActions>
							</CardHeader>
							<CardBody>
								<br />
								<div className='row g-4'>
									<FormGroup className='col-md-2' label='Block'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setBlockOptionsSelected({
													value: e.target.value,
												});
											}}
											value={blockOptionsSelected.value}
											list={blockOptions}
										/>
									</FormGroup>
									<FormGroup className='col-md-2' label='Type'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setTypeOptionsSelected({
													value: e.target.value,
												});
											}}
											value={typeOptionsSelected.value}
											list={typeOptions}
										/>
									</FormGroup>
									<FormGroup className='col-md-2' label='Category'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setIsOpenOptionsSelected({
													value: e.target.value,
												});
											}}
											value={isOpenOptionsSelected.value}
											list={isOpenOptions}
										/>
									</FormGroup>
									<FormGroup className='col-md-2' label='Approval Status'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setIsApprovedOptionsSelected({
													value: e.target.value,
												});
											}}
											value={isApprovedOptionsSelected.value}
											list={isApprovedOptions}
										/>
									</FormGroup>
									<FormGroup className='col-md-2' label='Booking status'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setIsBookedOptionsSelected({
													value: e.target.value,
												});
											}}
											value={isBookedOptionsSelected.value}
											list={isBookedOptions}
										/>
									</FormGroup>
								</div>
								<br />
								<div className='row g-4'>
									<div className='col-md-2'>
										<Select
											ariaLabel='Default select example'
											placeholder='Open this select menu'
											onChange={(e) => {
												setSearchBy(e.target.value);
											}}
											value={searchBy}
											list={searchByOptions}
										/>
									</div>
									<div className='col-md-2'>
										<Input
											id='searchFileNo'
											type='text'
											onChange={(e) => {
												setSearchNo(e.target.value);
											}}
											value={searchNo}
											validFeedback='Looks good!'
										/>
									</div>
									<div className='col-md-2'>
										<Button
											color='primary'
											onClick={() => searchFilterTrigger()}
											isOutline
											// isDisable={landsViewLoading}
											isActive>
											Search
										</Button>
									</div>
								</div>
								<br />
							</CardBody>
							<ViewPlots
								tableData={tableData}
								amountTotal={amountTotal}
								refreshTableData={refreshTableData}
								tableDataLoading={tableDataLoading}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrap