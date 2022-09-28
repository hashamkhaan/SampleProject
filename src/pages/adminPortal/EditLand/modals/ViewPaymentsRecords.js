import React, { useState } from 'react';
import { useFormik } from 'formik';

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

// eslint-disable-next-line no-unused-vars
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
// eslint-disable-next-line no-unused-vars
import Input from '../../../../components/bootstrap/forms/Input';

import Button from '../../../../components/bootstrap/Button';

const validate = (values) => {
	const errors = {};
	if (!values.name) {
		errors.name = 'Required';
	} else if (values.name.length > 15) {
		errors.name = 'Must be 15 characters or less';
	}

	return errors;
};

const AddMouza = () => {
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
				<Button
					color='primary'
					isLight
					icon='Send'
					onClick={() => {
						initialStatus();
						setStaticBackdropStatus(false);
						setState(true);
					}}>
					View Record
				</Button>
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
					<ModalTitle id='exampleModalLabel'> Payment Records</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card stretch tag='form' onSubmit={formikAddPurchaser.handleSubmit}>
							<CardBody>
								<div className='row g-4' />
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
					{/* <Button color='info' icon='Save'>
						Save changes
					</Button> */}
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddMouza;
