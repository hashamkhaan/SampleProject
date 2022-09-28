// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
import React from 'react';
import { useFormik } from 'formik';

import { useSelector } from 'react-redux';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Label from '../../../components/bootstrap/forms/Label';
import Input from '../../../components/bootstrap/forms/Input';
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Select from '../../../components/bootstrap/forms/Select';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import Textarea from '../../../components/bootstrap/forms/Textarea';
import Button from '../../../components/bootstrap/Button';
import NewPaymentRepeater from './NewPaymentRepeater';
import ViewPaymentsRecords from './modals/ViewPaymentsRecords';

const validate = (values) => {
	const errors = {};

	return errors;
};

const ValidationPage = () => {
	const store = useSelector((state) => state.purchaseLand);
	const getTotalLandinMarla = (khasraLand) => {
		let totalmarlas = 0;
		khasraLand.forEach((data) => {
			totalmarlas += parseFloat(data.kanal > 0 ? data.kanal : 0) * 20;
			totalmarlas += parseFloat(data.marla > 0 ? data.marla : 0);
			totalmarlas += parseFloat(data.sarsai > 0 ? data.sarsai : 0) / 9;
			totalmarlas += parseFloat(data.feet > 0 ? data.feet : 0) * 0.00367309;
		});

		return totalmarlas.toFixed(2);
	};
	// store.data.form1.rate_per_marla
	const getRatePerMarla = (ratePerMarla) => {
		return parseFloat(ratePerMarla > 0 ? ratePerMarla : 0).toFixed(2);
	};

	// store.data.stages[0].amount
	const getBayanaAmount = (data) => {
		if (data.stages.length > 0) {
			// eslint-disable-next-line no-console

			if (data.stages[0].amount !== undefined && data.stages[0].amount !== 0) {
				return parseFloat(data.stages[0].amount > 0 ? data.stages[0].amount : 0).toFixed(2);
			}
		}

		return 0;
	};
	const getRemainingAmount = (data) => {
		return (
			getTotalLandinMarla(data.khasra_record) * getRatePerMarla(data.form1.rate_per_marla) -
			getBayanaAmount(data)
		).toFixed(2);
	};
	const formik = useFormik({
		initialValues: {},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div className='row'>
			<div className='col-12'>
				<CardBody>
					<div className='mx-auto' style={{ width: 300 }}>
						<CardHeader>
							<CardLabel>
								<CardTitle>Make New Payments </CardTitle>
							</CardLabel>
						</CardHeader>
					</div>
					<div className='row g-4'>
						<NewPaymentRepeater />
					</div>
					{/* <div className='mx-auto' style={{ width: 200 }}>
						<CardHeader>
							<CardLabel>
								<CardTitle>Payments Details </CardTitle>
							</CardLabel>
						</CardHeader>
					</div>
					<div className='row g-4'>
						<FormGroup className='col-md-3' label='	Total Amount'>
							<InputGroup>
								<InputGroupText id='inputGroupPrepend'>PKR</InputGroupText>
								<Input
									readOnly
									id='validationtotal_amount'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// value={(
									// 	getTotalLandinMarla(store.data.khasra_record) *
									// 	getRatePerMarla(store.data.form1.rate_per_marla)
									// ).toFixed(2)}
									value={store.data.form1.totalPrice}
								/>
							</InputGroup>
						</FormGroup>
						<FormGroup className='col-md-6' label='Paid Amount'>
							<InputGroup>
								<InputGroupText id='inputGroupPrepend'>PKR</InputGroupText>
								<Input
									readOnly
									id='validationpaid_amount'
									onBlur={formik.handleBlur}
									value={getBayanaAmount(store.data)}
									// -more saved payemts at time of edit
								/>
								<ViewPaymentsRecords />
							</InputGroup>
						</FormGroup>
						<FormGroup className='col-md-3' label='Remaining Amount'>
							<InputGroup>
								<InputGroupText id='inputGroupPrepend'>PKR</InputGroupText>
								<Input
									readOnly
									id='validationremaining_amount'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// value={
									// 	getRemainingAmount(store.data)

									// 	// -more saved payemts at time of edit
									// }
									value={
										store.data.form1.totalPrice - getBayanaAmount(store.data)
									}
								/>
							</InputGroup>
						</FormGroup>
					</div> */}
				</CardBody>
				<CardFooter>
					<CardFooterLeft>
						{/* <Button type='reset' color='info' isOutline onClick={formik.resetForm}>
							Reset
						</Button> */}
					</CardFooterLeft>
					<CardFooterRight>
						{/* <Button
								type='submit'
								color='primary'
								isDisable={!formik.isValid && !!formik.submitCount}>
								Submit form
							</Button> */}
					</CardFooterRight>
				</CardFooter>
			</div>
		</div>
	);
};

export default ValidationPage;
