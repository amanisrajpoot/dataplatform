import {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import HelpCenterCard from '../components/HelpCenterCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SignalTable from '../components/SignalTable';
import Modal from '@mui/material/Modal';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';


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

export default function Dashboard() {
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
                    <div>MY SIGNALS &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
            </Typography>

            <Button variant="contained" size="large" startIcon={<AddIcon />} onClick={handleOpen}>
            Create a Signal</Button>

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                      <Grid sx={{display:'flex', flexDirection:'column', width:'100%' }}>
                        <Box sx={{display:'flex', flexDirection:"row", fontSize:20, fontWeight:600,
                            justifyContent:'space-between'}}>
                            <Box>
                                CHOOSE A SIGNAL TYPE
                            </Box>
                            <Box>
                                X
                            </Box>
                        </Box>

                        <div style={{display:"flex", flexDirection:'row', maxHeight:'325px', width:"100%",
                          justifyContent:'space-around',backgroundColor:'#fff', marginBottom:16 }}>
                               
                                <div style={{border:5, borderColor:"#000", textAlign:'center'}}>
                                  <AddBoxIcon style={{fontSize:125}}/>
                                  <p><b>From Scratch</b><br></br>
                                     Create a new Signal<br></br>
                                     combining the date<br></br>
                                     sources you want.</p>
                                </div>

                                <Divider variant="middle" orientation="vertical" />
                              
                                <div style={{border:5, borderColor:"#000", textAlign:'center'}}>
                                  <ContentCopyOutlinedIcon style={{fontSize:125}}/>
                                  <p><b>From Template</b><br></br>
                                     Create a new Signal<br></br>
                                     based on pre-<br></br>
                                     defined models.</p>
                                </div>
                                
                      </div>
                      </Grid>
                  </Box>
                </Modal>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            <SignalTable />
      
      </Box>


      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>
            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>EXPLORE FEATURES &nbsp;</div>
                      <div><HelpOutlineIcon /></div>
                  </Box>
              </Typography>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'1', py: 2, px: 8, bgcolor: '#eaeff1'

            }}
            noValidate
            autoComplete="off"
          >
            <Box component="main" sx={{  minWidth: '25vw', px:2}}>
                <TextField fullWidth id="outlined-basic" variant="outlined" label="Keyword" sx={{ bgcolor: '#ffffff'}}/>
            </Box>
            <Box component="main" sx={{ bgcolor: '#eaeff1',minWidth: '25vw', px:2 }}>
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">Industry</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={industry}
                        label="Industry"
                        onChange={handleChangeIndustry}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                        <MenuItem value={"Select Industry"}>---Select Industry---</MenuItem>
                        <MenuItem value={'B2B Sales'}>B2B Sales</MenuItem>
                        <MenuItem value={'CPG'}>CPG</MenuItem>
                        <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
                        <MenuItem value={'Insurance'}>Insurance</MenuItem>
                        <MenuItem value={'Real Estate'}>Real Estate</MenuItem>
                        <MenuItem value={'Retail'}>Retail</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
            </Box>
            <Box component="main" sx={{  bgcolor: '#eaeff1',minWidth: '25vw', px:2 }}>
                <Box sx={{  }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label" >Analysis</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={analysis}
                        label="Analysis"
                        onChange={handleChangeAnalysis}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                        <MenuItem value={"Select Analysis"}>---Select Analysis---</MenuItem>
                        <MenuItem value={'Cassification'}>Cassification</MenuItem>
                        <MenuItem value={'Forecasting'}>Forecasting</MenuItem>
                        <MenuItem value={'Impact Analysis'}>Impact Analysis</MenuItem>
                        <MenuItem value={'Scoring'}>Scoring</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
            </Box>

            <Box>
                <Box sx={{minWidth:'55px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',}}>
                    <SearchIcon sx={{ fontSize: 25, color:'white' }}/>
                  </Box>

            </Box>
          </Box>
          </Box>
          
        </Box>

      </Box>


      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <CssBaseline />

        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>POPULAR FEATURES &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />
                <FeatureCard />

          </Box>
          
        </Box>

        
      </Box>
    
      <Box sx={{  minHeight: '23vh', }}>
        
        <CssBaseline />
        
        <Box component="main" sx={{ flex: 1, pt:6, px: 4, bgcolor: '#ffffff' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>HELP CENTER &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box component="main" sx={{ py:4,bgcolor: '#ffffff' }}>

            <Box sx={{ 
                    minheight:275, my:1, px:16, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between', alignSelf:'center' }}>
             <HelpCenterCard 
                title={"GETTING STARTED"}
                description={"Learn about how Ready Signal works. Information for new users."}
                linkText={'How to Create a Signal'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"GEOGRAPHIC AND TIME GRAINS"}
                description={"Learn what Geographic and Time grains are and how they work."}
                linkText={'Data Grains Explained'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"DATA SCIENCE TREATMENTS"}
                description={"Learn about the different data science treatments you can apply to your signals."}
                linkText={'Overview of Data Science Treatments'}
                link={'#'}
                all={'See all articles'}/>

            </Box>
        </Box>
    </Box>  
       <Footer />
    </Box>
  );
}

