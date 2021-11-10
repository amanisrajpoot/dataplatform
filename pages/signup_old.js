import { useState } from 'react';
import { confirmSignUp, signIn, signUp } from '../function/checkAuth';
import SignUpForm from '../components/SignUpForm_bdr';
import OTPForm from '../components/OtpScreenOld';
import { createDoctorProfile } from '../function/doctor';
import { useRouter } from 'next/router';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


const SignUp3 = ({ token, location, setToken }) => {
	const router = useRouter();
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [name, setname] = useState('');
	const [confirmpassword, setconfirmpassword] = useState('');
	const [phone, setphone] = useState('');
	const [error, seterror] = useState(null);
	const [otpScreen, setOtpScreen] = useState(false);
	const [otp, setOtp] = useState('');
	const [orgName, setOrgName] = useState('');
	

	// async function createDoctor(tokenF) {
	// 	setToken(tokenF);
	// 	await createDoctorProfile({
	// 		token: tokenF,
	// 		doctor: {
	// 			doctorName: name,
	// 			doctorEmailId: email,
	// 			doctorMobileNo: phone,
	// 			doctorHospital: 'BuddyDr',
	// 		},
	// 	});
	// }

	async function signUpF() {
		const erro = await signUp({
			email,
			phone: '+1' + phone,
			password,
			name,
			role: 'admin',
			
		});
		if (erro === null) {
			setOtpScreen(true);
		}
		seterror(erro);
	}

	async function confirmSignUpF() {
		const erro = await confirmSignUp({ email, otp, });
		if (erro === null) {
			await router.push('/dashboard');
			// await signIn({ email, password, token, setToken: createDoctor });
		}
		seterror(erro);
	}

	if (otpScreen) {
		return (
			<OTPForm
				otp={otp}
				email={email}
				setOtp={setOtp}
				confirmSignUp={confirmSignUpF}
			/>
		);
	} else {
		return (
			<SignUpForm
				name={name}
				setname={setname}
				confirmpassword={confirmpassword}
				setconfirmpassword={setconfirmpassword}
				setphone={setphone}
				phone={phone}
				error={error}
				setError={seterror}
				signUp={signUpF}
				email={email}
				setemail={setemail}
				password={password}
				setpassword={setpassword}
				orgName={orgName}
				setOrgName={setOrgName}
				
			/>
		);
	}
};

export default SignUp;
