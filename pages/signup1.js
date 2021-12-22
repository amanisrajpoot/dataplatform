import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BusinessIcon from '@mui/icons-material/Business';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ScreenLockPortraitOutlinedIcon from '@mui/icons-material/ScreenLockPortraitOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import {confirmSignUp, signIn, signUp} from "../function/checkAuth";
import OtpInput from 'react-otp-input';
import mixpanel from 'mixpanel-browser';
import OTPForm from "../components/OtpScreen";
import {EMAIL_VALIDATOR} from "../function/constants";

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});  

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

function BrandName(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Product by '}
            <Link color="inherit" href="/">
                {'String Ventures © '}
            </Link>{' '}

            {/*{new Date().getFullYear()}*/}

        </Typography>
    );
}

const theme = createTheme();

const SignUp =({token, setToken}) => {
	const signingLoading = () => {
		if (email !== '' && password !== '') {
			setisLoading(true);
			signIn();
		}
	};

  const CustomCheckBox = withStyles({
		root: {
			color: '#0DB1A1',
			'&$checked': {
				color: '#0DB1A1',
			},
		},
		checked: {},
	})((props) => (
		<Checkbox
			color='default'
			{...props}
			style={{
				background: 'white',
				width: '30px',
				height: '30px',
				margin: '0px',
				display: 'flex',
				justifyContent: 'center',
				marginTop: '6px',
			}}
		/>
	));

    const router = useRouter()
    const [name, setName] = useState("")
    const [company, setCompany] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [topPadding, setTopPadding] = useState(6)
    const [bottomTopPadding, setBottomTopPadding] = useState(45)
    const [mode, setMode] = useState(0)
    const [otp, setOtp] = useState(0)

    async function signInFK(){
        setMode(1);
        setTopPadding(28)
        setBottomTopPadding(202)

    }

    async function signUpF() {
        console.log("usercompany", company)
        const erro = await signUp({
            email,
            //phone: '+1' + phone,
            password,
            name,
            company,
            token,
            setToken

        });
        if (erro === null) {
            setMode(1)
            setTopPadding(28)
            setBottomTopPadding(202)
        }
        setError(erro);
        console.log('server error', erro)
        //setMode(0);
    }

    async function confirmSignUpF() {
        const erro = await confirmSignUp({ email,otp,token, setToken  });
        if (erro === null) {
            await router.push('/accountcreated')
            await signIn({email, password, token, setToken});
            // sleep(2000);
            // const ret = await createUser({email,firstname,lastname,company,token});
            // sleep(1000);
            // await router.push('/dashboard');
            // await signIn({ email, password, token, setToken: createDoctor });
        }
        setError(erro);
    }

    function checkFields() {
        if (name.length < 3) {
            setError('Name should be atleast 3 letter long');
        } else if (!EMAIL_VALIDATOR.test(email)) {
            setError('Invalid Email ID');
        } else if (password.length < 8) {
            setError('Invalid password, must be atleast 8 letter long');
        } else if (password !== confirmPassword) {
            setError("Passwords don't match.");
        } else {
            setError(null);
            signUpF();
        }
    }
    function checkFields2() {
        if (otp.length < 6) {
            setError('Invalid OTP');
        } else {
            // setError('DONE');
            confirmSignUpF();

        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        console.log("wrong OTP", error)
        console.log(email,password,company, name, otp)
        if(mode===0){
            checkFields()
        } else if(mode===1){
            checkFields2()
        }
    };

        return (
            <ThemeProvider theme={theme}>

                <Grid container component="main" sx={{height: '100vh', font: 'roboto'}}>
                    <CssBaseline/>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={6}
                        sx={{
                            backgroundImage: 'url(/login-background01.png)',
                            // backgroundRepeat: 'no-repeat',
                            width:"100%",

                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            // backgroundPosition: 'left',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{
                        display: 'flex',
                        flexDirection: 'column', justifyContent: 'space-between', alignItems: 'space-between'
                    }}>
                        {mode === 0 ? <div style={{
                            paddingTop: 24,
                            paddingRight: 76,
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'end'
                        }}>
                            <Link sx={{alignSelf: 'end'}} href="/login" variant="body2">
                                {"Already have an account?"}
                                <div style={{color: "#5A00E2", display: "inline"}}>Log In</div>
                            </Link>
                        </div> : mode === 1 ? null : null}
                        <Box
                            sx={{
                                pt: topPadding,
                                display: 'flex',
                                flexDirection: 'column',
                                // justifyContent: 'center',
                                width: '100%',
                                height: '100%'

                            }}
                        >
                            {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
                            {/*  <ScreenLockPortraitOutlinedIcon />*/}
                            {/*</Avatar>*/}
                            {mode === 0 ? <div
                                style={{display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%',}}>
                                <div style={{marginLeft: 125}}>
                                    <div style={{fontSize: 30}}>Sign Up</div>
                                    <div style={{fontSize: 14}}>Welcome, we're really excited to onboard you!</div>
                                </div>
                            </div> : mode === 1 ? <>
                                <div style={{color: "#5A00E2", alignSelf: 'center', marginBottom: 35}}>
                                    <LockIcon sx={{transform: "scale(4)"}}/>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'start',
                                    width: '100%',
                                }}>
                                    <div style={{marginLeft: 125}}>
                                        <div style={{fontSize: 30}}>Verification Code</div>
                                        <div style={{fontSize: 14}}>We've sent a verification code to your email
                                            address: <b>{email}</b>
                                        </div>
                                    </div>
                                </div>
                            </> : null}
                            <Box component="form" onSubmit={handleSubmit}
                                 sx={{
                                     pt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                                     width: '100%'
                                 }}>

                                {mode === 0 ? <><TextField
                                        margin="normal"
                                        required
                                        sx={{width: "65%"}}
                                        id="name"
                                        label="Full Name"
                                        name="name"
                                        autoComplete="name"
                                        autoFocus
                                        onChange={(e) => setName(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon/>
                                                </InputAdornment>
                                            ),
                                            placeholder: "Your Name"
                                        }}
                                    />

                                        <TextField
                                            margin="normal"
                                            required
                                            sx={{width: "65%"}}
                                            id="company"
                                            label="Company Name"
                                            name="company"
                                            autoComplete="company"
                                            autoFocus
                                            onChange={(e) => setCompany(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <BusinessIcon/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Company Name"
                                            }}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            sx={{width: "65%"}}
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            onChange={(e) => setEmail(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Email Address"
                                            }}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            sx={{width: "65%"}}
                                            name="password"
                                            label="Enter Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Enter Password"
                                            }}
                                        />

                                        <TextField
                                            margin="normal"
                                            required
                                            sx={{width: "65%"}}
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            id="confirmpassword"
                                            autoComplete="confirmPassword"
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockIcon/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Confirm Password"
                                            }}
                                        />
`                                       {error? <>{error}</>:null}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mt: 3,
                                                mb: 2,
                                                borderRadius: 2,
                                                py: 2,
                                                width: "65%",
                                                backgroundColor: "#5A00E2"
                                            }}
                                            onClick={checkFields}
                                            // href="/dashboard"
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                    : mode === 1 ?
                                    <>
                                        <div style={{
                                            width: '100%',
                                            paddingLeft: 125,
                                            paddingRight: 100,
                                            paddingTop: 12
                                        }}>
                                            <OtpInput
                                                inputStyle={{
                                                    alignSelf: 'center', display: 'flex',
                                                    width: '60%', height: '7vh'
                                                }}
                                                value={otp}
                                                onChange={(otp) => setOtp(otp)}
                                                numInputs={6}
                                                separator={<span></span>}
                                            />
                                        </div>
                                        {error? <>{error}</>:null}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                mt: 3,
                                                mb: 2,
                                                borderRadius: 2,
                                                py: 2,
                                                width: "65%",
                                                backgroundColor: "#5A00E2"
                                            }}
                                            onClick={checkFields2}
                                            // onClick={() => {
                                            //     setMode(0)
                                            //     setTopPadding(6)
                                            //     setBottomTopPadding(45)
                                            //
                                            // }}
                                            // href="/dashboard"
                                        >
                                            Continue
                                        </Button>
                                    </> : null}

                                {mode === 0 ? <BrandName sx={{pt: 1}}/>
                                    : mode === 1 ? <div style={{
                                            paddingTop: 4, paddingRight: 76, width: '100%', display: 'flex',
                                            justifyContent: 'center', paddingLeft: 64
                                        }}>
                                                {"Didn't receive code? "}
                                                <div style={{color: "#5A00E2", display: "inline", cursor:"pointer"}}
                                                onClick={()=>{
                                                    setMode(0)
                                                    setTopPadding(6)
                                                    setBottomTopPadding(45)
                                                }}>Resend</div>

                                        </div>
                                        : null}

                                <Divider variant="middle"/>

                                <div style={{
                                    width: '100%', display: 'flex', paddingTop: bottomTopPadding, fontSize: 14,
                                    justifyContent: 'space-around', paddingLeft: 125, paddingRight: 125
                                }}>
                                    <div>Terms of Service</div>
                                    <div>Terms of Use</div>
                                    <div>Privacy Policy</div>
                                </div>
                                <Copyright sx={{pt: 1}}/>

                            </Box>
                        </Box>


                    </Grid>
                </Grid>
            </ThemeProvider>
        );

}

export default SignUp;