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
import {getDatasetsId, downloadDatasetsId, getUser, deleteUserDataset, updateUserDataset} from '../../function/users';
import DataSourcesDetails from '../../components/datasourcesdetails';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import LeftNav from "../../components/LeftNav";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {signOut} from "../../function/checkAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import Divider from "@mui/material/Divider";
import SettingsIcon from "@mui/icons-material/Settings";
import CachedIcon from '@mui/icons-material/Cached';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GetAppIcon from '@mui/icons-material/GetApp';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import DatasetDraftCard from "../../components/DatasetDraftCard";
import InputBase from '@mui/material/InputBase';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

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
  border: '1px solid #000',
  boxShadow: 24,
    borderRadius:4,
  p: 4,
};
export default function ManageDataset({
  token,
  setToken,
  dataset,
  setDataset,
  userdatasets,
  setUserDatasets,
  dataSources,
  setDataSources,
  addDatasetcatalog,
  removeDatasetcatalog
}) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {setOpen(true); handleDownloadButton();};
  const handleClose = () => setOpen(false);
  const [userdataset, setUserDataset] = useState([]);
  const [datasetMode, setDatasetMode] = useState(0);
  const [downloadLink, setDownloadLink] = React.useState('');
  const router = useRouter();
  const dataset_id = router.query.did;
  const [addCatalogMode, setAddCatalogMode] = useState(false);
  const [keyword, setKeyword] = useState('')
    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');
    const [localTopic, setLocalTopic] = useState('');
    const [localDataset, setLocalDataset] = useState({});

    useEffect(() => {
        if(userdataset !== null && userdataset !== undefined) {
            setLocalTitle(userdataset.title);
            setLocalDescription(userdataset.description);
            setLocalTopic(userdataset.topic);
            setLocalDataset(userdataset)
        }
    }, [userdataset])

    async function deleteF(dataF){
        console.log(dataF)
        const data = await deleteUserDataset({token, data:dataF});
        if(data){
            window.open("/dashboard", "_self")
        }
    }

    useEffect(() => {
        setLocalDataset({...userdataset, title:localTitle, description:localDescription,topic:localTopic});
    }, [localTitle, localDescription, localTopic]);

    async function updateF(dataF){
        setLocalDataset({...dataF, title:localTitle, description:localDescription,topic:localTopic});
        console.log("updated dataset data", localDataset)
        const data = await updateUserDataset({token, data:localDataset});
        if(data){
            window.open("/dataset1/"+localDataset.ID, "_self")
        }
    }
  
  useEffect(async ()=>{
    const dataset = await getDatasetsId(token, dataset_id);
    setUserDataset(dataset);
    console.log("fetched dataset data",userdataset);
  }, [token, dataset_id]);

  const handleDownloadButton = async() => {
    const downloadLink = await downloadDatasetsId(token, dataset_id);
    setDownloadLink(downloadLink.url);
  }

  const addLocalDatasetcatalog = (data) => {
    setUserDataset({...userdataset,catalog:[...userdataset.catalog,data]});
    console.log("catalog added",userdataset)
  };
const removeLocalDatasetcatalog = (data) => {
    const filtered = userdataset.catalog.filter(item => item.ID !== data.ID);
    setUserDataset({...userdataset,catalog:filtered});
    console.log("catalog removed",userdataset)
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

    const [user, setuser] = useState({});
    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(userP === null) {
            setuser({})
        }else {
            setuser(userP);
        }

        console.log('userP', userP);
    }, [token]);

  useEffect(async ()=>{
      mixpanel.track('Viewed Dataset', {
        'source': "Dataset Details Page",
        'scrolled first': true,
          'email':user.email
      })
    }, [token, dataset_id]);

  return (
    
    <Box sx={{display:'flex',width:'100%', flexDirection:'row'}}>

        <Box sx={{width:"18%"}}>
            <LeftNav />
        </Box>
        <Box sx={{width:"82%"}}>
            <Box sx={{ display: 'flex', flexDirection:'column', bgcolor: '#FAFAFB'}}>
             <Box component="main" sx={{ minWidth: '50vw', display:'flex', }}>
                 <Box sx={{minWidth:'80%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center'}} >
                     <Box sx={{color:'gray', paddingRight:1, paddingLeft:2}}>
                         <SearchIcon />
                     </Box>

                     <InputBase
                         // onChange={setVal}
                         sx={{ bgcolor:'white',width:'90%'}}
                         placeholder="Search Google Maps"
                         inputProps={{
                             startAdornment: (
                                 <InputAdornment position="start">
                                     <SearchIcon />
                                 </InputAdornment>
                             ),
                             placeholder:"Search..."
                         }}
                     />
                 </Box>

                 {/*<TextField fullWidth id="outlined-basic"*/}
                 {/*           value={keyword} onChange={(event)=>setKeyword(event.target.value)}*/}
                 {/*            sx={{ bgcolor: '#ffffff', border:"none",outline: 'none'}}*/}
                 {/*           InputProps={{*/}
                 {/*               startAdornment: (*/}
                 {/*                   <InputAdornment position="start">*/}
                 {/*                       <SearchIcon />*/}
                 {/*                   </InputAdornment>*/}
                 {/*               ),*/}
                 {/*               placeholder:"Search..."*/}
                 {/*           }}*/}
                 {/*/>*/}
                 <div style={{display:"flex",flexDirection:'row', width:'30%', backgroundColor:"#fff",paddingLeft:12,
                     alignItems: 'center',cursor: 'pointer', justifyContent:'space-around'}}>
                     <Link href='/login'>
                         <NotificationsIcon sx={{color:'#939EAA'}}/>
                     </Link>
                     &nbsp;&nbsp;&nbsp;
                     <Link href='/login'>
                         <AccountCircleIcon sx={{color:'#939EAA'}}/>
                     </Link>
                     &nbsp;&nbsp;&nbsp;
                     <p>{user && user.firstname ? user.firstname : 'Account'} </p>
                     &nbsp;&nbsp;&nbsp;
                     <div onClick={()=>signOut({path:router.pathname})}>
                         <ArrowDropDownIcon sx={{color:'#939EAA'}}/>
                     </div>
                 </div>
            </Box>

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:4, justifyContent:'space-between'}}>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"40%",
                    color:'gray-700', alignItems:'center'}}>
                    {datasetMode ===1 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>setDatasetMode(0)}>
                            {"Back"}</Button>:
                        datasetMode ===0 ?<Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                            {"Back"}</Button>:null}
                    <Divider variant="middle" orientation="vertical" />
                    <div style={{paddingLeft:8,paddingRight:2,}}>{userdataset !== null && userdataset !== undefined && <div>{userdataset.title}</div>}</div>
                    <Button variant="outlined" size="medium" sx={{borderRadius:3, marginLeft:2,  color:'#939EAA', borderColor:'#939EAA' }}
                                              startIcon={<CachedIcon />} onClick={()=>router.reload()}>
                    {"Refresh"}</Button>
                </Box>
                <Box sx={{display:"flex", alignItems:'center', justifyContent:'space-between', width:'24%', }}>
                    {datasetMode==0?<div><DeleteOutlineIcon fontSize="large" sx={{cursor:'pointer',}}
                                                            onClick={() => deleteF(userdataset)}/></div>:null}
                    <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
                            startIcon={<GetAppIcon />} onClick={handleOpen}>
                        {"Export"}</Button>
                    {datasetMode === 0 ?<Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
                            startIcon={<EditIcon />} onClick={() => setDatasetMode(1)}>
                        {"Edit"}</Button>: datasetMode === 1 ?
                    <Button variant="outlined" size="medium" sx={{borderRadius:3, color:'#939EAA', borderColor:'#939EAA'}}
                            startIcon={<CheckIcon />} onClick={() => {updateF(userdataset)}}>
                        {"Update"}</Button>:null}
                </Box>

            </Box>

          <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:4, justifyContent:'space-between'}}>
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:24,
                    color:'gray-900',justifyContent:'space-around'}}>
                    <div>Overview &nbsp;</div>
                </Box>

          </Box>

          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
          <Box sx={{px:4, }}>
            <Box>{
              userdataset !== null && userdataset !== undefined
              && <SignalCardOut token={token} localDataset={localDataset} setLocalDataset={setLocalDataset}
                                localTitle={localTitle} setLocalTitle={setLocalTitle} localDescription={localDescription}
                                setLocalDescription={setLocalDescription} localTopic={localTopic} setLocalTopic={setLocalTopic}
              data={userdataset} datasetMode={datasetMode} setDatasetMode={setDatasetMode}
              userdataset={userdataset} setUserDataset={setUserDataset} deleteF={deleteF} updateF={updateF}

              />
            }
            </Box>

          </Box>
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails handleCloseDetails={handleCloseDetails} datasetMode={datasetMode}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog} 
              removeDatasetcatalog={removeDatasetcatalog}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#FAFAFB',pt:4, width:'100%'}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4, width:'100%', }}>
          
          <Box component="main" sx={{display:'flex', justifyContent:'space-between', 
              py: 2, width:'100%', }}>
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', justifyContent:'space-between',
                      fontSize:24,font:'roboto',pl:4}}>
                      <div>{datasetMode === 0? "Included ":'Selected ' }Catalogs &nbsp;</div>
                  </Box>

              {datasetMode ===1 ?<Button variant="contained" size="large" sx={{mx:4, py:2,
            backgroundColor:'#5A00E2'}}
                    startIcon={addCatalogMode ?<CheckIcon />:<AddIcon />} onClick={()=>setAddCatalogMode(!addCatalogMode)}>
                    {addCatalogMode ?"Done":"Add Catalog"}</Button>:null}
              
          </Box>

          <Box sx={{ minWidth: 275, display:'flex', flexDirection:'column', pt:1,px: 4,
              alignItems:'center' }}>
                <Box sx={{ width:"100%",  display:'flex', flexDirection:'column',
              justifyContent:"center",alignItems:'center', border:'1px solid #E2E2EA', borderRadius:4, p:1}}>
                {datasetMode === 0 ? userdataset !== null && userdataset !== undefined &&
                  userdataset.catalog !== null && userdataset.catalog !== undefined &&
                  userdataset.catalog.map((data,index)=><FeatureCard
                  key={data.dataset_id}
                  data={data}
                  index={index}
                  token={token}
                  user={user}
                  datasetMode={datasetMode}
                  dataset={userdataset}
                  openDetails={openDetails}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails}/>)
                : datasetMode === 1 ?
                  userdataset !== null && userdataset !== undefined &&
                  userdataset.catalog !== null && userdataset.catalog !== undefined &&
                  userdataset.catalog.map((data,index)=><EditFeatureCard
                  key={data.dataset_id}
                  data={data}
                  index={index}
                  token={token}
                  user={user}
                  datasetMode={datasetMode}
                  dataset={userdataset}
                  openDetails={openDetails}
                  addLocalDatasetcatalog={addLocalDatasetcatalog}
                  removeLocalDatasetcatalog={removeLocalDatasetcatalog}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails}/>)
                : null}
          </Box>

          </Box>

              {datasetMode === 1 && addCatalogMode === true ?<Box sx={{ display: 'flex', minHeight: '23vh',}}>

                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>

                  <Box component="main" sx={{ display:'flex',flexDirection:'row',
                    flex: 1, py: 2, px: 4, }}>
                     <Typography color="inherit" variant="h5" component="h1">
                          <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>
                              <div>Matching Catalogs &nbsp;</div>

                          </Box>
                      </Typography>

                  </Box>

                  <Box sx={{ width:"100%", display:'flex', flexDirection:'column',
                      justifyContent:"center",alignItems:'center', px:4 }}>
                        {dataSources && dataSources.map((data,index)=><FeatureCard
                          openDetails={openDetails}
                          data={data}
                          index={index}
                          token={token}
                          user={user}
                          handleOpenDetails={handleOpenDetails}
                          handleCloseDetails={handleCloseDetails}
                          dataset={userdataset.catalog}
                          dataSources={dataSources}
                          removeDatasetcatalog={removeLocalDatasetcatalog}
                          addDatasetcatalog={addLocalDatasetcatalog}
                          />)}
                  </Box>

                </Box>
              </Box>:null}

            <div style={{display:'flex', flexDirection:'column'}}>

                <Box component="main" sx={{ display:'flex',flexDirection:'row',
                    flex: 1, py: 2, px: 4, }}>
                    <Typography color="inherit" variant="h5" component="h1">
                        <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>
                            <div>Matching Datasets &nbsp;</div>

                        </Box>
                    </Typography>

                </Box>
                <Box sx={{ width:'100%', display:'flex', flexDirection:'row', px:3.5, flex:'start',
                    alignItems:'center',  overflow: "scroll"}}>

                    {userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                        userdatasets.map((data, index)=><DatasetDraftCard
                            key={data.dataset_id}
                            index={index}
                            data={data}
                            token={token}
                            user={user}
                            openDetails={openDetails}
                            handleOpenDetails={handleOpenDetails}
                            handleCloseDetails={handleCloseDetails}/>): null
                    }
                </Box>
            </div>

        </Box>


      </Box>

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

        </Box>
    </Box>
  );
}

