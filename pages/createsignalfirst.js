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
import { useState,useEffect } from 'react';
import { getPublicDatasets,createUserDataset } from '../function/users';

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

export default function CreateSignalFirst({
  token, 
  setToken, 
  dataset, 
  setDataset,
  setUserdatasets, 
  userdatasets}) {
  const handleOpen = () => setOpen(true);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [localdataset, setLocaldataset] = React.useState({title: '', description: '', topic: ''});

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setProgress((oldProgress) => {
  //       if (oldProgress === 100) {
  //         return 0;
  //       }
  //       const diff = Math.random() * 10;
  //       return Math.min(oldProgress + diff, 100);
  //     });
  //   }, 500);

  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);

  const handleAddData = async () => {
    setLocaldataset({title, description, topic});
    setDataset({...dataset,...localdataset});

      if(token!==null){
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
        console.log("created dataset",data);
      }
    console.log("added details",dataset);
  };
  
  return (
    
    <Box>
      <Navbar token={token} setToken={setToken}/>
      
      <Box sx={{ width: '100%', px:16,py:2,}}>
          <p>Step 1 of 3</p>
          <LinearProgress variant="determinate" value={33} sx={{height:'2vh', 
          backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
          color:'linear-gradient(to right,#094a98, #4e0c98)'}} />
      </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:24,pl:16, py:2}}>
                    <div>CREATE DATASET &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2}}>
                    <div>BASIC INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Enter a title and description for your signal.</div>
                </Box>

                <Box sx={{display:'flex',px:16, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <TextField
                      variant="outlined"
                      value={title}
                      onChange={(event)=>setTitle(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Title"
                    />

                    <TextField
                      variant="outlined"
                      value={description}
                      onChange={(event)=>setDescription(event.target.value)}
                      sx={{color:'#fff',pb:2}}
                      rows={4}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="What this data will be doing for you?"
                      multiline
                    />

                    <TextField
                      variant="outlined"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Topic"
                    />
                  </FormControl>

                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>ENTER KEYWORDS &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"Limit the size of your signal by filtering down to a specific geography"}</div>
                </Box>

                <Box sx={{display:'flex',px:16, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <TextField
                      variant="outlined"
                      value={keywords}
                      onChange={(event)=>setKeywords(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Keywords"
                    />
                  </FormControl>
                </Box>


                {/* <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto',pb:4, 
                    color:'gray', fontSize:14,px:16,}}>
                    <div>Estimated Row Count: &nbsp;</div> <div style={{width:122}}>{123?123:<CircularProgress />}</div>
                </Box> */}

                {/* <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>DATA REFRESH FREQUENCY &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"The setting determines how often the data in your signal will be refreshed and thus data points that will be used. Learn about data point usage"}</div>
                </Box>

                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <FormControl sx={{ minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Refresh Frequency Options:</InputLabel>
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
                      <MenuItem value={10}>Manual</MenuItem>
                      <MenuItem value={20}>Daily</MenuItem>
                      <MenuItem value={30}>Weekly</MenuItem>
                      <MenuItem value={30}>Monthly</MenuItem>
                      <MenuItem value={30}>When New Data Available</MenuItem>
                    </Select>
                    </FormControl>
                </Box> */}

      <Box sx={{ display: 'flex',pt:2}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'start',px:14}}>
            <Link  >
              <a>
                <Button variant="contained" size="large" sx={{mx:2,py:3,px:4,
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    endIcon={<CheckIcon />}
                    onClick={()=>handleAddData()}>
                    {"Continue"}</Button>
              </a>
            </Link>
        </Box>
      </Box>
    
      
       <Footer />
    </Box>
  );
}

