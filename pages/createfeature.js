import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CreateFeature() {
  const handleOpen = () => setOpen(true);
  const [progress, setProgress] = React.useState(50);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  return (
    
    <Box>
      <Navbar />
      
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:24,pl:16, py:4}}>
                    <div>CREATE NEW CATALOG &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, pb:2}}>
                    <div>BASIC INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Enter a name and description for your feature.</div>
                </Box>

                <Box sx={{display:'flex',px:16, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <TextField
                      variant="outlined"
                      value={""}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    />

                    <TextField
                      variant="outlined"
                      value={""}
                      sx={{color:'#fff',pb:2}}
                      rows={4}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Description"
                      multiline
                    />
                  </FormControl>

                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2}}>
                    <div>ADVANCED INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Define more advanced parameter for your feature</div>
                </Box>
                
                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <FormControl variant="outlined" sx={{ minWidth: '50%' }}>
                    <InputLabel htmlFor="demo-simple-select-filled">Time Grain:</InputLabel>
                      <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    >
                      <MenuItem value={10}>---Select Time Grain---</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                    </FormControl>

                    <FormControl variant="outlined" sx={{ width: '50%' }}>
                    <InputLabel htmlFor="demo-simple-select-filled">Geography Grain:</InputLabel>
                      <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    >
                      <MenuItem value={10}>---Select Geo Grain---</MenuItem>
                      <MenuItem value={20}>State</MenuItem>
                      <MenuItem value={30}>Country</MenuItem>

                    </Select>
                    </FormControl>
                </Box>

                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <FormControl variant="outlined" sx={{ minWidth: '50%' }}>
                    <InputLabel htmlFor="demo-simple-select-filled">Roll Up Method:</InputLabel>
                      <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    >
                      <MenuItem value={10}>---Select Roll Up Method---</MenuItem>
                      <MenuItem value={20}>Month</MenuItem>
                      <MenuItem value={30}>Year</MenuItem>
                    </Select>
                    </FormControl>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>FILE UPLOAD &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"*Download our template and fill it with you custom data"}</div>
                </Box>

                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <FormControl sx={{ minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-helper-label">File Upload</InputLabel>
                      <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={age}
                      label="Name"
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //inputProps={{ 'aria-label': 'Without label' }}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    >
                      <MenuItem value={10}>---Select File to Upload</MenuItem>
                    </Select>
                    </FormControl>

                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
                       maxHeight:'8vh', minWidth:'24ch',justifyContent:'start',}}>
                        <Button variant="contained" size="large" sx={{}}
                            startIcon={<FileDownloadIcon />} href="/createsignalsecond">
                            {"Download Template File"}</Button>
  
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>Notes: &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"The file data should follow the following constraints:"}</div>
                    <ul>
                        <li>For the time grain information:</li>
                        <ul style={{fontSize:14, paddingBottom:4}}>
                            <li>Monthly - Format (YYYY-MM-DD);</li>
                            <li>Yearly -  Format (YYYY-MM-DD).</li>
                        </ul >
                        <li >For the geo grain information:</li>
                        <ul style={{fontSize:14}}>
                            <li>State - Only two letters format with the abbreviation of each State (AL, MI, IN, ...);</li>
                            <li>Country.</li>
                        </ul>
                    </ul>
                </Box>

      <Box sx={{ display: 'flex',pt:2}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'start',px:14}}>
            <Button variant="contained" size="large" sx={{mx:2, py:4}}
                endIcon={<CheckIcon />} href="/createsignalsecond">
                {"Create New CATALOG"}</Button>
  
        </Box>
      </Box>
    
      
       <Footer />
    </Box>
  );
}

