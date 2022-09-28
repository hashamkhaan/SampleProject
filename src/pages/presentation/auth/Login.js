// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import moment from 'moment';
import subDirForNavigation from '../../../baseURL/subDirForNavigation';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/logo/rehbar.png';
import useDarkMode from '../../../hooks/useDarkMode';
import baseURL from '../../../baseURL/baseURL';
import Spinner from '../../../components/bootstrap/Spinner';

// eslint-disable-next-line react/prop-types
const LoginHeader = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

const Login = ({ isSignUp }) => {
	const { darkModeStatus } = useDarkMode();

	const [usernameInput, setUsernameInput] = useState(false);
	const [isNewUser, setIsNewUser] = useState(isSignUp);
	const [lastSave, setLastSave] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();
	const handleOnClick = () => {
		console.log('Isloading::::::::', isLoading);
		const a = setIsLoading(true);
		console.log('Isloading::::A::::', isLoading);
		console.log('a::::A::::', a);
		console.log(usernameInput);
		if (email === '') {
			toast('Please Provide Email Address!');
		} else if (password === '') {
			toast('Please Provide Password!');
		} else if (email !== '' && password !== '') {
			fetch(`${baseURL}/login`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					setIsLoading(false);

					console.log('Login res:::::', data);
					if (data.status === 'ok') {
						Cookies.set('name', data.name);
						Cookies.set('email', data.email);
						Cookies.set('role', data.role);
						Cookies.set('userID', data.user_id);
						Cookies.set('companyID', data.company_id);
						toast('You are Logged in Successfully!');
						navigate(`${subDirForNavigation}`, { replace: true });
						setLastSave(moment());
					}
					if (data.result === 'Wrong Credentials') {
						toast('User with the given Credentials does no exist!');
					}
					if (data.result === 'Wrong Password') {
						toast(
							'User with the given Credentials does no exist! Please check email and password',
						);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			toast('Fill out fields correctly!');
		}
	};

	return (
		<PageWrapper
			title={isNewUser ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-warning': !isNewUser, 'bg-info': !!isNewUser })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<img alt='Logo' src={Logo} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-lo10-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												disabled
												style={{
													display: 'none',
												}}
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(!isNewUser);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											{/* <Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!isNewUser}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setUsernameInput(false);
													setIsNewUser(!isNewUser);
												}}>
												Sign Up
											</Button> */}
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={isNewUser} />

								<form className='row g-4'>
									{isNewUser ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your email'>
													<Input type='email' autoComplete='email' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your name'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={handleOnClick}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='login-username'
													isFloating
													label='Your email or username'>
													<Input
														autoComplete='username'
														onChange={(e) => setEmail(e.target.value)}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='login-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
														onChange={(e) =>
															setPassword(e.target.value)
														}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<Button
													icon={isLoading ? null : 'Login'}
													isDisable={isLoading}
													color='warning'
													className='w-100 py-3'
													onClick={handleOnClick}>
													{isLoading && <Spinner isSmall inButton />}
													{isLoading
														? (lastSave && 'Signing in') || 'Signing in'
														: (lastSave && 'Sign in') || 'Sign in'}
												</Button>
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Powered by
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': isNewUser,
									'link-dark': !isNewUser,
								})}>
								Koncept Solution
							</a>
						</div>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
