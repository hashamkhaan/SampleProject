// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
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
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
// react-flatpickr
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/light.css';

// ** Icons Imports
import { X, Plus, Minus, Check } from 'react-feather';
import { Row, Col, Form, Button, AccordionHeader, AccordionBody } from 'reactstrap';
import StagesRegisteries from './StagesRegisteries';
import Installments from './Installments';
import Payments from './Payments';
// ** Custom Components
import {
	updateStageProperties,
	updateNoOfStages,
	updateFormIsValid,
	updateFormDetails,
} from '../redux/purchaseLandStore/index';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
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

const Stages = () => {
	// ** Store Variables
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);

	// ** State
	const [count, setCount] = useState(0);

	const formik = useFormik({
		initialValues: store.data.form2,

		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-console
		},
	});

	const changeHandlerFile = (event, i) => {
		event.preventDefault();
		dispatch(updateStageProperties([event.target.files[0], 'stages', i, 'file']));
	};

	return (
		<>
			<div className='mx-auto' style={{ width: 300 }}>
				<CardHeader>
					<CardLabel>
						<CardTitle>Manage Land Stages </CardTitle>
					</CardLabel>
				</CardHeader>
			</div>
			{/* <Repeater count={count}> */}
			<Repeater count={6}>
				{/* {i => ( */}
				{(i) =>
					i !== 1 &&
					((store.data.form1.inteqal_bezubani === false && i !== 4) ||
						(store.data.form1.inteqal_bezubani === true && i !== 3)) && (
						<Form key={i}>
							<Accordion id='accSample' activeItemId='item' shadow='lg'>
								<AccordionItem
									id={`item${i}`}
									title={` 
								 ${
										(i === 0 && `Stage ${i + 1}:Bayana`) ||
										(i === 2 && `Stage ${i}:Payments`) ||
										(i === 3 && `Stage 3:Registry`) ||
										(i === 4 && `Stage 3:Inteqal`) ||
										(i === 5 && `Stage 4:Installments`)
									}
								
								  `}
									icon='Person'>
									<div className='row g-4'>
										{i === 0 && (
											<>
												<FormGroup className='col-md-4'>
													<InputGroup>
														<InputGroupText id='inputGroupPrepend'>
															Bayana PKR
														</InputGroupText>
														<Input
															id={`amount${i}`}
															type='number'
															min='0'
															onWheel={(e) => e.target.blur()}
															onChange={(e) => {
																dispatch(
																	updateStageProperties([
																		e.target.value,
																		'stages',
																		i,
																		'amount',
																	]),
																);
															}}
															value={store.data.stages[i].amount}
															// onBlur={formik.handleBlur}
															// isValid={formik.isValid}
															// isTouched={formik.touched
															// 	.bayana_amount`${i}`}
															// invalidFeedback={formik.errors
															// 	.bayana_amount`${i}`}
															validFeedback='Looks good!'
														/>
													</InputGroup>
												</FormGroup>
												<FormGroup className='col-md-6'>
													<InputGroup>
														<InputGroupText id='inputGroupPrepend'>
															Remaining Amount PKR
														</InputGroupText>
														<Input
															readOnly
															id='remaining_amount'
															value={[
																store.data.form1.totalPrice -
																	store.data.stages[i].amount,
															]}
														/>
													</InputGroup>
												</FormGroup>
											</>
										)}

										{i === 4 && (
											<FormGroup className='col-md-4'>
												<InputGroup>
													<InputGroupText id='inputGroupPrepend'>
														Mutation number
													</InputGroupText>
													<Input
														id={`amount${i}`}
														type='number'
														min='0'
														onWheel={(e) => e.target.blur()}
														onChange={(e) => {
															dispatch(
																updateStageProperties([
																	e.target.value,
																	'stages',
																	i,
																	'number',
																]),
															);
														}}
														value={store.data.stages[i].number}
														// onBlur={formik.handleBlur}
														// isValid={formik.isValid}
														// isTouched={formik.touched
														// 	.bayana_amount`${i}`}
														// invalidFeedback={formik.errors
														// 	.bayana_amount`${i}`}
														validFeedback='Looks good!'
													/>
												</InputGroup>
											</FormGroup>
										)}
										{(i === 0 || i === 4) && (
											<FormGroup className='col-md-2' id={`date-${i}`}>
												<Flatpickr
													className='form-control'
													value={store.data.stages[i].stage_date}
													// eslint-disable-next-line react/jsx-boolean-value

													options={{
														dateFormat: 'd/m/y',
														allowInput: true,
														defaultDate: new Date(),
													}}
													onChange={(e, dateStr) => {
														dispatch(
															updateStageProperties([
																dateStr,
																'stages',
																i,
																'stage_date',
															]),
														);
													}}
													onClose={(e, dateStr) => {
														dispatch(
															updateStageProperties([
																dateStr,
																'stages',
																i,
																'stage_date',
															]),
														);
													}}
													id='default-picker'
												/>
											</FormGroup>
										)}
									</div>

									{(i === 0 || i === 4) && (
										<div className='row g-4'>
											<FormGroup
												className='col-md-6'
												id={`remarks-${i}`}
												label='Remarks'>
												<Input
													onChange={(e) => {
														dispatch(
															updateStageProperties([
																e.target.value,
																'stages',
																i,
																'description',
															]),
														);
													}}
													value={store.data.stages[i].desc}
												/>
											</FormGroup>
											<div className='form-group col-md-3'>
												<br />
												<input
													type='file'
													name='file'
													className='form-control'
													onChange={(e) => changeHandlerFile(e, i)}
												/>
											</div>
										</div>
									)}
									{i === 2 && <Payments />}
									{i === 3 && (
										<>
											<br />
											<StagesRegisteries />
										</>
									)}
									{i === 5 && (
										<>
											<br />
											<Installments />
										</>
									)}
								</AccordionItem>
							</Accordion>
						</Form>
					)
				}
			</Repeater>
			{/* Add Button */}
			{/* {store.data.masterDetails.count_stages <= 2 && (
				<Button
					color='primary'
					onClick={() => {
						// eslint-disable-next-line no-plusplus
						dispatch(updateNoOfStages([1, 'count_stages', 'stages', false]));
						setCount(count + 1);
					}}>
					Next Stage
				</Button>
			)} */}
		</>
	);
};

export default Stages;
