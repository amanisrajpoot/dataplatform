import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SignalCardOut from '../../components/SignalCardOut';
import FeatureCard from '../../components/FeatureCard';
import EditFeatureCard from '../../components/EditFeatureCard';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Output from '../../components/output';
import {useRouter} from 'next/router';
import { getDatasetsId, downloadDatasetsId } from '../../function/users';
import DataSourcesDetails from '../../components/datasourcesdetails';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

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
export default function ManageDataset({
  token,
  setToken,
  user,
  dataset,
  setDataset,
  // userdatasets,
  // setUserDatasets,
  dataSources,
  setDataSources,
  addDatasetcatalog,
  removeDatasetcatalog
}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true); handleDownloadButton();};
  const handleClose = () => setOpen(false);
  const [userdatasets, setUserDatasets] = useState([]);
  const [datasetMode, setDatasetMode] = useState(0);
  const [downloadLink, setDownloadLink] = React.useState('');
  const router = useRouter();
  const dataset_id = router.query.did;
  const [addCatalogMode, setAddCatalogMode] = useState(false);
  
  useEffect(async ()=>{
    const dataset = await getDatasetsId(token, dataset_id);
    setUserDatasets(dataset);
    console.log("fetched dataset data",userdatasets);
  }, [token, dataset_id]);

  const handleDownloadButton = async() => {
    const downloadLink = await downloadDatasetsId(token, dataset_id);
    setDownloadLink(downloadLink.url);
  }

  const addLocalDatasetcatalog = (data) => {
    setUserDatasets({...userdatasets,catalog:[...userdatasets.catalog,data]});
    console.log("catalog added",userdatasets)
  };
const removeLocalDatasetcatalog = (data) => {
    const filtered = userdatasets.catalog.filter(item => item.ID !== data.ID);
    setUserDatasets({...userdatasets,catalog:filtered});
    console.log("catalog removed",userdatasets)
  };

  const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

  useEffect(async ()=>{
      mixpanel.track('Viewed Dataset', {
        'source': "Dataset Details Page",
        'scrolled first': true,
      })
    }, [token, dataset_id]);

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
            {datasetMode ===1 ?<Button variant="contained" size="large" sx={{px:7, py:2.5,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<ArrowBackIcon />} onClick={()=>setDatasetMode(0)}>
                    {"Back"}</Button>:
            datasetMode ===0 ?<Button variant="contained" size="medium" sx={{px:2, py:2.5,
              backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                      startIcon={<ArrowBackIcon />} onClick={()=>router.push('/dashboard')}>
                      {"Back to Dashboard"}</Button>:null}

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box>
            <Box>{
              userdatasets !== null && userdatasets !== undefined
              && <SignalCardOut token={token}
              data={userdatasets} datasetMode={datasetMode} setDatasetMode={setDatasetMode} 
              userdatasets={userdatasets} setUserDatasets={setUserDatasets}
              />
            }
            </Box>
              
            {datasetMode === 0 ?<Box sx={{ display: 'flex',pt:4}}>
          
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
                mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',color:"#fff"}}>
                  <Button href="/managesignaloutput" variant="contained" size="large" 
                  sx={{mx:2, py:4,backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
                      }}
                  disabled
                  
                      startIcon={<CheckIcon />} >
                      {"Refresh Data"}</Button>
                  <Button variant="contained" size="large" sx={{mx:2, py:4,
                  backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                      startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                      Output</Button>
                </Box>
            </Box>:null}
          </Box>
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails handleCloseDetails={handleCloseDetails} datasetMode={datasetMode}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog} 
              removeDatasetcatalog={removeDatasetcatalog}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',pt:4, width:'100%'}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4, width:'100%'}}>
          
          <Box component="main" sx={{display:'flex', justifyContent:'space-between', 
              py: 2, px: 4, bgcolor: '#eaeff1', width:'100%', pr:12 }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', justifyContent:'space-between',font:'roboto',px:10}}>
                      <div>{datasetMode === 0? "INCLUDED ":'SELECTED ' }CATALOGS &nbsp;</div>
                  </Box>
              </Typography>

              {datasetMode ===1 ?<Button variant="contained" size="large" sx={{mx:2, py:2.5,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={addCatalogMode ?<CheckIcon />:<AddIcon />} onClick={()=>setAddCatalogMode(!addCatalogMode)}>
                    {addCatalogMode ?"Done":"Add Catalog"}</Button>:null}
              
          </Box>

          <Box sx={{ minWidth: 275, bgcolor: '#eaeff1', display:'flex', flexDirection:'column', pt:1,px: 8, 
              alignItems:'center' }}>
                <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:6 }}>
                {datasetMode === 0 ? userdatasets !== null && userdatasets !== undefined && 
                  userdatasets.catalog !== null && userdatasets.catalog !== undefined &&
                  userdatasets.catalog.map((data)=><FeatureCard 
                  key={data.dataset_id}
                  data={data}
                  datasetMode={datasetMode}
                  dataset={userdatasets}
                  openDetails={openDetails}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails}/>)
                : datasetMode === 1 ?
                  userdatasets !== null && userdatasets !== undefined &&
                  userdatasets.catalog !== null && userdatasets.catalog !== undefined &&
                  userdatasets.catalog.map((data)=><EditFeatureCard 
                  key={data.dataset_id}
                  data={data}
                  datasetMode={datasetMode}
                  dataset={userdatasets}
                  openDetails={openDetails}
                  addLocalDatasetcatalog={addLocalDatasetcatalog}
                  removeLocalDatasetcatalog={removeLocalDatasetcatalog}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails}/>)
                : null}
          </Box>

          </Box>            
        </Box>

        
      </Box>

      {datasetMode === 1 && addCatalogMode === true ?<Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ display:'flex',flexDirection:'row',
            flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>

          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources && dataSources.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={userdatasets.catalog}
                  dataSources={dataSources}
                  removeDatasetcatalog={removeLocalDatasetcatalog}
                  addDatasetcatalog={addLocalDatasetcatalog}
                  />)}
          </Box>
          
        </Box>
      </Box>:null}

      {datasetMode === 0 ?<Box sx={{ display: 'flex', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'row', 
          mb:4, maxHeight:'8vh', minWidth:'24ch',justifyContent:'end',px:14}}>
            <Button href="/dashboard" variant="contained" size="large" sx={{mx:2, py:4,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<CheckIcon />} onClick={handleOpen} disabled>
                    {"Refresh Data"}</Button>
            <Button variant="contained" size="large" sx={{mx:2, py:4,
            backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                    startIcon={<ExitToAppIcon />} onClick={handleOpen}>
                    Output</Button>
        </Box>
      </Box>:null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      <Box sx={{ position: 'absolute', bgColor:'#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width:'70%'}}>  
        <Output data={dataset} downloadLink={downloadLink}/>
      </Box>
      </Modal>


      
       <Footer />
    </Box>
  );
}

