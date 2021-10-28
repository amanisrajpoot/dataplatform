import {useState, } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';``
import SelectFeatures from '../components/selectFeatures';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

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

export default function Explore() {
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

        <Box sx={{ display: 'flex', flexDirection:'column', pl: 14, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'column', py: 2, bgcolor: 'gray-900', 
              justifyContent:'space-between'}}>
              
                <Box sx={{ display: 'flex', flexDirection:'row', 
                    font:'roboto', fontSize:26, 
                    color:'white',justifyContent:'start', pl:6, py:2}}>
                    <div>EXPLORE CATALOGS &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
                
          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box sx={{width:'100%'}}>
            <SelectFeatures />
            <Box sx={{ display: 'flex',pt:4}}>
        
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
              mb:4, maxHeight:'8vh', minWidth:'24ch',
              px:32}}>
                <Button variant="contained" size="large" sx={{mx:2,px:4, py:4}}
                     onClick={handleOpen}>
                    {"Explore"}</Button>

            </Box>
            </Box>
          </Box>
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4, px:8}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1', width:'100%'}}>
                  <Box sx={{ display: 'flex',flexDirection:'row',
                  justifyContent:'space-between',font:'roboto',px:10}}>
                      <div style={{width:'50%', fontSize: 22}}>MATCHING CATALOGS &nbsp;</div>
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

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column',py:2, px: 14, 
              alignItems:'center' }}>
                <FeatureCard 
                  popular="1"
                  title="Insurance Companies LEIE    "
                  description="List of Excluded Individuals/Entities (LEIE)"
                  description2="Information to the health care industry, patients and the public regarding individuals and 
                  entities"
                  geo="Country - USA"
                  date=""
                  available="" />
                <FeatureCard 
                  popular="1"
                  title="PECARN "
                  description="PECARN, the Pediatric Emergency Care"
                  description2="Applied Research Network conducts high-priority, multi-institutional research on the prevention & 
                  management of acute illnesses."
                  geo="Country - USA"
                  date=""
                  available=""/>
                <FeatureCard 
                  popular="1"
                  title="Drugs at FDA"
                  description="Information about FDA-approved "
                  description2="Information about FDA-approved human drugs and biological therapeutic products."
                  geo="Country - USA"
                  date=""
                  available=""/>
                  <FeatureCard 
                  popular="0"
                  title="Insurance Companies LEIE    "
                  description="List of Excluded Individuals/Entities (LEIE)"
                  description2="Information to the health care industry, patients and the public regarding individuals and 
                  entities"
                  geo="Country - USA"
                  date=""
                  available="" />
                <FeatureCard 
                  popular="0"
                  title="PECARN "
                  description="PECARN, the Pediatric Emergency Care"
                  description2="Applied Research Network conducts high-priority, multi-institutional research on the prevention & 
                  management of acute illnesses."
                  geo="Country - USA"
                  date=""
                  available=""/>
                <FeatureCard 
                  popular="0"
                  title="Drugs at FDA"
                  description="Information about FDA-approved "
                  description2="Information about FDA-approved human drugs and biological therapeutic products."
                  geo="Country - USA"
                  date=""
                  available=""/>

          </Box>            
        </Box>

        
      </Box>
      
       <Footer />
    </Box>
  );
}

