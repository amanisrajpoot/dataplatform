import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import mixpanel from 'mixpanel-browser';
import {confirmSignUp, signIn, signUp} from "../function/checkAuth";
import {createUser} from "../function/users";

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

const AccountCreated =({name, setName, email, setEmail, company, setCompany, token, setToken}) => {
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
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const [mode, setMode] = useState(0);
    const [top, setTop] = useState(36);

    useEffect(async()=> {
        console.log("usercompany", company)
        const erro = await createUser({
            email,
            //phone: '+1' + phone,
            name,
            company,
            token

        });

        setError(erro);
        console.log('server error', erro)
        //setMode(0);
    },[])

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
                    <div style={{fontSize:36}}>{error === null ? "Loading...": error}</div>

        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default AccountCreated;