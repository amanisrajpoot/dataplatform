import {useState, } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FeatureCard from '../components/FeatureCard';
import CheckIcon from '@mui/icons-material/Check';
import SelectFeatures from '../components/selectFeatures';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcedetails';



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
export default function CreateSignalSecond({token, setToken, dataset, addDataset, removeDataset}) {
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

  const [dataSources, setDataSources] = useState([dataset.catalog]);
  const [dataSources2, setDataSources2] = React.useState([
    {   
        dataset_id:"24",
        user_email:'',
        title:"Insurance Companies LEIE ",
        description:"List of Excluded Individuals/Entities (LEIE)",
        features:"",
        row_count:'68',
        data_points:'369',
        address:'',
        base_adress:'',
        ranges: '',
        data_sources:'',  
        template_id:'',
        refreshed_at:'6 Oct',
   },
    { dataset_id:"25",
    user_email:'',
    title:"Insurance Companies LEIE ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'6 Oct',
   },
    { dataset_id:"29",
    user_email:'',
    title:"Insurance Companies LEIE ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'6 Oct',
   },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct',
    },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct', },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct', }
  ]);

  const [matchingDataSources, setMatchingDataSources] = React.useState([
    { popular:"1",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    topics:"FDA, Medication or Drugs,Physician (or Doctors)",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"1",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    topics:"FDA,Medication or Drugs,Physician (or Doctors)",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"1",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    topics:"FDA,Medication or Drugs,Physician (or Doctors),",
    geo:"Country - Mexico",
    date:"",
    available:"", },
    { popular:"0",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    topics:"Information to the health care industry, patients and the public regarding individuals and entities",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"0",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    topics:"Applied Research Network conducts high-priority, multi-institutional research on the prevention & management of acute illnesses.",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"0",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    topics:"Information about FDA-approved human drugs and biological therapeutic products.",
    geo:"Country - Mexico",
    date:"",
    available:"", }
  ]);

  const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };
  
  return (
    
    <Box>
      <Navbar token={token} setToken={setToken}/>
        <Box sx={{ display: 'flex', flexDirection:'column', px: 12, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'column', py: 2, 
              bgcolor: 'gray-900', justifyContent:'space-between'}}>
              <Box sx={{ width: '100%', px:6,bgcolor: '#3e3e33',color:"#fff",pb:4}}>
                  <p>Step 3 of 3</p>
                  <LinearProgress variant="determinate" value={100} sx={{height:'2vh',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
                color:'linear-gradient(to right,#094a98, #4e0c98)'}} />
              </Box>
            
              <Box sx={{display:'flex', justifyContent:'space-between'}}>
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', pl:6, fontSize:22}}>
                    <div>ADD CATALOGS &nbsp;</div>
                    <div><HelpOutlineIcon /></div>
                </Box>

              </Box>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> 
          <Box>
            <Box><SelectFeatures /></Box>
            <Box sx={{ display: 'flex',pt:4}}>
        
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
              mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'start',
              pl:30}}>
                <Button variant="contained" size="large" sx={{mx:2, py:4,
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<CheckIcon />} onClick={handleOpen}>
                    {"Explore"}</Button>

            </Box>
            </Box>
          </Box>*/}
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails handleCloseDetails={handleCloseDetails}
              data={dsDetails}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', flexDirection:'column', px: 18, bgcolor: '#3e3e33'}}>
          <Box sx={{ display: 'flex', flexDirection:'row', pt: 4, 
              bgcolor: 'gray-900', justifyContent:'space-between'}}>
              
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', fontSize:20}}>
                    <div>SELECTED CATALOGS &nbsp;</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'white',justifyContent:'start', pl:6,fontSize:14}}>
                    <div>0 of Unlimited Possible Catalogs Selected (UPGRADE)</div>
                </Box>
          </Box>
          
          <Box sx={{ minWidth: 275, display:'flex', flexDirection:'column',py: 6, 
              alignItems:'center' }}>
                {dataSources.map((data)=><FeatureCard 
                  key={data.dataset_id}
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  addDataset={addDataset}
                  removeDataset={removeDataset}
                  addDatasetcatalog={addDatasetcatalog}/>)}
            
          </Box>    
      </Box>

      {/* <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4, px:8}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1', width:'100%'}}>
                  <Box sx={{ display: 'flex',flexDirection:'row',
                  justifyContent:'space-between',font:'roboto',px:10}}>
                      <div style={{width:'50%', fontSize: 22}}>RECOMENDED CATALOGS &nbsp;</div>
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

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column',py: 6, px: 10, 
              alignItems:'center' }}>
                {matchingDataSources.map((data)=><FeatureCard 
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

        
      </Box> */}

        <Box sx={{px:3}}>
              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:14,px:15,py:2}}>
                    <div><b>Rows:</b> &nbsp;</div> <div style={{width:122}}>66,240</div>
                </Box>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', 
                    color:'gray', fontSize:14,px:15,pb:2}}>
                    <div><b>Data Points:</b> &nbsp;</div> <div style={{width:122}}>To be calculated</div>
                </Box>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', bgColor:'#fff',
                    py:4,px:13, maxHeight:'24vh', minWidth:'24ch',justifyContent:'start',}}>
                      
                      <Link href="/managesignal"><Button variant="contained" size="large" sx={{mx:2, py:2,
                        backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', width:175,height:64,}}
                          endIcon={<ArrowForwardIosIcon />} onClick={handleOpen}>
                          Finish</Button>
                      </Link>
                </Box>

          </Box>

       <Footer />
    </Box>
  );
}

