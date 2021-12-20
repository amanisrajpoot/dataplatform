import {useState, useEffect } from 'react';
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
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import { confirmSignUp, signIn, signOut } from '../function/checkAuth';
import DataSourcesDetails from '../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import DatasetCard from '../components/DatasetCard';
import DatasetDraftCard from '../components/DatasetDraftCard';
import HeaderDatasetCard from '../components/HeaderDatasetCard';
import LeftNav from "../components/LeftNav";
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

export default function Datasets({
                                      token,
                                      setToken,
                                      dataset,
                                      userdatasets,
                                      dataSources,
                                      setDataSources,

                                  }) {

    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose2 = () => {
        setAnchorEl(null);
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
            <Box sx={{display:'flex', fontStyle:'roboto'}}>
                <Box sx={{width:"18%"}}>
                    <LeftNav />
                </Box>
                <Box sx={{ display: 'flex', width:'82%',flexDirection:'column',bgcolor: '#FAFAFB', fontStyle:'roboto',}}>
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
                            <div onClick={()=>signOut({path:router.pathname})}>
                                <ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
                            </div>
                        </div>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2,justifyContent:'space-between'}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28}}>My Datasets &nbsp;&nbsp;</div>
                            <div style={{ paddingLeft:18,display:'flex', flexDirection:'row', justifyContent:'space-between',
                                alignItems:'space-between'}}>
                                <div style={{fontSize:18, color:'gray'}}>Show:&nbsp;&nbsp;</div>
                                <div style={{fontSize:18, color:'gray-900'}}>All</div>
                                <div style={{color:'gray'}}><ArrowDropDownIcon onClick={handleClick}/></div>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose2}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>All</MenuItem>
                                    <MenuItem onClick={handleClose}>Created</MenuItem>
                                    <MenuItem onClick={handleClose}>Draft</MenuItem>
                                </Menu>
                            </div>

                        </Box>
                        <Button variant="contained" size="large"
                                sx={{backgroundColor:'#5A00E2', px:2, borderRadius:'10px', textTransform: "capitalize"}}
                                startIcon={<AddIcon />}
                                onClick={() => {
                                    router.push('/searchresult');
                                    // mixpanel.time_event('Create Dataset');
                                    mixpanel.track('Clicked on Create Dataset', {
                                        'source': "Data Platform Dashboard",
                                        'scrolled first': true,
                                        'email':user.email
                                    });
                                }}>
                            {/* onClick={handleOpen}> */}
                            Create a Dataset</Button>

                    </Box>

                    <Box>

                        <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', justifyContent:'space-between'}}>

                            <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                                color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                                <div ><ArrowDropDownIcon
                                    fontSize="large"
                                    sx={{color:'#92929D'}}
                                    onClick={()=>setShowDraft(!showDraft)}
                                /></div>
                                <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                                <div>Drafts &nbsp;</div>
                                {userdatasets !== null && userdatasets !== undefined && <div>{"("+ userdatasets.length+")"}</div>}
                                <Divider variant="middle"/>
                            </Box>

                            <Box>
                                <ArrowBackIosNewOutlinedIcon fontSize="small" sx={{cursor:'pointer'}}/>
                                <ArrowForwardIosOutlinedIcon fontSize="small" sx={{cursor:'pointer'}}/>
                            </Box>
                        </Box>

                        {showDraft && <Box sx={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', px:2, flex:'start',
                            alignItems:'center',  overflow: "scroll"}}>

                            <div style={{height:'28ch', minWidth:'26ch', maxWidth:'28ch',borderStyle: "dashed", backgroundColor:'#fff', textAlign:'center',
                                marginRight:12, marginBottom:12, display:'flex', flexDirection:'column', alignItems:'center',
                                justifyContent:"space-around", flex:'end',borderRadius:9, border:'1.5px dashed #bfbfbf', marginBottom:7 }}>
                                <div style={{marginTop:12, cursor:'pointer'}} onClick={()=>router.push('/searchresult')} >
                                    <div><AddCircleOutlinedIcon sx={{fontSize:124, color: "#FFC542", opacity:0.4, pb:1,
                                    }}/></div>
                                    <div style={{color:'black', fontSize:20, paddingBottom:12}}>Create New Set</div>
                                    <div style={{color:'gray'}}>First steps to create the great analysis is to start with data sets</div>
                                </div>
                            </div>
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
                        </Box>}

                        <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', justifyContent:'space-between'}}>

                            <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                                color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                                <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                                <div>My Datasets &nbsp;</div>
                                {userdatasets !== null && userdatasets !== undefined && <div>{"("+ userdatasets.length+")"}</div>}
                                <Divider variant="middle"/>
                            </Box>

                            <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}/>

                            <Modal
                                open={open2}
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
                                            <Box onClick={()=>handleClose()}>
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
                        </Box>

                        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
                        {/* <SignalTable /> */}
                        <Box sx={{ width:"98%", display:'flex', flexDirection:'column',mx:2, borderRadius:3,
                            justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                            {userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                                userdatasets.map((data, index)=><DatasetCard
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

