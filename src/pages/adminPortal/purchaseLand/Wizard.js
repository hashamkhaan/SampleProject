// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable camelcase */
import React, { Children, cloneElement, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
// import moment from 'moment';
// ** Axios Imports
import Axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../../components/bootstrap/Spinner';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Popovers from '../../../components/bootstrap/Popovers';
import useDarkMode from '../../../hooks/useDarkMode';
// ** Axios Imports
import baseURL from '../../../baseURL/baseURL';
import Icon from '../../../components/icon/Icon';
// ** Store & Actions
// eslint-disable-next-line no-unused-vars
import GeneratePDF from './print/ReportI';
// eslint-disable-next-line no-unused-vars
import GeneratePDF2 from './print/tablePdf2';
import showNotification from '../../../components/extras/showNotification';
// import { updateWholeObject } from '../redux/purchaseLandStore/index';
// eslint-disable-next-line no-unused-vars
import { resetStore } from '../redux/purchaseLandStore/index';

export const WizardItem = ({ id, title, children, className, ...props }) => {
	return (
		<section
			id={id}
			className={classNames('wizard-item', className)}
			role='tabpanel'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</section>
	);
};
WizardItem.propTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	className: PropTypes.string,
};
WizardItem.defaultProps = {
	className: null,
	title: null,
};

const Wizard = ({ children, onSubmit, isHeader, color, stretch, ...props }) => {
	// const history = useHistory();
	// const navigate = useNavigate();

	// eslint-disable-next-line no-unused-vars
	const dispatch = useDispatch();
	const store = useSelector((state) => state.purchaseLand);
	const [isLoading, setIsLoading] = useState(false);
	const [lastSave, setLastSave] = useState(null);

	const { themeStatus } = useDarkMode();
	const [activeItemIndex, setActiveItemIndex] = useState(0);

	const childCount = children.length;

	const getTitleName = (i) => {
		if (i + 1 === 1) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}: File Creation`;
		}
		if (i + 1 === 2) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}: File Stages/ Payments`;
		}
		if (i + 1 === 3) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}:Khasra Record/ Cleared Land`;
		}
		if (i + 1 === 4) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}:Taxes/Expenses `;
		}
		if (i + 1 === 5) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}: Payments`;
		}
		if (i + 1 === 6) {
			return `File# ${store.data.form1.file_no}: Step ${i + 1}: Taxes/Expenses`;
		}
		return `Step ${i + 1}`;
	};

	const prevBtn = !!activeItemIndex && (
		<Button color={color} isLink onClick={() => setActiveItemIndex(activeItemIndex - 1)}>
			Previous
		</Button>
	);
	// eslint-disable-next-line no-unused-vars

	const _titleSuccess = (
		<span className='d-flex align-items-center'>
			<Icon icon='Info' size='lg' className='me-1' />
			<span>Record Saved Successfully</span>
		</span>
	);
	const _titleError = (
		<span className='d-flex align-items-center'>
			<Icon icon='Warning' size='lg' className='me-1' />
			<span>Error Saving Record </span>
		</span>
	);

	const submitForm = (dataSubmit) => {
		const formData = new FormData();

		let registriesFilesArray = [];

		store.data.registries.forEach((datafile) => {
			registriesFilesArray = [...registriesFilesArray, datafile.file];
		});

		// Best approach
		// formData.append(`registries`, registriesFilesArray);

		// Chaipy approach
		store.data.stages.forEach((datafile, index) => {
			formData.append(`stages${index}`, datafile.file);
		});
		// Chaipy approach
		store.data.registries.forEach((datafile, index) => {
			formData.append(`registries${index}`, datafile.file);
		});
		// Chaipy approach
		store.data.khasra_record.forEach((khasra_record, i) => {
			khasra_record.registries.forEach((registries, index) => {
				formData.append(`khasra_record_fard${index}${i}`, registries.fard_file);
			});
		});
		// Chaipy approach
		store.data.khasra_record.forEach((khasra_record, i) => {
			khasra_record.registries.forEach((registries, index) => {
				formData.append(`khasra_record_inteqal${index}${i}`, registries.inteqal_file);
			});
		});

		const dataStringify = JSON.stringify(dataSubmit);
		formData.append('data', dataStringify);
		Axios.post(`${baseURL}/addLand`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				setIsLoading(false);
				// eslint-disable-next-line no-console

				if (res.data.status === 'ok') {
					showNotification(_titleSuccess, res.message, 'success');

					dispatch(resetStore([]));

					// navigate('/adminPortal/lands/purchaseLand');
					setActiveItemIndex(0);
					// window.location.reload();
				} else {
					showNotification(_titleError, res.message, 'danger');
					// eslint-disable-next-line no-console
					console.log('Error');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				if (
					err.response.data.message.includes(
						'SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry',
					)
				) {
					showNotification(
						'Duplicate entry',
						`File # ${store.data.form1.file_no} is already stored, cannot add a duplicate entry. Please change file#`,
						'danger',
					);
				} else {
					showNotification('Error Saving Record', err.message, 'danger');
					// eslint-disable-next-line no-console
					console.log('ERROR :::: ', err);
				}
			});
	};
	const nextBtn = (
		<>
			<Button
				className={classNames({ 'd-none': activeItemIndex !== 0 }, 'me-0')}
				aria-hidden={activeItemIndex !== 0}
				color={color}
				icon='SkipNext'
				isLight
				// isDisable={!store.data.validations.form1Isvalid}
				isDisable={!store.data.masterDetails.isEnabledNext1}
				onClick={() => {
					setActiveItemIndex(activeItemIndex + 1);
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				}}>
				Next 1
			</Button>
			<Button
				className={classNames({ 'd-none': activeItemIndex !== 1 }, 'me-0')}
				aria-hidden={activeItemIndex !== 1}
				color={color}
				icon='SkipNext'
				isLight
				onClick={() => {
					setActiveItemIndex(activeItemIndex + 1);
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				}}>
				Next 2
			</Button>
			<Button
				className={classNames({ 'd-none': activeItemIndex !== 2 }, 'me-0')}
				aria-hidden={activeItemIndex !== 2}
				color={color}
				icon='SkipNext'
				isLight
				onClick={() => {
					setActiveItemIndex(activeItemIndex + 1);
					window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
				}}>
				Next 3
			</Button>

			<Button
				className={classNames({ 'd-none': childCount !== activeItemIndex + 1 })}
				aria-hidden={childCount !== activeItemIndex + 1}
				// type='submit'
				icon={isLoading ? null : 'Save'}
				isDisable={isLoading}
				onClick={() => {
					try {
						setIsLoading(true);

						submitForm(store.data);
						setLastSave(moment());
					} catch (error) {
						showNotification('Error ', 'Error saving', 'danger');
						// eslint-disable-next-line no-console
						console.log(error, error.message);
					}
				}}
				color={color}>
				{isLoading && <Spinner isSmall inButton />}
				{isLoading ? (lastSave && 'Saving') || 'Saving' : (lastSave && 'Save') || 'Save'}
			</Button>
		</>
	);

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Card stretch={stretch} onSubmit={onSubmit} {...props}>
			{/* <Card stretch={stretch} tag='form' onSubmit={onSubmit} {...props}> */}
			{!!isHeader && (
				<CardHeader>
					<CardLabel icon='Assignment' iconColor={color}>
						{Children.map(children, (child, index) => (
							<CardTitle
								key={child.props.id}
								className={index !== activeItemIndex ? 'd-none' : null}>
								{child.props.title || getTitleName(index)}
							</CardTitle>
						))}
					</CardLabel>
					{isHeader === 'withButton' && (
						<CardActions>
							{prevBtn}
							{nextBtn}
						</CardActions>
					)}
				</CardHeader>
			)}
			<CardBody isScrollable={!!stretch}>
				<div className='wizard-progress position-relative'>
					<div className='progress'>
						<div
							className={classNames('progress-bar', {
								[`bg-${color}`]: color !== 'primary',
							})}
							role='progressbar'
							style={{ width: `${(100 / (childCount - 1)) * activeItemIndex}%` }}
							aria-valuenow={(100 / (childCount - 1)) * activeItemIndex}
							aria-valuemin='0'
							aria-valuemax='100'
							aria-label='progress'
						/>
					</div>
					{Children.map(children, (child, index) => (
						<Popovers
							key={child.props.id}
							desc={child.props.title || getTitleName(index)}
							trigger='hover'>
							<button
								type='button'
								className={classNames(
									'wizard-progress-btn',
									'position-absolute p-0 top-0',
									'translate-middle',
									'btn btn-sm',
									{
										[`btn-${color}`]: activeItemIndex >= index,
										[`btn-${themeStatus}`]: activeItemIndex < index,
									},
									'rounded-pill',
								)}
								style={{
									left: `${(100 / (childCount - 1)) * index}%`,
								}}
								onClick={() => setActiveItemIndex(index)}>
								{index + 1}
							</button>
						</Popovers>
					))}
				</div>

				<div className='wizard'>
					{Children.map(children, (child, index) =>
						cloneElement(child, {
							className: index !== activeItemIndex ? 'd-none' : '',
							'aria-hidden': index !== activeItemIndex,
						}),
					)}
				</div>
			</CardBody>
			<CardFooter>
				<CardFooterLeft>
					<CardFooterLeft>
						<Button
							type='reset'
							color='info'
							isOutline
							onClick={() => dispatch(resetStore([]))}>
							Reset complete form
						</Button>
					</CardFooterLeft>
					{prevBtn}
				</CardFooterLeft>
				<CardFooterRight>{nextBtn}</CardFooterRight>
			</CardFooter>
		</Card>
	);
};
Wizard.propTypes = {
	children: PropTypes.node.isRequired,
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'dark',
		'brand',
		'brand-two',
		'storybook',
	]),
	isHeader: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['withButton'])]),
	onSubmit: PropTypes.func.isRequired,
	stretch: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['full', 'semi'])]),
};
Wizard.defaultProps = {
	isHeader: false,
	color: 'primary',
	stretch: null,
};

export default Wizard;
