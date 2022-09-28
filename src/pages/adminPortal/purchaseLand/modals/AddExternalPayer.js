import React, { useState } from 'react';
import { useFormik } from 'formik';

import Icon from '../../../../components/icon/Icon';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Card, {
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	// eslint-disable-next-line no-unused-vars
	CardHeader,
	// eslint-disable-next-line no-unused-vars
	CardLabel,
} from '../../../../components/bootstrap/Card';

import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 50) {
		errors.name = 'Must be 50 characters or less';
	}
	if (!values.phone_no) {
		errors.phone_no = 'Required';
	} else if (values.phone_no.length > 14) {
		errors.phone_no = 'Must be 14 digits or less';
	}
	if (!values.cnic) {
		errors.cnic = 'Required';
	} else if (values.cnic.length > 13) {
		errors.cnic = 'Must be 13 characters or less';
	}
	if (!values.address) {
		errors.address = 'Required';
	} else if (values.address.length > 50) {
		errors.address = 'Must be 50 characters or less';
	}

	return errors;
};

const AddExternalPayer = () => {
	const [state, setState] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);

		setHeaderCloseStatus(true);
	};
	const formikAddPurchaser = useFormik({
		initialValues: {
			name: '',
			phone_no: '',
			cnic: '',
			address: '',
			validationState: '',
			validationZip: '',
			validationDesc: '',
			validationRadios: '',
			validationCheck: false,
		},
		validate,
		onSubmit: (values) => {
			// eslint-disable-next-line no-alert
			alert(JSON.stringify(values, null, 2));
		},
	});

	return (
		<div className='col-auto'>
			<div className='col-auto'>
				<Icon
					icon='PersonAdd'
					className='mb-0 text-info h2'
					onClick={() => {
						initialStatus();

						setState(true);
						setStaticBackdropStatus(true);
					}}
				/>
			</div>
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
					<ModalTitle id='exampleModalLabel'>Add Purchaser</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formikAddPurchaser.handleSubmit}>
							<CardBody>
								<div className='row g-4'>
									<FormGroup id='name' label=' Name' className='col-md-12'>
										<Input
											onChange={formikAddPurchaser.handleChange}
											onBlur={formikAddPurchaser.handleBlur}
											value={formikAddPurchaser.values.name}
											isValid={formikAddPurchaser.isValid}
											isTouched={formikAddPurchaser.touched.name}
											invalidFeedback={formikAddPurchaser.errors.name}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup
										id='phone_no'
										label='Phone number'
										className='col-md-12'>
										<Input
											onChange={formikAddPurchaser.handleChange}
											onBlur={formikAddPurchaser.handleBlur}
											value={formikAddPurchaser.values.phone_no}
											isValid={formikAddPurchaser.isValid}
											isTouched={formikAddPurchaser.touched.phone_no}
											invalidFeedback={formikAddPurchaser.errors.phone_no}
											validFeedback='Looks good!'
										/>
									</FormGroup>
									<FormGroup id='cnic' label='CNIC' className='col-md-12'>
										<Input
											onChange={formikAddPurchaser.handleChange}
											onBlur={formikAddPurchaser.handleBlur}
											value={formikAddPurchaser.values.cnic}
											isValid={formikAddPurchaser.isValid}
											isTouched={formikAddPurchaser.touched.cnic}
											invalidFeedback={formikAddPurchaser.errors.cnic}
											validFeedback='Looks good!'
										/>
									</FormGroup>

									<FormGroup id='address' label='Address' className='col-lg-12'>
										<Input
											onChange={formikAddPurchaser.handleChange}
											onBlur={formikAddPurchaser.handleBlur}
											value={formikAddPurchaser.values.address}
											isValid={formikAddPurchaser.isValid}
											isTouched={formikAddPurchaser.touched.address}
											invalidFeedback={formikAddPurchaser.errors.address}
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
										onClick={formikAddPurchaser.resetForm}>
										Reset
									</Button>
								</CardFooterLeft>
								<CardFooterRight>
									{/* <Button
										type='submit'
										color='primary'
										isDisable={
											!formikAddPurchaser.isValid &&
											!!formikAddPurchaser.submitCount
										}>
										Submit form
									</Button> */}
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
					<Button color='info' icon='Save'>
						Save changes
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddExternalPayer;
