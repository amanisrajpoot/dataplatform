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
import CheckIcon from '@mui/icons-material/Check';
import SelectFeatures from '../components/selectFeatures';
import LinearProgress from '@mui/material/LinearProgress';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcedetails';
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
export default function CreateSignalSecond({
  token, 
  setToken, 
  dataset, 
  setDataset, 
  addDatasetcatalog,
  removeDatasetcatalog,
}) {
 
  const handleOpen = () => setOpen(true);

  const [dataSources, setDataSources] = useState([dataset.catalog]);

  const [localDataset, setLocalDataset] = useState([]);
  const [searching4, setSearching4] = useState([]);

  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

  useEffect(() => {
    setLocalDataset(dataset);
    console.log("updated dataset",localDataset);
  }, [dataset]);
    
  const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

    const handleSendData = () => {
      async () => {
        if(token!==null){
          const data = await createUserDataset({
            token,
            dataset
          });
          setUserdatasets(data);
          console.log("created dataset",data);
        }
      }
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
                {searching4 && searching4.map((data)=><FeatureCard 
                  key={data.dataset_id}
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog}/>)}
            
          </Box>    
      </Box>

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
                      
                      {/* <Link href="/managesignal"> */}
                      <Link>
                        <Button variant="contained" size="large" sx={{mx:2, py:2,
                        backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', width:175,height:64,}}
                          endIcon={<ArrowForwardIosIcon />} onClick={handleOpen}
                          onClick={()=>handleSendData()}>
                          Finish</Button>
                      </Link>
                </Box>

          </Box>

       <Footer />
    </Box>
  );
}

