// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { useState } from 'react';
import classNames from 'classnames';

// eslint-disable-next-line import/no-unresolved
import Axios from 'axios';
import Button from '../../../../components/bootstrap/Button';
// ** Axios Imports

// import { updateMasterDetails } from '../../redux/purchaseLandStore/index';
import baseURL from '../../../../baseURL/baseURL';
// import Icon from '../../../../components/icon/Icon';
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

const AddKhasra = (props) => {
	const [state, setState] = useState(false);

	const [staticBackdropStatus, setStaticBackdropStatus] = useState(false);
	const [scrollableStatus, setScrollableStatus] = useState(false);
	const [centeredStatus, setCenteredStatus] = useState(false);
	const [sizeStatus, setSizeStatus] = useState(null);
	const [fullScreenStatus, setFullScreenStatus] = useState(null);
	const [animationStatus, setAnimationStatus] = useState(true);

	const [headerCloseStatus, setHeaderCloseStatus] = useState(true);

	// eslint-disable-next-line no-unused-vars
	const initialStatus = () => {
		setStaticBackdropStatus(false);
		setScrollableStatus(false);
		setCenteredStatus(false);
		setSizeStatus(null);
		setFullScreenStatus(null);
		setAnimationStatus(true);
		setHeaderCloseStatus(true);
	};

	// eslint-disable-next-line no-unused-vars
	const [mouza_options, setmouza_options] = useState([]);
	// eslint-disable-next-line no-unused-vars
	const [count, setCount] = useState(0);
	// eslint-disable-next-line no-unused-vars
	const getFiles = () => {
		// eslint-disable-next-line react/destructuring-assignment, react/prop-types
		Axios.get(`${baseURL}/getLandfiles?file_no=${props.file_no}`)
			.then((response) => {
				const rec = response.data.files.map(({ id, name }) => ({
					id,
					value: id,
					label: name,
				}));
				setmouza_options(rec);
				//   setLoading(false)
			})
			.catch((err) => console.log(err));
	};

	return (
		// eslint-disable-next-line react/destructuring-assignment, react/prop-types
		<div key={`${props.file_no}`} className='col-auto'>
			<div className='col-auto'>
				<Button
					isOutline
					color='primary'
					// isLight={darkModeStatus}
					className={classNames('text-nowrap', {
						'border-light': true,
					})}
					icon='Preview'
					// onClick={() => {
					// 	getFiles();
					// 	initialStatus();

					// 	setState(true);
					// 	setStaticBackdropStatus(true);
					// }}
				>
					Registry Images
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
					<ModalTitle id='exampleModalLabel'>Registry Files</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='col-12'>
						<Card>
							<CardBody>
								{/* {mouza_options.forEach((data) => {
									<div key={count}>
										<img
											// src='https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp'
											src={data.file}
											alt='ImageR'
										/>
									</div>;
									setCount(count + 1);
								})} */}
							</CardBody>
							<CardFooter>
								<CardFooterLeft />
								<CardFooterRight>
									{/* <Button
										icon='Save'
										type='submit'
										color='primary'
										isDisable={
											!formikAddPurchaser.isValid &&
											!!formikAddPurchaser.submitCount
										}>
										Save changes
									</Button> */}
								</CardFooterRight>
							</CardFooter>
						</Card>
					</div>
				</ModalBody>
				<ModalFooter />
			</Modal>
		</div>
	);
};

export default AddKhasra;
