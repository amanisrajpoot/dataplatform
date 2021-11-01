import React from 'react';
import styles from '../styles/LoginForm.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { EMAIL_VALIDATOR, PHONE_VALIDATOR } from '../function/constants';
import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		<Link color="inherit" href="/">
		  Data Platform
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  }

const SignUpForm = ({
	error,
	setError,
	email,
	password,
	name,
	setphone,
	phone,
	confirmpassword,
	setemail,
	setpassword,
	setconfirmpassword,
	setname,
	signUp,
	afNum,
	setafNum,
	city,
	setcity,
	State,
	setState,
}) => {
	const [mode, setmode] = useState(0);

	function checkFields() {
		if (name.length < 3) {
			setError('Name should be atleast 3 letter long');
		} else if (!EMAIL_VALIDATOR.test(email)) {
			setError('Invalid Email ID');
		} else if (password.length < 8) {
			setError('Invalid password, must be atleast 8 letter long');
		} else if (password !== confirmpassword) {
			setError("Passwords don't match.");
		} else {
			setError(null);
			setmode(1);
		}
	}
	function checkFields2() {
		if (afNum.length < 3) {
			setError('Aff. number should be atleast 6 letter long');
		} else if (!PHONE_VALIDATOR.test(phone)) {
			setError('Phone number not valid');
		} else if (city.length < 2) {
			setError('Invalid city, must be atleast 2 letter long');
		} else if (State.length < 2) {
			setError('Invalid state, must be atleast 2 letter long');
		} else {
			// setError('DONE');
			signUp();
		}
	}

	return (
		<Grid xs={12} item className={styles.main_container}>
			<Grid
				xs={11}
				sm={8}
				md={7}
				lg={5}
				item
				className={styles.inner_container}
			>
				<div className={styles.input_fields}>
					<div className={styles.logo}>
						<Image
							src='/logo.png'
							layout={'intrinsic'}
							height={100}
							width={450}
						/>
					</div>
					<h1>Sign up</h1>
					{mode === 0 ? (
						// User ID and Password
						<form className={styles.input_fields}>
							<input
								type='text'
								placeholder='Full Name'
								className={styles.input}
								value={name}
								onChange={(e) => setname(e.target.value)}
								required
							/>
							<input
								type='text'
								placeholder='Organisation name'
								className={styles.input}
								value={name}
								onChange={(e) => setname(e.target.value)}
								required
							/>
							<input
								type='Email'
								placeholder='Email'
								className={styles.input}
								value={email}
								onChange={(e) => setemail(e.target.value)}
								required
							/>

							{/* <input type="Phone" placeholder="Phone" className ={styles.input} value={"+1 "+phone}
                            onChange={(e)=> setphone(e.target.value.split("+1 ")[1]||"")}required/> */}

							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<input
									type='Password'
									placeholder='Password'
									className={styles.input}
									value={password}
									onChange={(e) => setpassword(e.target.value)}
									required
								/>
								<input
									type='Password'
									placeholder='Confirm Password'
									className={styles.input}
									value={confirmpassword}
									onChange={(e) => setconfirmpassword(e.target.value)}
									required
								/>
							</div>

							{error && <p className={styles.error}>{error}</p>}
							<button
								// type='Submit'
								onClick={checkFields}
								className={styles.button}
							>
								Create account
							</button>

						</form>
					) : (
						// Organisation/Clinic's information
						<>
							<input
								type='text'
								placeholder='Affiliation number'
								className={styles.input}
								value={afNum}
								onChange={(e) => setafNum(e.target.value)}
								required
							/>
							<input
								type='Phone'
								placeholder='Phone'
								className={styles.input}
								value={'+1 ' + phone}
								onChange={(e) => setphone(e.target.value.split('+1 ')[1] || '')}
								required
							/>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<input
									type='text'
									placeholder='City'
									className={styles.input}
									value={city}
									onChange={(e) => setcity(e.target.value)}
									required
								/>
								<input
									type='text'
									placeholder='State'
									className={styles.input}
									value={State}
									onChange={(e) => setState(e.target.value)}
									required
								/>
							</div>

							{error && <p className={styles.error}>{error}</p>}

							<button
								// onClick={checkFields}
								// type='Submit'
								onClick={checkFields2}
								className={styles.button}
							>
								Sign up
							</button>
						</>
					)}
					<Link href={'/login'}>
						<a style={{ marginLeft: '0.8em' }}>Already have an account?</a>
					</Link>

					<Copyright sx={{ mt: 5 }} />

				</div>
			</Grid>
		</Grid>
	);
};

export default SignUpForm;
