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
import {getDatasetsId, downloadDatasetsId, getUser, deleteUserDataset, updateUserDataset, getPublicDatasetsTopics} from '../../function/users';
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
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CatalogCardOut from "../../components/CatalogCardOut";

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
    const handleOpen = () => setOpen(true);;
    const handleClose = () => setOpen(false);
    const [userdataset, setUserDataset] = useState([]);
    const [datasetMode, setDatasetMode] = useState(0);
    const [downloadLink, setDownloadLink] = React.useState('');
    const router = useRouter();
    const datasource_id = router.query.cid;
    console.log(datasource_id)
    const [addCatalogMode, setAddCatalogMode] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [localTitle, setLocalTitle] = useState('');
    const [localDescription, setLocalDescription] = useState('');
    const [localTopic, setLocalTopic] = useState('');
    const [localDataset, setLocalDataset] = useState({});
    const [currentTopic, setCurrentTopic] = useState("")
    const [filteredDataSources, setFilteredDataSources] = useState([])

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
            window.open("/dashboard1", "_self")
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
        const dataset = await getDatasetsId(token, datasource_id);
        setUserDataset(dataset);
        console.log("fetched dataset data",userdataset);
    }, [token, datasource_id]);

    useEffect(async ()=>{
        const catalog = await getPublicDatasetsTopics(token, currentTopic);
        setFilteredDataSources(catalog);
        console.log("filtered catalog data",filteredDataSources);
    }, [token, currentTopic]);

    const handleDownloadButton = async() => {
        const downloadLink = await downloadDatasetsId(token, datasource_id);
        setDownloadLink(downloadLink.url);
        if(downloadLink.url !== null && downloadLink.url !== undefined){
            await window.open(downloadLink.url, '_blank');
        }
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
    }, [token, datasource_id]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 = Boolean();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        handleOpen()
    };
    const handleClose2 = () => {
        setAnchorEl(null);
    };

    return (

        <Box sx={{display:'flex',width:'100%', flexDirection:'row'}}>

            <Box sx={{width:"18%"}}>
                <LeftNav />
            </Box>
            <Box sx={{width:"82%"}}>
                <Box sx={{ display: 'flex', flexDirection:'column', bgcolor: '#FAFAFB'}}>
                    <Box component="main" sx={{  minWidth:'100%', display:'flex', }}>
                        <Box sx={{minWidth:'80%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center', height:"70px"}} >
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
                            alignItems: 'center',cursor: 'pointer', justifyContent:'space-around', height:"70px"}}>
                            <Link href='/login'>
                                <NotificationsIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link href='/login'>
                                <AccountCircleIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <p style={{fontSize:20}}>{user && user.firstname ? user.firstname : 'Account'} </p>
                            &nbsp;&nbsp;&nbsp;
                            <div onClick={()=>signOut({path:router.pathname})}>
                                <ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </div>
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between'}}>

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

                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, justifyContent:'space-between'}}>
                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:24,
                            color:'gray-900',justifyContent:'space-around'}}>
                            <div>Catalog Overview &nbsp;</div>
                        </Box>

                    </Box>

                    {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                    <Box sx={{px:2, }}>
                        <Box>{
                            dataSources !== null && dataSources !== undefined
                            && dataSources.map((data,index)=> datasource_id == data.ID && <CatalogCardOut token={token} localDataset={localDataset}
                                              setLocalDataset={setLocalDataset} localTitle={localTitle} setLocalTitle={setLocalTitle}
                                              localDescription={localDescription}setLocalDescription={setLocalDescription} localTopic={localTopic}
                                              setLocalTopic={setLocalTopic}data={data} datasetMode={datasetMode} setDatasetMode={setDatasetMode}
                                              dataSources={dataSources}setDataSources={setDataSources} userdataset={userdataset} setUserDataset={setUserDataset}
                                              deleteF={deleteF} updateF={updateF} currentTopic={currentTopic} setCurrentTopic={setCurrentTopic}
                            />)
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
                                fontSize:24,font:'roboto',pl:2}}>
                                <div>{'Related ' }Catalogs &nbsp;</div>
                            </Box>

                        </Box>

                        <Box sx={{ minWidth: 275, display:'flex', flexDirection:'column', pt:1,px: 2,
                            alignItems:'center' }}>
                            <Box sx={{ width:"100%",  display:'flex', flexDirection:'column',
                                justifyContent:"center",alignItems:'center', border:'1px solid #E2E2EA', borderRadius:4, p:1}}>
                                {       filteredDataSources !== null && filteredDataSources !== undefined &&
                                        filteredDataSources.length <= 0? <div>
                                        We are working on adding more catalogs to our platform.</div>:
                                            filteredDataSources.map((data,index)=> <FeatureCard
                                            key={data.ID}
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
                                }
                            </Box>

                        </Box>

                    </Box>


                </Box>

                {/*<Modal*/}
                {/*    open={open}*/}
                {/*    onClose={handleClose}*/}
                {/*    aria-labelledby="modal-modal-title"*/}
                {/*    aria-describedby="modal-modal-description"*/}
                {/*>*/}
                {/*    <Box sx={{ position: 'absolute', bgColor:'#fff',*/}
                {/*        top: '50%',*/}
                {/*        left: '50%',*/}
                {/*        transform: 'translate(-50%, -50%)',*/}
                {/*        width:'70%'}}>*/}
                {/*        <Output data={dataset} downloadLink={downloadLink}/>*/}
                {/*    </Box>*/}
                {/*</Modal>*/}

            </Box>
        </Box>
    );
}

