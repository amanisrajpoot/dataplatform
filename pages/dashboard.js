import {useState, } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import HelpCenterCard from '../components/HelpCenterCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import SignalTable from '../components/SignalTable';
import Modal from '@mui/material/Modal';
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

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => {                               
                              setOpen(false);
                              setOpen2(true);}
  const handleClose = () => setOpen(false);
  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };
  const handleClose2 = (event) => {
    setOpen2(false);
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [dataSources, setDataSources] = React.useState([
    { popular:"1",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    description2:"Information to the health care industry, patients and the public regarding individuals and entities",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"1",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    description2:"Applied Research Network conducts high-priority, multi-institutional research on the prevention & management of acute illnesses.",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"1",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    description2:"Information about FDA-approved human drugs and biological therapeutic products.",
    geo:"Country - Mexico",
    date:"",
    available:"", },
    { popular:"0",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    description2:"Information to the health care industry, patients and the public regarding individuals and entities",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"0",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    description2:"Applied Research Network conducts high-priority, multi-institutional research on the prevention & management of acute illnesses.",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"0",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    description2:"Information about FDA-approved human drugs and biological therapeutic products.",
    geo:"Country - Mexico",
    date:"",
    available:"", }
  ]);
  
  const [predefinedModels, setPredefinedModels] = React.useState([
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
  ]);
  
  return (
    
    <Box>
      <Navbar />
        <Box sx={{ display: 'flex', flexDirection:'column',py: 6, px: 14, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', py: 2, bgcolor: 'gray-900', justifyContent:'space-between'}}>
            <Typography color="inherit" variant="h5" component="h1">
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'space-around'}}>
                    <div>MY DATASETS &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>
            </Typography>

            <Button variant="contained" size="large" sx={{backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                startIcon={<AddIcon />} onClick={handleOpen}>
            Create a Dataset</Button>

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
                                CHOOSE A METHOD
                            </Box>
                            <Box>
                                X
                            </Box>
                        </Box>

                        <div style={{display:"flex", flexDirection:'row', maxHeight:'375px', width:"100%",
                          justifyContent:'center',backgroundColor:'#fff', marginBottom:16 }}>
                               
                                <Link href="/createsignalfirst">
                                <Box sx={{border:2, borderColor:"#000000", 
                                    mx:4,my:4,py:2,px:4, textAlign:'center',}}>
                                  <AddBoxIcon style={{fontSize:96}}/>
                                  <p><b>From Scratch</b><br></br>
                                     Create a new Custom<br></br>
                                     Dataset combining the<br></br>
                                     data sources you want.</p>
                                </Box>
                                </Link>
                                
                                <Divider variant="middle" orientation="vertical" />
                              
                                  <Box sx={{border:2, borderColor:"#000", 
                                    mx:4,my:4,py:2,px:4,textAlign:'center'}}
                                    onClick={handleOpen2}>
                                  <ContentCopyOutlinedIcon style={{fontSize:96}}/>
                                  <p><b>From Predefined Models</b><br></br>
                                      Create a new<br></br>
                                     Dateset based on<br></br>
                                     predefined domain models.</p>
                                </Box>  
                      </div>
                      </Grid>
                  </Box>
                </Modal>

                <Modal
                  open={open2}
                  onClose={handleClose2}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style2}>
                      <Grid sx={{display:'flex', flexDirection:'column', width:'100%' }}>
                        <Box sx={{display:'flex', flexDirection:"row", fontSize:20, fontWeight:600,
                            justifyContent:'space-between'}}>
                            <Box>
                                CHOOSE A MODEL
                            </Box>
                            <Box>
                                X
                            </Box>
                        </Box>

                        <div style={{display:"flex", flexDirection:'row', maxHeight:'650px', width:"100%",
                          justifyContent:'center',backgroundColor:'#fff', marginBottom:16, fontSize:14,
                          flexWrap:"wrap" }}>
                               
                               {predefinedModels.map((model)=><Link href="/managesignal" style={{width:'33%'}}>
                               <Box sx={{border:2, borderColor:"#000", 
                                    mx:4,my:2,py:2,px:4,textAlign:'center'}}
                                    onClick={()=>handleOpen2} >
                                    <ContentCopyOutlinedIcon style={{fontSize:75}}/>
                                  <p><b>{model.title}</b><br></br>
                                      {model.body}</p>
                                  </Box>
                                </Link>)}
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
                      <div>Explore Healthcare Data Platform &nbsp;</div>
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
            
            <Box>
                <Button sx={{minWidth:'55px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}>
                    <SearchIcon sx={{ fontSize: 25, color:'white' }}/>
                </Button>

            </Box>
          </Box>
          </Box>
          
        </Box>

      </Box>


      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Popular Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources.map((data)=><FeatureCard 
                  popular={data.popular}
                  title={data.title}
                  key={data.title}
                  description={data.description}
                  description2={data.description2}
                  geo={data.geo}
                  date={data.date}
                  available={data.available} />)}
          </Box>
          
        </Box>

        
      </Box>
    
      {/* <Box sx={{  minHeight: '23vh', }}>        
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
                description={"Learn about how Data Platform works. Information for new users."}
                linkText={'How to Create a Custom Dataset?'}
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
    </Box>   */}
       <Footer />

       
    </Box>
  );
}

