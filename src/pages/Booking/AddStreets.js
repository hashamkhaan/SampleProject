import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
// ** Axios Imports

import Axios from 'axios';
import moment from 'moment';
import Select from 'react-select';
import Spinner from '../../components/bootstrap/Spinner';
import Icon from '../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Card, {
	CardSubTitle,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../components/bootstrap/Card';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Button from '../../components/bootstrap/Button';
import showNotification from '../../components/extras/showNotification';
import baseURL from '../../baseURL/baseURL';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}
	if (!values.block) {
		errors.block = 'This field is required';
	}
	// if (values.personTypes.length === 0) {
	//  errors.personTypes = 'Please choose at least one person type';
	// }
	// eslint-disable-next-line no-console
	console.log('**', values.personTypes);
	return errors;
};

const AddStreets = () => {
	const [state, setState] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);
	const [GetBlocksArray, setGetBlocksArray] = useState([]);

	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	const _titleError = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Error Saving Record </span>
		</span>
	);

	// eslint-disable-next-line no-unused-vars
	const submitForm = (data) => {
		// eslint-disable-next-line no-console
		console.log('___ i m in Subform with data :::::::::', data);
		const url = `${baseURL}/addStreet`;

		const options = {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json;charset=UTF-8',
			},
			body: JSON.stringify({
				name: data.name,
				block_id: data.block.id,
			}),
		};
		fetch(url, options)
			.then((response) => response.json())
			.then((res) => {
				setIsLoading(false);

				if (res.status === 'ok') {
					formik.resetForm();
					showNotification(_titleSuccess, res.message, 'success');
					setState(false);

					setLastSave(moment());
					// dispatch(
					//  updateMasterDetails([
					//      store.data.masterDetails.refreshDropdowns + 1,
					//      'refreshDropdowns',
					//  ]),
					// );
				} else {
					showNotification(_titleError, res.message, 'danger');
					setIsLoading(false);
					// eslint-disable-next-line no-console
					console.log('Error');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				showNotification('Error', err.message, 'danger');
			});
	};
	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};
	const formik = useFormik({
		initialValues: {
			name: '',
			block: '',
		},
		validate,
		onSubmit: () => {
			setIsLoading(true);
			setTimeout(handleSave, 2000);
		},
	});
	const handleSave = () => {
		// eslint-disable-next-line no-console

		submitForm(formik.values);
		setLastSave(moment());
	};

	useEffect(() => {
		Axios.get(`${baseURL}/getBlocksDropdown`)
			.then((response) => {
				// eslint-disable-next-line no-console
				console.log('block Dropdown: ::::::', response);
				const rec = response.data.blocks.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setGetBlocksArray(rec);
				// setPurchaserOptionsLoading(false)
			})
			// eslint-disable-next-line no-console
			.catch((err) => console.log(err));
	}, []);
	return (
		<div className='col-md-2'>
			<br />
			<Icon
				icon='ClipboardPlus'
				className='mb-0 text-info h2'
				onClick={() => {
					initialStatus();

					setState(true);
					setStaticBackdropStatus(true);
				}}
			/>

			<Modal
				isOpen={state}
				setIsOpen={setState}
				titleId='exampleModalLabel'
				isStaticBackdrop={staticBackdropStatus}
				isScrollable={scrollableStatus}
				isCentered={centeredStatus}
				size={sizeStatus}
				fullScreen={fullScreenStatus}
				isAnimation={animationStatus}>
				<ModalHeader setIsOpen={headerCloseStatus ? setState : null}>
					<ModalTitle id='exampleModalLabel'>Add Street Form</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formik.handleSubmit}>
							<CardHeader>
								<CardLabel icon='CheckBox' iconColor='info'>
									<CardSubTitle>Fill out all below fields</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<FormGroup id='block' label='Blocks'>
										<Select
											className='col-md-12'
											options={GetBlocksArray}
											// isLoading={crAccountLoading}
											value={formik.values.block}
											onChange={(e) => {
												formik.setFieldValue('block', e);
											}}
											onBlur={formik.handleBlur}
											isValid={formik.isValid}
											isTouched={formik.touched.block}
											invalidFeedback={formik.errors.block}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									{formik.errors.block && (
										<p
											style={{
												color: 'red',
											}}>
											{formik.errors.block}
										</p>
									)}

									<FormGroup id='name' label='Street Name' className='col-md-12'>
										<Input
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.name}
											isValid={formik.isValid}
											isTouched={formik.touched.name}
											invalidFeedback={formik.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</CardBody>
							<CardFooter>
								<CardFooterLeft>
									<Button
										type='reset'
										color='info'
										isOutline
										onClick={formik.resetForm}>
										Reset
									</Button>
								</CardFooterLeft>
								<CardFooterRight>
									<Button
										className='me-3'
										icon={isLoading ? null : 'Save'}
										isLight
										color={lastSave ? 'info' : 'success'}
										isDisable={isLoading}
										onClick={formik.handleSubmit}>
										{isLoading && <Spinner isSmall inButton />}
										{isLoading
											? (lastSave && 'Saving') || 'Saving'
											: (lastSave && 'Save') || 'Save'}
									</Button>
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => setState(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddStreets;
