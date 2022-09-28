// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/prop-types */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-const-assign */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/react-in-jsx-scope */

/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable prettier/prettier */
// ** React Imports

import { useState, useContext, useEffect } from 'react';
import { useFormik } from 'formik';
// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather';
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';

// react-flatpickr
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

import {
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	Form,
	Button,
	AccordionHeader,
	AccordionBody,
} from 'reactstrap';
import {
	updateForm,
	updateFormIsValid,
	updateFormDetails,
	// eslint-disable-next-line camelcase
	updateKhasraCleared_land_count,
	updateKhasraInnerProperties,
} from '../redux/purchaseLandStore/index';

// ** Custom Components
import Label from '../../../components/bootstrap/forms/Label';
// ** Reactstrap Imports
import InputGroup, { InputGroupText } from '../../../components/bootstrap/forms/InputGroup';
import Accordion, { AccordionItem } from '../../../components/bootstrap/Accordion';
import Repeater from './stages/repeater/index';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

const validate = (values) => {
	const errors = {};
	if (!values.validationremarks) {
		errors.validationremarks = 'Required';
	} else if (values.validationremarks.length > 15) {
		errors.validationremarks = 'Must be 15 characters or less';
	}

	return errors;
};

const Stages = (props) => {
	// ** Store Variables
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
	// ** State
	const [count, setCount] = useState(1);

	const formik = useFormik({
		initialValues: {
			validationremarks: '',
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
		},
	});

	// a simple date formatting function

	return (
		<>
			{/* <Repeater count={count}> */}
			<Repeater count={store.data.khasra_record[props.i].cleared_land_count}>
				{/* {i => ( */}
				{(i) => (
					<Form key={i}>
						<Accordion id='accSample' activeItemId={`item-${props.i}-${i}`} shadow='lg'>
							<AccordionItem
								id={`item${i}`}
								title={`${i + 1}:  Clear full/ Part of Land in Khasra: ${
									store.data.khasra_record[props.i].khasra_number
								}					
								
								
								  `}
								icon='Person'>
								<div className='row g-4'>
									<FormGroup className='col-md-3'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend1'>
												kanal
											</InputGroupText>
											<Input
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												id='validationkanal'
												value={
													store.data.khasra_record[props.i].cleared_land[
														i
													].kanal
												}
												onChange={(e) => {
													dispatch(
														updateKhasraInnerProperties([
															e.target.value,
															'khasra_record',
															props.i,
															'cleared_land',
															i,
															'kanal',
														]),
													);
												}}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup className='col-md-3'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend'>
												Marla
											</InputGroupText>
											<Input
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												id='validationmarla'
												value={
													store.data.khasra_record[props.i].cleared_land[
														i
													].marla
												}
												onChange={(e) => {
													dispatch(
														updateKhasraInnerProperties([
															e.target.value,
															'khasra_record',
															props.i,
															'cleared_land',
															i,
															'marla',
														]),
													);
												}}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup className='col-md-3'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend'>
												Sarsai
											</InputGroupText>
											<Input
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												id='validationsarsai'
												ariaDescribedby='inputGroupPrepend'
												value={
													store.data.khasra_record[props.i].cleared_land[
														i
													].sarsai
												}
												onChange={(e) => {
													dispatch(
														updateKhasraInnerProperties([
															e.target.value,
															'khasra_record',
															props.i,
															'cleared_land',
															i,
															'sarsai',
														]),
													);
												}}
											/>
										</InputGroup>
									</FormGroup>

									<FormGroup className='col-md-3'>
										<InputGroup>
											<InputGroupText id='inputGroupPrepend'>
												Feet
											</InputGroupText>
											<Input
												type='number'
												min='0'
												onWheel={(e) => e.target.blur()}
												id='validationfeet'
												value={
													store.data.khasra_record[props.i].cleared_land[
														i
													].feet
												}
												onChange={(e) => {
													dispatch(
														updateKhasraInnerProperties([
															e.target.value,
															'khasra_record',
															props.i,
															'cleared_land',
															i,
															'feet',
														]),
													);
												}}
											/>
										</InputGroup>
									</FormGroup>
								</div>
								<div className='row g-4'>
									<FormGroup
										className='col-md-6'
										id='exampleTypes--date'
										label='Date'>
										<Flatpickr
											className='form-control'
											value={
												store.data.khasra_record[props.i].cleared_land[i]
													.date
											}
											onChange={(e, dateStr) => {
												dispatch(
													updateKhasraInnerProperties([
														dateStr,
														'khasra_record',
														props.i,
														'cleared_land',
														i,
														'date',
													]),
												);
											}}
											onClose={(e, dateStr) => {
												dispatch(
													updateKhasraInnerProperties([
														dateStr,
														'khasra_record',
														props.i,
														'cleared_land',
														i,
														'date',
													]),
												);
											}}
											options={{
												dateFormat: 'd/m/y',
												allowInput: true,
												defaultDate: new Date(),
											}}
											id='default-picker'
										/>
									</FormGroup>
								</div>
								<div className='row g-4'>
									<FormGroup className='col-md-6' label='Remarks'>
										<Input
											id='validationKhatoni'
											value={
												store.data.khasra_record[props.i].cleared_land[i]
													.description
											}
											onChange={(e) => {
												dispatch(
													updateKhasraInnerProperties([
														e.target.value,
														'khasra_record',
														props.i,
														'cleared_land',
														i,
														'description',
													]),
												);
											}}
										/>
									</FormGroup>
									<FormGroup
										className='col-md-6'
										id='exampleTypes--file'
										label='Documents'>
										<Input
											type='file'
											placeholder='Supports file type placeholder'
											aria-label='.form-control-lg example'
										/>
									</FormGroup>
								</div>

								{/*  Delete Button */}
								{store.data.khasra_record[props.i].cleared_land_count - 1 === i && (
									<Row className='justify-content-between align-items-center'>
										<Col md={2}>
											<Button
												color='danger'
												className='text-nowrap px-1'
												// onClick={e => deleteForm(e, i)}
												onClick={() => {
													dispatch(
														updateKhasraCleared_land_count([
															1,
															props.i,
															'cleared_land_count',
															'cleared_land',
															'khasra_record',
															'khasra_record',
															false,
														]),
													);
													setCount(count - 1);
												}}
												outline>
												<X size={14} className='me-50' />
												<span>Delete</span>
											</Button>
										</Col>
									</Row>
								)}
							</AccordionItem>
						</Accordion>
					</Form>
				)}
			</Repeater>
			{/* Add Button */}

			<Button
				icon='Add'
				color='primary'
				onClick={() => {
					// eslint-disable-next-line no-plusplus
					setCount(count + 1);
					// eslint-disable-next-line no-console

					dispatch(
						updateKhasraCleared_land_count([
							1,
							props.i,
							'cleared_land_count',
							'cleared_land',
							'khasra_record',
							'khasra_record',
							true,
						]),
					);
				}}>
				Clear More Land
			</Button>
		</>
	);
};

export default Stages;
