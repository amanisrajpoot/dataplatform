import React from 'react';
import styles from '../styles/LoginForm.module.css';
import Image from 'next/image';
import { Grid } from '@material-ui/core';

const OTPForm = ({ error, email, otp, setOtp, confirmSignUp }) => {
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
					<h1>Verify your password</h1>
					<p>Enter the OTP you must have recieved on your email </p>
					<input
						disabled
						type='Username'
						placeholder='Email'
						className={styles.input}
						value={email}
					/>
					<input
						type='otp'
						placeholder='OTP'
						className={styles.input}
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						required
					/>
					{error && <p className={styles.error}>{error}</p>}
					<button
						onClick={confirmSignUp}
						type='Submit'
						className={styles.button}
					>
						Confirm signup
					</button>
				</div>
			</Grid>
		</Grid>
	);
};

export default OTPForm;
