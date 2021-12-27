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
import {getPublicDatasets, getDatasets, getUser, getPublicDatasetsTopics, getPublicDatasetsTopicKeyword} from '../function/users';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {FormControl} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function BrowseCatalogue({
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
      setOpen2(true);
  }
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
    const [currentOption, setCurrentOption] = useState("All")

  const handleOpenDetails = (data) => {
    setOpenDetails(true);
    setDSDetails(data);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  
  const [keyword, setKeyword] = useState('');
  const [localFilterTopics, setLocalFilterTopics] = useState([])
    const [filterTopics, setFilterTopics] = useState([])
    const [topicFilteredDataSources, setTopicFilteredDataSources] = useState([])
    const [keywordFilteredDataSources, setKeywordFilteredDataSources] = useState([])
    const [searchMode, setSearchMode] = useState(0)

    useEffect(async ()=>{
        const catalog = await getPublicDatasetsTopics(token, filterTopics.[0]);
        setTopicFilteredDataSources(catalog);
        console.log("filtered catalog data",dataSources);
    }, [filterTopics]);

    const handleTopicFilter = async (topic) => {
        setLocalFilterTopics([...localFilterTopics,topic])
        setFilterTopics(localFilterTopics)
        if(token!==null){
            const catalog = await getPublicDatasetsTopicKeyword({token, keyword,topics:filterTopics});
            setTopicFilteredDataSources(catalog);
            console.log("filtered catalog data",catalog);
            setSearchMode(2)
            console.log("fetched data",catalog);
            console.log("fetched data",topicFilteredDataSources);
        }
    };

    useEffect(async ()=>{
        if(!router.pathname.includes("/browsecatalogue")){
            setSearchMode(0)
        }

    }, [router]);

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
          setKeywordFilteredDataSources(data);
          setSearchMode(1)
          console.log("fetched data",data);
          console.log("fetched data",keywordFilteredDataSources);
      }
  };

  return (
    
    <Box>
      {/*<Navbar token={token} setToken={setToken}/>*/}
        <Box sx={{display:'flex', fontStyle:'roboto', maxWidth:'100%'}}>
            <Box sx={{width:"18%"}}>
                <LeftNav />
            </Box>
        <Box sx={{ display: 'flex', width:'82%',flexDirection:'column',bgcolor: '#FAFAFB', fontStyle:'roboto',}}>
            <Box component="main" sx={{  width:'100%', display:'flex', }}>
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
                    <div onClick={()=>signOut({path:router.pathname})}>
                        <ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
                    </div>
                </div>
            </Box>

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2,justifyContent:'space-between', }}>

                    <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                        color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                        <div style={{fontSize:28}}>Catalogs &nbsp;&nbsp;</div>
                        <div style={{ paddingLeft:18,display:'flex', flexDirection:'row', justifyContent:'space-between',
                            alignItems:'space-between'}}>
                            <div style={{fontSize:18, color:'gray'}}>Search:&nbsp;&nbsp;</div>
                            <div style={{fontSize:18, color:'gray-900'}}>{currentOption}</div>
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
                                <MenuItem onClick={()=>{
                                    setCurrentOption("All")
                                    setAnchorEl(null)
                                }}>All</MenuItem>
                                <MenuItem onClick={()=>{
                                    setCurrentOption("Topic")
                                    setAnchorEl(null)
                                }}>Topic</MenuItem>
                                <MenuItem onClick={()=>{
                                    setCurrentOption("Name")
                                    setAnchorEl(null)
                                }}>Name</MenuItem>
                            </Menu>
                        </div>

                    </Box>

                </Box>

            <Box>

          <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', width:'100%',
              justifyContent:'space-between'}}>

              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Catalogs &nbsp;</div>
                  {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>:
                      searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </Box>
              <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}/>

          </Box>


          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            {/* <SignalTable /> */}
            <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3, mx:2,
              justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                    <Box component="main" sx={{ display:'flex', width:'100%', alignItems:'center',
                        minHeight:'14vh', px:1.5, borderRadius:4}}>
                        <Box sx={{ display:'flex', width:'100%',py:4, px:2, alignItems:'left', flexDirection:'column',
                            minHeight:'18vh',maxHeight:'18vh',bgcolor:"#fff", my:2,  borderRadius:4}}>
                            <Box sx={{display:'flex',width:'100%', alignItems:'center',}}>
                            <input variant="outlined" placeholder="Search..."
                                   value={keyword} onChange={(event)=>setKeyword(event.target.value)}
                                   label="Keyword" style={{ bgcolor: '#ffffff', minHeight:"5.5vh",maxHeight:'5.5vh',
                                     border:'1px solid',borderColor:"#E2E2EA",fontSize:20,
                                    borderRadius:4, width:'100%'}}>
                                {/*<FilterListIcon sx={{ fontSize: 25,  }}/>*/}
                            </input>

                        <Button sx={{minWidth:'75px', height:'45px', display:'flex',ml:2,color:'#939EAA',
                            alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'gray',
                            py:3
                            }}
                                variant="outlined"
                                onClick={handleClick}>
                            <FilterListIcon sx={{ fontSize: 25,  }}/>
                            <div style={{ paddingLeft:12}}>Filter By Topics</div>
                        </Button>

                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={()=> {
                                        handleClose2()
                                        setFilterTopics(localFilterTopics)
                                        setLocalFilterTopics([])
                                        }
                                    }
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {dataSources && dataSources !== null && dataSources !== undefined &&
                                        dataSources.map((topic, index)=><MenuItem onClick={() => {
                                        setCurrentOption("All")
                                        // setAnchorEl(null)
                                    }}><div style={{display:'flex', alignItems:'center'}}
                                        onClick={()=>{
                                            handleTopicFilter(topic.topic.split(",").[0])
                                        }}>
                                            <input type={"checkbox"} name="topic" value={topic.topic}/>
                                            <div style={{paddingLeft:10}}>{topic.topic.split(",").[0]}</div>
                                        </div>
                                        </MenuItem>)
                                    }

                                </Menu>

                        <Button sx={{minWidth:'75px', height:'45px', display:'flex',ml:2,color:'#939EAA',
                            alignItems:'center', justifyContent:'center', borderRadius:3, border:0.5, borderColor:'#939EAA',
                            py:3
                            }}
                                variant={"outlined"}
                                onClick={()=>handleKeywordSearch()}>
                            <SearchIcon sx={{ fontSize: 25, }}/>
                            <div style={{ paddingLeft:12, paddingRight:4}}>Search by Keyword</div>
                        </Button>
                            </Box>
                            <Box sx={{display:'flex', pt:2}}>
                                <div style={{paddingTop:8}}>Appllied Filters: {keyword && keyword.split(/(?:,| )+/).map((word,index)=>index <7 && <Button
                                    variant="outlined"
                                    sx={{marginRight:1, borderRadius:4, bgcolor:'#FF49A1',color:'#fff',
                                        textTransform:'lowercase', borderColor:'#FF49A1',
                                    }}
                                    onClick={()=>setKeyword(keyword.split(/(?:,| )+/).filter(key=>key!==word).toString())}
                                    endIcon={<CancelIcon />}>
                                    {word +" "}</Button>)}
                                </div>

                            </Box>
                        </Box>

                    </Box>

                {searchMode === 0 ? dataSources !== null && dataSources !== undefined &&
                    dataSources.map((data,index)=><FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />):
                    searchMode === 1 ? keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined &&
                    keywordFilteredDataSources.map((data,index)=><FeatureCard
                    openDetails={openDetails}
                    data={data}
                    index={index}
                    token={token}
                    user={user}
                    handleOpenDetails={handleOpenDetails}
                    handleCloseDetails={handleCloseDetails}
                    dataset={dataset.catalog}
                    dataSources={dataSources}
                    removeDatasetcatalog={removeDatasetcatalog}
                    addDatasetcatalog={addDatasetcatalog}
                />):
                    searchMode === 2 ? topicFilteredDataSources !== null && topicFilteredDataSources !== undefined &&
                        topicFilteredDataSources.map((data,index)=><FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />):null}
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

