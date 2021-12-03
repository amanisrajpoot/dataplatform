import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
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
import mixpanel from 'mixpanel-browser';
import PasswordStrengthBar from 'react-password-strength-bar';


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

const ResetPassword =() => {

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [top, setTop] = useState(24);

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

    async function resetPassword(){

        setMode(1);
        setTop(36)

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

            {mode===1?()=>setTop(56):null}
          <Box
            sx={{
              pt: top,
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
                width:'100%',
                height:'100%'

            }}
          >

              {mode===0?<div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                <div style={{marginLeft:125}}>
                    <div style={{fontSize:30}}>Set New Password?</div>
                    <div style={{fontSize:14}}>Your Password Must have</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)", }} />At least 8 characters</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)"}}/>One capital letter</div>
                    <div style={{fontSize:14, display:'flex'}}><CheckCircleIcon
                        sx={{transform: "scale(0.8)"}}/>One number or special character</div>
                </div>
            </div>
                  :mode===1?<>

                  <div style={{color:"#5A00E2", alignSelf:'center',marginBottom:35}}>
                      <LockIcon sx={{transform: "scale(4)"}} />
                  </div>

                  <div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                          <div style={{marginLeft:125}}>
                              <div style={{fontSize:30}}>Password Changed</div>
                              <div style={{fontSize:14}}>Your password has been reset.
                              </div>
                          </div>
                      </div>
                  </>
                      :null}
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                {mode===0?<>
                <TextField
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="password"
                    label="Password"
                    name="password"
                    autoComplete="password"
                    autoFocus
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
                        <PasswordStrengthBar style={{width:"65%"}} password={password} minLength={6} />

                    <TextField
                        margin="normal"
                        required
                        sx={{width:"65%"}}
                        id="email"
                        label="Confirm Password"
                        name="confirmPassword"
                        autoComplete="confirmPassword"
                        autoFocus
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                            placeholder:"Confirm Password"
                        }}
                    />
                    </>
                    :null}

                {mode===0?<Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                onClick={resetPassword}
                // href="/dashboard"
              >
                Reset Password
              </Button>
                    :mode===1?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                            onClick={()=>router.push("/login")}
                            // href="/dashboard"
                        >
                            Go to login
                        </Button>
                        :null}

                {mode===0?<div style={{paddingTop:12,paddingRight:76,width:'100%',display:'flex',justifyContent:'start'}}>
                    <Link  href="/login" variant="body2" >
                        <a style={{display:'flex', alignItems:'center',
                            justifyContent:'center', paddingLeft:128}}>
                        <div style={{color:"#5A00E2", marginTop:4}}>{<ArrowBackIosNewIcon fontSize=''small/>}</div>
                        <div style={{color:"#5A00E2", paddingLeft:4 }}>Back to Log In</div>
                        </a>
                    </Link>
                </div>
                    :mode===1?

                null:null}


                <Divider variant="middle" />

                {mode===0?<><div style={{width:'100%',display:'flex', paddingTop:95, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                </div>
                <Copyright sx={{ pt: 1 }} /></>
                    :mode===1?<>
                    <div style={{width:'100%',display:'flex', paddingTop:240, fontSize:14,
                    justifyContent:'space-around', paddingLeft:125, paddingRight:125}}>
                    <div>Terms of Service </div>
                    <div>Terms of Use </div>
                    <div>Privacy Policy </div>

                    </div>
                    <Copyright sx={{ pt: 1 }} /></>
                    :null}
            </Box>
          </Box>



        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default ResetPassword;