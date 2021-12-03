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
import {signIn} from "../function/checkAuth";
import OtpInput from 'react-otp-input';
import mixpanel from 'mixpanel-browser';


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

const SignUp =() => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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


    async function signInF(){
        const err = await signIn({email, password});
        setisLoading(false);
        if (err && err.code==="UserNotConfirmedException"){
            await router.push("/reconfirm");
        } else if (err){
            setError(err.message);
        } else {
            setError("");
            await router.push("/dashboard");
        }
    }

    async function signInFK(){
        setMode(1);
        setTopPadding(28)
        setBottomTopPadding(202)

    }

  return (
    <ThemeProvider theme={theme}>

      <Grid container component="main" sx={{ height: '100vh', font:'roboto' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(/login-background.jpg)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            // backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{display:'flex',
            flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>
            {mode===0?<div style={{paddingTop:42,paddingRight:76,width:'100%',display:'flex',justifyContent:'end'}}>
                <Link sx={{alignSelf:'end'}} href="/login" variant="body2">
                    {"Already have an account?"} <div style={{color:"#5A00E2", display:"inline"}}>Log In</div>
                </Link>
            </div>:mode===1?null:null}
          <Box
            sx={{
              pt: topPadding,
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
                width:'100%',
                height:'100%'

            }}
          >
            {/*<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>*/}
            {/*  <ScreenLockPortraitOutlinedIcon />*/}
            {/*</Avatar>*/}
              {mode===0?<div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                <div style={{marginLeft:125}}>
                    <div style={{fontSize:30}}>Sign Up</div>
                    <div style={{fontSize:14}}>Welcome, we're really excited to onboard you!</div>
                </div>
            </div>:mode===1?<>
              <div style={{color:"#5A00E2", alignSelf:'center',marginBottom:35}}>
                  <LockIcon sx={{transform: "scale(4)"}} />
              </div>
              <div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                      <div style={{marginLeft:125}}>
                          <div style={{fontSize:30}}>Verification Code</div>
                          <div style={{fontSize:14}}>We've sent a verification code to your email address: user@Example.com
                          </div>
                      </div>
                  </div></>:null}
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                {mode===0?<><TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="email"
                    label="Full Name"
                    name="full-name"
                    autoComplete="full-name"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Your Name"
                    }}
                  />

                <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="company"
                    label="Company Name"
                    name="company"
                    autoComplete="company"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <BusinessIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Company Name"
                    }}
                />

                <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Email Address"
                    }}
                />

                  <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    name="password"
                    label="Enter Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Enter Password"
                    }}
                  />

                <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="confirmPassword"
                    id="confirmpassword"
                    autoComplete="confirmPassword"
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Confirm Password"
                    }}
                />

              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                onClick={signInFK}
                // href="/dashboard"
              >
                Log In
              </Button></>
            :mode===1?<>
                        <div style={{width:'100%', paddingLeft:125,paddingRight:100, paddingTop:12}}>
                            <OtpInput
                                inputStyle={{alignSelf:'center',display:'flex',
                                    width:'60%', height:'7vh'}}
                            value={otp}
                            onChange={(otp)=>setOtp(otp)}
                            numInputs={6}
                            separator={<span></span>}
                        />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                            onClick={()=> {
                                setMode(0)
                                setTopPadding(6)
                                setBottomTopPadding(45)

                            }}
                            // href="/dashboard"
                        >
                            Continue
                        </Button>
                        </>:null}

                {mode===0?<BrandName sx={{ pt: 1 }} />
                : mode===1?<div style={{paddingTop:4,paddingRight:76,width:'100%',display:'flex',
                            justifyContent:'center', paddingLeft:64}}>
                <Link sx={{alignSelf:'end'}} href="/login" variant="body2">
                    {"Didn't receive code?"} <div style={{color:"#5A00E2", display:"inline"}}>Resend</div>
                </Link>
            </div>
                :null}

                <Divider variant="middle" />

                <div style={{width:'100%',display:'flex', paddingTop:bottomTopPadding, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>
                </div>
                <Copyright sx={{ pt: 1 }} />
            </Box>
          </Box>



        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUp;