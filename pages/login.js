import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
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
import mixpanel from 'mixpanel-browser';
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

const Login =({token, setToken}) => {
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
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    async function signInF(){
        const err = await signIn({email, password});
        setisLoading(false);
        if (err && err.code==="UserNotConfirmedException"){
            await router.push("/reconfirm");
        } else if (err){
            setError(err.message);
        } else {
            setError("");
            mixpanel.track('Logged In', {
                'source': "Data Platform Login Page",
                'signed in': true,
                'email':user.email
            });
            await router.push("/dashboard");
        }
    }

    function checkFields() {
      if (!EMAIL_VALIDATOR.test(email)) {
          setError('Invalid Email ID');
          setUsernameError(true)
          setPasswordError(false)
          console.log("email issue",email.split("@")[1])
      } else if (password.length < 8) {
          setError('Invalid password, must be atleast 8 letter long');
          setPasswordError(true)
          setUsernameError(false)
      } else {
          setError(null);
          setPasswordError(false)
          setUsernameError(false)
          signInF();
      }
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
            backgroundImage: 'url(/doctor-with-stethoscope-hands-hospital-background.jpg)',
            // backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            // backgroundPosition: 'left',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square sx={{display:'flex',
            flexDirection:'column', justifyContent:'space-between', alignItems:'space-between'}}>
            <div style={{paddingTop:42,paddingRight:76,width:'100%',display:'flex',justifyContent:'end'}}>
                <Link sx={{alignSelf:'end'}} href="/signup" variant="body2">
                    {"Don't have an account?"} <div style={{color:"#5A00E2", display:"inline"}}>Sign Up</div>
                </Link>
            </div>
          <Box
            sx={{
              pt: 18,
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
            <div style={{display:'flex',flexDirection:'column', alignItems:'start',width:'100%', }}>
                <div style={{marginLeft:125}}>
                    <div style={{fontSize:30}}>Log In</div>
                    <div style={{fontSize:14}}>Welcome back, you’ve been missed!</div>
                </div>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit}
                 sx={{ pt: 1, display:'flex', flexDirection:'column', alignItems:'center',
                    width:'100%'}}>

                {usernameError ? <TextField
                    error
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText="Incorrect entry."
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
                  /> : <TextField
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
                />}
                  {passwordError ? <TextField
                    error
                    margin="normal"
                    required
                    sx={{width:"65%"}}
                    name="password"
                    label="Enter Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText="Incorrect entry."
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
                        placeholder:"Enter Password"
                    }}
                  />:
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
                  }
                <div style={{paddingLeft:125,display:'flex', width:'100%',}}>
                    <div style={{display:'flex', justifyContent:'space-around' }}>
                        <div>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            sx={{alignSelf:'start', }}
                        />
                        </div>

                        <div style={{paddingLeft:200}}>
                            <Link href="/forgotpassword1" variant="body2">
                                <a>Forgot password?</a>
                            </Link>
                        </div>
                    </div>

                </div>
                {/* {error && <div style={{color:"red"}}>{error}</div>} */}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius:2,py:2,width:"65%",backgroundColor:"#5A00E2" }}
                onClick={()=>checkFields()}
                // href="/dashboard"
              >
                Log In
              </Button>

                <BrandName sx={{ pt: 1 }} />

                <Divider variant="middle" />

                <div style={{width:'100%',display:'flex', paddingTop:150, fontSize:14,
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

export default Login;