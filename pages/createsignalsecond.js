import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import SignalCard from '../components/SignalCard';
import HelpCenterCard from '../components/HelpCenterCard';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Grid } from '@material-ui/core';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FeatureDetails from '../components/FeatureDetails';
import SelectFeatures from '../components/selectFeatures';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



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

export default function CreateSignalSecond() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  return (
    
    <Box>
      <Navbar />

      

        <Box sx={{ display: 'flex', flexDirection:'column', px: 14, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'column', py: 2, bgcolor: 'gray-900', justifyContent:'space-between'}}>
              <Box sx={{ width: '100%', px:6,bgcolor: '#3e3e33',color:"#fff",pb:4}}>
              <p>Step 2 of 2</p>
              <LinearProgress variant="determinate" value={100} sx={{height:'2vh'}} />
               </Box>
            
              
                <Typography color="inherit" variant="h5" component="h1">
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', pl:6}}>
                    <div>MANAGE SIGNAL &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
            </Typography>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box>
            <Box><SelectFeatures /></Box>
            <Box sx={{ display: 'flex',pt:4}}>
        
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
              mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',}}>
                <Button variant="contained" size="large" sx={{mx:2, py:4}}
                    startIcon={<CheckIcon />} onClick={handleOpen}>
                    {"Save & Process"}</Button>
                <Button variant="contained" size="large" sx={{mx:2, py:4}}
                    startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                    Output</Button>
            </Box>
            </Box>
          </Box>
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4, px:8}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1', width:'100%'}}>
                  <Box sx={{ display: 'flex',flexDirection:'row',
                  justifyContent:'space-between',font:'roboto',px:10}}>
                      <div style={{width:'50%', fontSize: 22}}>MATCHING FEATURES &nbsp;</div>
                      <Box style={{ display: 'flex',flexDirection:'row', fontSize:14,
                          font:'roboto', width:'50%', alignItems:'end', justifyContent:'end' }}>
                          <div style={{display:'flex',width:"25%", alignItems:'center',justifyContent:'center'}}>
                              <PersonIcon /> &nbsp;User-Generated
                          </div>

                          <div style={{display:'flex',width:"25%", alignItems:'center',justifyContent:'center',
                              color:'gold'}}>
                              <StarIcon />&nbsp; Favorite
                          </div>

                          <div style={{display:'flex',width:"25%", alignItems:'center',justifyContent:'center'}}>
                              <StarIcon />&nbsp; Recommended
                          </div>
                      </Box>
                  </Box>
          </Box>

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column',py: 6, px: 14, 
              alignItems:'center' }}>
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />

          </Box>            
        </Box>

        
      </Box>

      <Box sx={{ display: 'flex', flexDirection:'column', px: 22, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', pt: 4, 
              bgcolor: 'gray-900', justifyContent:'space-between'}}>
              
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', fontSize:20}}>
                    <div>SELECTED FEATURES &nbsp;</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', pl:6,fontSize:14}}>
                    <div>0 of Unlimited Possible Features Selected (UPGRADE)</div>
                </Box>
          </Box>
          
          <Box sx={{ minWidth: 275, display:'flex', flexDirection:'column',py: 6, 
              alignItems:'center' }}>
                <FeatureCard />
                <FeatureCard />

          </Box>    
      </Box>

        <Box sx={{px:8}}>
              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:14,px:16,py:2}}>
                    <div><b>Rows:</b> &nbsp;</div> <div style={{width:122}}>66,240</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:14,px:16,pb:2}}>
                    <div><b>Data Points:</b> &nbsp;</div> <div style={{width:122}}>To be calculated</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>APPLY RECOMMENDED DS TREATMENTS? &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>

                <Box sx={{display:'flex',flexDirection:'column',px:15,
                  justifyContent:"space-between",width:"100%", bgColor:'#fff',}}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group">
                          <FormControlLabel value="female" control={<Radio />} label="Female" />
                          <FormControlLabel value="male" control={<Radio />} label="Male" />
                          <FormControlLabel value="other" control={<Radio />} label="Other" />
                          <FormControlLabel
                            value="disabled"
                            disabled
                            control={<Radio />}
                            label="other"
                          />
                        </RadioGroup>
                      </FormControl>

                   <div style={{fontSize:14}}>
                     {"Note: You can add & edit features and treatments associated to a signal, after creation"}
                     </div>
                   
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', bgColor:'#fff',
                    py:4,px:12, maxHeight:'14vh', minWidth:'24ch',justifyContent:'start',}}>
                      
                      <Button variant="contained" size="large" sx={{mx:2, py:4}}
                          endIcon={<ArrowForwardIosIcon />} onClick={handleOpen}>
                          Finish</Button>
                </Box>

          </Box>

      
       <Footer />
    </Box>
  );
}

