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

export default function CreateSignalFirst() {
  const handleOpen = () => setOpen(true);
  const [progress, setProgress] = React.useState(50);
  const [age, setAge] = React.useState('');

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

  
  return (
    
    <Box>
      <Navbar />
      
      <Box sx={{ width: '100%', px:16,py:2,}}>
          <p>Step 1 of 2</p>
          <LinearProgress variant="determinate" value={progress} sx={{height:'2vh'}} />
      </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:24,pl:16, py:2}}>
                    <div>CREATE DATASET &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2}}>
                    <div>BASIC INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Enter a name and description for your signal.</div>
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
                    <div>TOPIC &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Used to recommend features and data treatment techniques to consider</div>
                </Box>
                
                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <FormControl variant="outlined" sx={{ minWidth: '50%' }}>
                    <InputLabel htmlFor="demo-simple-select-filled">Topic:</InputLabel>
                      <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    >
                      <MenuItem value={10}>---Select Topic---</MenuItem>
                      <MenuItem value={20}>Drugs</MenuItem>
                      <MenuItem value={30}>Physician Practices</MenuItem>
                      <MenuItem value={40}>Healthcare</MenuItem>
                      <MenuItem value={50}>Insurance</MenuItem>
                      <MenuItem value={60}>Other</MenuItem>

                    </Select>
                    </FormControl>

                    {/* <FormControl variant="outlined" sx={{ width: '50%' }}>
                    <InputLabel htmlFor="demo-simple-select-filled">Analysis:</InputLabel>
                      <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      value={age}
                      onChange={handleChange}
                      sx={{ bgColor:'#fff',pb:2, width:'97%',height:56}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Name"
                    >
                      <MenuItem value={10}>---Select Analysis---</MenuItem>
                      <MenuItem value={20}>Classification</MenuItem>
                      <MenuItem value={30}>Impact Analysis</MenuItem>
                      <MenuItem value={30}>Scoring</MenuItem>
                      <MenuItem value={30}>Other</MenuItem>

                    </Select>
                    </FormControl> */}

                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>FILTER RESULTS &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"Limit the size of your signal by filtering down to a specific geography"}</div>
                </Box>

                <Box sx={{display:'flex',flexDirection:'row',px:16,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    {/* <FormControl sx={{ minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Specify Geography:</InputLabel>
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
                      <MenuItem value={10}>All Available</MenuItem>
                      <MenuItem value={20}>Filter by States</MenuItem>
                      <MenuItem value={30}>Filter by Zips</MenuItem>
                    </Select>
                    </FormControl> */}

                    {false?
                    <FormControl sx={{ minWidth: '50%' }}>
                    <InputLabel id="demo-simple-select-helper-label">Select States:</InputLabel>
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
                      <MenuItem value={10}>Alabama</MenuItem>
                      <MenuItem value={20}>Alaska</MenuItem>
                      <MenuItem value={30}>Arizona</MenuItem>
                      <MenuItem value={30}>Indiana</MenuItem>
                    </Select>
                    </FormControl>
                    :true?
                    <FormControl variant="filled" sx={{ minWidth: '50%' }}>
                      <InputLabel >Enter Keywords</InputLabel>
                      <TextField
                      
                      sx={{color:'#fff',bgColor:"red",pb:2,width:'95%',}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                    </FormControl>
                    :""}
                    
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto',pb:4, 
                    color:'gray', fontSize:14,px:16,}}>
                    <div>Estimated Row Count: &nbsp;</div> <div style={{width:122}}>{123?123:<CircularProgress />}</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>DATA REFRESH FREQUENCY &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"The setting determines how often the data in your signal will be refreshed and thus data points that will be used. Learn about data point usage"}</div>
                </Box>

                <Box sx={{display:'flex',flexDirection:'row',px:16, pb:4,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',color:'#fff'}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
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
                </Box>

      <Box sx={{ display: 'flex',pt:2}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'start',px:14}}>
            <Button variant="contained" size="large" sx={{mx:2, py:4}}
                endIcon={<CheckIcon />} href="/createfeature">
                {"Continue"}</Button>
  
        </Box>
      </Box>
    
      
       <Footer />
    </Box>
  );
}

