import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import { confirmSignUp, signIn, signUp } from '../function/checkAuth';
import OTPForm from '../components/OtpScreen';

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

const theme = createTheme();

export default function SignUp({token, setToken}) {
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
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signUpF();
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  async function signUpF() {
		const erro = await signUp({
			email,
			//phone: '+1' + phone,
			password,
			name,
			role: 'admin',
			orgName,
			
		});
		if (erro === null) {
			setOtpScreen(true);
		}
		seterror(erro);
	}

	async function confirmSignUpF() {
		const erro = await confirmSignUp({ email,otp,token, setToken  });
		if (erro === null) {
			await router.push('/dashboard');
			// await signIn({ email, password, token, setToken: createDoctor });
		}
		seterror(erro);
	}

  function checkFields() {
		if (name.length < 3) {
			seterror('Name should be atleast 3 letter long');
		} else if (!EMAIL_VALIDATOR.test(email)) {
			seterror('Invalid Email ID');
		} else if (password.length < 8) {
			seterror('Invalid password, must be atleast 8 letter long');
		} else if (password !== confirmpassword) {
			seterror("Passwords don't match.");
		} else {
			seterror(null);
			signUpF();
		}
	}
	function checkFields2() {
		if (afNum.length < 3) {
			seterror('Aff. number should be atleast 6 letter long');
		} else if (!PHONE_VALIDATOR.test(phone)) {
			seterror('Phone number not valid');
		} else if (city.length < 2) {
			seterror('Invalid city, must be atleast 2 letter long');
		} else if (State.length < 2) {
			seterror('Invalid state, must be atleast 2 letter long');
		} else {
			// setError('DONE');
			signUpF();
		}
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={name}
								  onChange={(e) => setname(e.target.value)}
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="company"
                  label="Company Associated With"
                  name="company"
                  autoComplete="company"
                  value={orgName}
								  onChange={(e) => setOrgName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
								  onChange={(e) => setemail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
								  onChange={(e) => setpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  value={confirmpassword}
								  onChange={(e) => setconfirmpassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {error && <p style={{color:"red"}}>{error}</p>}
            <Button
              type="submit"
              fullWidth
              // href="/login"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onlick={checkFields}
              
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />

          </Box>
        </Box>
      </Container>
    </ThemeProvider>

    
  );
}
}