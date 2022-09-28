// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

// import { Accordion } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Accordion from '../../../components/bootstrap/Accordion';
import FileCreationForm from './FileCreationForm';
import Stages from './Stages';
import Taxes from './Taxes';
import Payments from './Payments';
import ClearedLand from './ClearedLand';
import StagesRegisteries from './StagesRegisteries';

import SubHeader, { SubHeaderLeft } from '../../../layout/SubHeader/SubHeader';

import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import Wizard, { WizardItem } from './Wizard';
import { demoPages } from '../../../menu';
import Card, {
	CardActions,
	CardBody,
	CardCodeView,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
// ** Store & Actions
import {
	updateWholeObject,
	updateForm,
	updatePaymentProperties,
	updateStageProperties,
	updateKhasraInnerProperties,
} from '../redux/purchaseLandStore/index';

const WizardPage = () => {
	const [open, setOpen] = useState(1);
	const [count, setCount] = useState(0);
	const [checkFilesReload, setCheckFilesReload] = useState(0);

	const toggle = (id) => {
		// eslint-disable-next-line no-unused-expressions
		open === id ? setOpen() : setOpen(id);
	};
	const store = useSelector((state) => state.purchaseLand);
	const dispatch = useDispatch();
	const delay = 15;

	useEffect(() => {
		try {
			if ('PurchasingLandDetails' in localStorage) {
				const fetchData = async () => {
					const data = await JSON.parse(
						window.localStorage.getItem('PurchasingLandDetails'),
					);
					dispatch(updateWholeObject(data));
					// dispatch(updateWholeObject(dummyData));
				};
				setCheckFilesReload(checkFilesReload + 1);
				// call the function
				fetchData();
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error, error.message);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		store.data.registries.forEach((data, index) => {
			dispatch(updatePaymentProperties(['', 'registries', index, 'file']));
		});
		store.data.stages.forEach((data, index) => {
			dispatch(updateStageProperties(['', 'stages', index, 'file']));
		});
		store.data.khasra_record.forEach((khasra_record, i) => {
			khasra_record.registries.forEach((registries, index) => {
				dispatch(
					updateKhasraInnerProperties([
						'',
						'khasra_record',
						i,
						'registries',
						index,
						'inteqal_file',
					]),
				);
				dispatch(
					updateKhasraInnerProperties([
						'',
						'khasra_record',
						i,
						'registries',
						index,
						'fard_file',
					]),
				);
			});
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkFilesReload]);
	useEffect(() => {
		try {
			if (store.data !== undefined) {
				const fetchData = async () => {
					const data = await JSON.stringify(store.data);

					window.localStorage.setItem('PurchasingLandDetails', data);
				};

				// call the function
				fetchData();
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error, error.message);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [store]);

	return (
		<PageWrapper title='Purchasing Land File'>
			{/* <SubHeader>
				<SubHeaderLeft>
					<Breadcrumb
						list={[
							{ title: 'Forms', to: '/forms' },
							{ title: 'Wizard', to: '/forms/wizard' },
						]}
					/>
				</SubHeaderLeft>
			</SubHeader> */}
			<Page container='fluid'>
				<Card>
					{/* <CardHeader>
						<CardLabel icon='AutoFixHigh'>
							<CardTitle tag='h2'>
								Purchasing Land File: {store.data.form1.file_no}{' '}
							</CardTitle>
						</CardLabel>
					</CardHeader> */}

					<CardBody>
						<Wizard
							id='1'
							color='primary'
							className='mb-0'
							isHeader='withButton'
							onSubmit={(e) => {
								e.preventDefault();
							}}>
							<WizardItem>
								<FileCreationForm />
							</WizardItem>
							<WizardItem>
								<div className='row g-4'>
									<Stages />
								</div>
							</WizardItem>
							{/* <WizardItem>
								<Payments />
							</WizardItem> */}
							{/* <WizardItem>
								<StagesRegisteries />
							</WizardItem> */}
							<WizardItem>
								<ClearedLand />
							</WizardItem>
							<WizardItem>
								<Taxes />
							</WizardItem>
						</Wizard>
					</CardBody>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default WizardPage;
