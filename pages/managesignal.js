import {useState, } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SignalCard from '../components/SignalCard';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FeatureDetails from '../components/FeatureDetails';

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

export default function ManageSignal() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <Box sx={{ display: 'flex', flexDirection:'column',py: 6, px: 14, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', py: 2, bgcolor: 'gray-900', justifyContent:'space-between'}}>
            <Typography color="inherit" variant="h5" component="h1">
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'space-around'}}>
                    <div>MANAGE DATASET &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
            </Typography>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box>
            <Box><SignalCard /></Box>
            <Box sx={{ display: 'flex',pt:4}}>
        
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
              mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',}}>
                <Button href="/managesignaloutput" variant="contained" size="large" sx={{mx:2, py:4}}
                    startIcon={<CheckIcon />} onClick={handleOpen}>
                    {"Save & Process"}</Button>
                {/* <Button href="/signaloutput" variant="contained" size="large" sx={{mx:2, py:4}}
                    startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                    Output</Button> */}
            </Box>
            </Box>
          </Box>
          
      
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', justifyContent:'space-between',font:'roboto',px:10}}>
                      <div>SELECTED CATALOGS &nbsp;</div>
                      <Button variant="contained" size="large" sx={{mx:2, py:2}}
                          startIcon={<AddIcon />} onClick={handleOpen}>
                          Add Catalog</Button>
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column',pt: 6, px: 14, 
              alignItems:'center' }}>
                <FeatureDetails />
                <FeatureDetails />
                <FeatureDetails />
                <FeatureDetails />

          </Box>            
        </Box>

        
      </Box>

      <Box sx={{ display: 'flex', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',px:14}}>
            <Button href="/managesignaloutput" variant="contained" size="large" sx={{mx:2, py:4}}
                startIcon={<CheckIcon />} onClick={handleOpen}>
                {"Save & Process"}</Button>
            {/* <Button href="signaloutput" variant="contained" size="large" sx={{mx:2, py:4}}
                startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                Output</Button> */}
        </Box>
      </Box>
    
      
       <Footer />
    </Box>
  );
}

