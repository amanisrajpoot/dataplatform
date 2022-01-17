import {useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import FeatureCard from '../../components/FeatureCard';
import HelpCenterCard from '../../components/HelpCenterCard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { confirmSignUp, signIn, signOut } from '../../function/checkAuth';
import DataSourcesDetails from '../../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser, getPublicDatasetsTopics} from '../../function/users';
import DatasetCard from '../../components/DatasetCard';
import DatasetDraftCard from '../../components/DatasetDraftCard';
import HeaderDatasetCard from '../../components/HeaderDatasetCard';
import LeftNav from "../../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import InputBase from '@mui/material/InputBase';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {FormControl} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

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

export default function TopicBrowser({
                                         token,
                                         setToken,
                                         dataset,
                                         userdatasets,
                                         dataSources,
                                         setDataSources,
                                         addDatasetcatalog,
                                         removeDatasetcatalog,
                                     }) {
    const router = useRouter()
    const [search, setSearch] = useState(false);
    const [localDataset, setLocalDataset] = useState([]);
    const [searching4, setSearching4] = useState(false);
    const [topicDatasources, setTopicDatasources] = useState([]);
    const topic_id = router.query.tid;

    useEffect(() => {
        setSearching4(dataset.catalog);
        console.log("fetched dataset",searching4);
    }, [dataset]);

    useEffect(async()=>{
        const datasources = await getPublicDatasetsTopics(token, topic_id);
        setTopicDatasources(datasources);
    }, [token, topic_id]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const [localdataset, setLocaldataset] = useState([]);

    const handleOpen2 = () => {
        setOpen(false);
        setOpen2(true);}
    const handleClose = () => setOpen(false);

    const [user, setuser] = useState({});
    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(user === null){
            setuser({});
        }else{
            setuser(userP)
        }
        console.log('userP', userP);
    }, [token]);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const [showDraft, setShowDraft] = useState(true)

    const handleOpenDetails = (data) => {
        setOpenDetails(true);
        setDSDetails(data);
    };
    const handleCloseDetails = () => {
        setOpenDetails(false);
    };

    const [keyword, setKeyword] = useState('');
    const handleKeywordSearch = async (event) => {
        if(token!==null){
            console.log("SEARCH", keyword)
            mixpanel.track('Keyword Search for Catalogs', {
                'source': "Data Platform Dashboard",
                'action': "keyword search",
                'keyword': keyword,
                'email': user.email,
            });
            const data = await getPublicDatasets(
                token,keyword
            );
            setDataSources(data);
            console.log("fetched data",data);
            console.log("fetched data",userdatasets);
        }
    };

    return (

        <Box>
            {/*<Navbar token={token} setToken={setToken}/>*/}
            <Box sx={{display:'flex', fontStyle:'roboto', maxWidth:'100%'}}>
                <Box sx={{width:"18%"}}>
                <Box sx={{width:"18%", position:'fixed'}}>
                    <LeftNav />
                </Box>
                </Box>
                <Box sx={{ display: 'flex', width:'82%',flexDirection:'column',bgcolor: '#FAFAFB', fontStyle:'roboto',}}>
                    <Box component="main" sx={{  width:'82%', display:'flex',position:'fixed' }}>
                        <Box sx={{minWidth:'80%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center', height:"70px"}} >
                            <Box sx={{color:'gray', paddingRight:1, paddingLeft:2}}>
                                <SearchIcon />
                            </Box>

                            <InputBase
                                // onChange={setVal}
                                sx={{ bgcolor:'white',width:'90%'}}
                                placeholder="Search"
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
                                <NotificationsIcon
                                    fontSize="large"
                                    sx={{color:'#939EAA', cursor:'pointer'}}
                                />
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link href='/login'>
                                <AccountCircleIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <p style={{fontSize:20}}>{user && user.firstname ? user.firstname : 'Account'} </p>
                            &nbsp;&nbsp;&nbsp;
                            <div
                                // onClick={()=>signOut({path:router.pathname})}
                                onClick={handleClickUser}
                            >
                                <ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </div>

                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElUser}
                                open={openUser}
                                onClose={handleCloseUser}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={()=>router.push('/settings')}><SettingsIcon/>&nbsp; Settings</MenuItem>
                                <MenuItem onClick={()=>router.push('/support')}><LiveHelpIcon/>&nbsp; Support</MenuItem>
                                <MenuItem onClick={()=>signOut({path:router.pathname})}><ExitToAppIcon/>&nbsp; Sign Out</MenuItem>
                            </Menu>
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2,justifyContent:'space-between',paddingTop:10 }}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', width:'55%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'center'}}>
                            <div style={{display:'flex', alignItems:'center'}}>
                                <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                                justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                                {"Back"}</Button>
                                <Divider variant="middle" orientation="vertical" flexItem />
                                <div style={{paddingLeft:8,paddingRight:2,textTransform:'capitalize'}}>Go Back to {router.query.currentRouteTitle}</div>
                            </div>

                            <div style={{display:'flex', alignItems:'center'}}>
                                <div style={{fontSize:28, paddingLeft:24}}>Topic &nbsp;&nbsp;</div>
                                <div style={{ paddingLeft:8,display:'flex', flexDirection:'column', justifyContent:'space-between',
                                    alignItems:'center'}}>
                                    <div style={{paddingTop:12,fontSize:18, color:'gray', textTransform:'capitalize'}}>{topic_id}</div>

                                </div>
                            </div>

                        </Box>

                    </Box>

                    <Box>

                        <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', width:'100%',
                            justifyContent:'space-between'}}>

                            <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                                color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                                <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                                <div>Data Catalogs &nbsp;</div>
                                {topicDatasources !== null && topicDatasources !== undefined && <div>{"("+ topicDatasources.length+")"}</div>}
                                <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                            </Box>
                            <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                            <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}/>

                        </Box>

                        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                        {/* <SignalTable /> */}
                        <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3, mx:2,
                            justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                            <Box component="main" sx={{ display:'flex', flexDirection:'column',width:'100%', alignItems:'center',
                                minHeight:'14vh', borderRadius:4, py:2}}>

                                {topicDatasources && topicDatasources.map((data,index)=><FeatureCard
                                    openDetails={openDetails}
                                    data={data}
                                    index={index}
                                    token={token}
                                    user={user}
                                    handleOpenDetails={handleOpenDetails}
                                    handleCloseDetails={handleCloseDetails}
                                    dataset={dataset.catalog}
                                    dataSources={topicDatasources}
                                    removeDatasetcatalog={removeDatasetcatalog}
                                    addDatasetcatalog={addDatasetcatalog}
                                />)}
                            </Box>
                        </Box>

                    </Box>

                    <Modal open={openDetails} onClose={handleCloseDetails}>
                        <Box sx={style2}>
                            <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
                                                data={dsDetails}/>
                        </Box>
                    </Modal>

                </Box>

            </Box>
            {/*<Footer />*/}

        </Box>
    );
}

