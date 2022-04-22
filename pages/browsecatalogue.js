import {useState, useEffect } from 'react';
// import '../styles/globalStyles.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import InputUnstyled from '@mui/base/InputUnstyled';
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
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import {FormControl} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { minHeight } from '@mui/system';
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';


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
  setUserdatasets,
  dataSources,
  setDataSources,
  addDatasetcatalog,
  removeDatasetcatalog,
  user,
setuser,
}) {

  const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();
    const [isActive, setIsActive] = React.useState(false);

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
      setOpen2(true);
  }
  const handleClose = () => setOpen(false);

    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(userP === null){
            setuser({});
        }else{
            setuser(userP)
        }
        console.log('userP', userP);
    }, [token, router]);

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
    const [uniqueTopics, setUniqueTopics] = useState();
    const [topicFilteredDataSources, setTopicFilteredDataSources] = useState([])
    const [keywordFilteredDataSources, setKeywordFilteredDataSources] = useState([])
    const [searchMode, setSearchMode] = useState(0)

    useEffect(async ()=>{
        setIsActive(true);
        const catalog = await getPublicDatasetsTopics(token, filterTopics.toString());
        setTopicFilteredDataSources(catalog);
        setIsActive(false);
        console.log("filtered catalog data",dataSources);
    }, [filterTopics]);

    const handleTopicFilter = async (topic) => {
        setLocalFilterTopics([...localFilterTopics,topic])
        setFilterTopics(localFilterTopics)
        if(token!==null){
            mixpanel.track('Topic Filtered Keyword Search for Catalogs', {
                'source': "Browse Catalog page",
                'action': "keyword search",
                'keyword': keyword,
                'topic': topic,
                'email': user.email,
            });
            setIsActive(true);
            const catalog = await getPublicDatasetsTopicKeyword({token, keyword,topics:filterTopics});
            setTopicFilteredDataSources(catalog);
            setIsActive(false);
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

    useEffect(async () => {
        const data = await getDatasets(
            token
        );
        setUserdatasets(data);
    console.log("fetched datasets",data);
    }, [token,router]);

    useEffect(async () => {
		if(token!==null){
            setIsActive(true);
            const data = await getPublicDatasets(
			token
		    );
			setDataSources(data);
            setIsActive(false);
      console.log("fetched data",data);
      }
  }, [token, router]);

    useEffect(async ()=>{
        if(dataSources && dataSources !== null && dataSources !== undefined && dataSources.length > 0){
        setUniqueTopics([...new Set(dataSources.map(item => item.topic))])
        console.log("unique topics",uniqueTopics);
        }
    }, [dataSources])

  const handleKeywordSearch = async (event) => {
      if(token!==null && keyword!==''){
          console.log("SEARCH", keyword)
          mixpanel.track('Keyword Search for Catalogs', {
            'source': "Browse Catalog page",
            'action': "keyword search",
            'keyword': keyword,
              'email': user.email,
          });
          setIsActive(true);
          const data = await getPublicDatasets(
          token,keyword
        );
          setKeywordFilteredDataSources(data);
          setIsActive(false);
          setSearchMode(1)
          console.log("fetched data",data);
          console.log("fetched data",keywordFilteredDataSources);
      }
  };

  return (
    
    <Box sx={{minHeight:"100%", minWidth:'100%'}}>
      {/*<Navbar token={token} setToken={setToken}/>*/}
        <Box sx={{display:'flex', fontStyle:'roboto', minWidth:"100%",maxWidth:'100%'}}>
            <Box sx={{width:"18%"}}>
            <Box sx={{width:"18%", position:'fixed'}}>
                <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
            </Box>
            </Box>
        <Box sx={{ display: 'flex', width:'82%',flexDirection:'column',bgcolor: '#FAFAFB', fontStyle:'roboto',}}>
            <Box component="main" sx={{  width:'82%', display:'flex',position:'fixed' }}>
                <Box sx={{minWidth:'80%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center', height:"70px"}} >
                    {/* <Box sx={{color:'gray', paddingRight:1, paddingLeft:2}}>
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
                /> */}
                </Box>

                <div style={{display:"flex",flexDirection:'row', width:'30%', backgroundColor:"#fff",paddingLeft:12,
                    alignItems: 'center',cursor: 'pointer', justifyContent:'space-around', height:"70px"}}>
                    <Link href='/login'>
                        {/* <NotificationsIcon
                            fontSize="large"
                            sx={{color:'#939EAA', cursor:'pointer'}}
                        /> */}
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                    <Link href='/login'>
                        <AccountCircleIcon onClick={()=>router.push("/settings")} 
                            fontSize="large" sx={{color:'#939EAA'}}/>
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

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2,justifyContent:'space-between',
                paddingTop:11 }}>

                    <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                        color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                        <div style={{fontSize:28}}>Data Catalogs &nbsp;&nbsp;</div>
                        {/* <div style={{ paddingLeft:18,display:'flex', flexDirection:'row', justifyContent:'space-between',
                            alignItems:'space-between'}}>
                            <div style={{fontSize:18, color:'gray'}}>Search:&nbsp;&nbsp;</div>
                            <div style={{fontSize:18, color:'gray-900'}}>{currentOption}</div>
                            <div style={{color:'gray'}}><ArrowDropDownIcon onClick={handleClick}/></div>

                            
                        </div> */}

                    </Box>

                </Box>

            <Box>

          <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', width:'100%',
              justifyContent:'space-between'}}>

              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Search Data Catalogs &nbsp;</div>
                  {/* {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>: */}
                      {searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </Box>
              <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                    onClick={()=>router.push("/settings")}/>

          </Box>


          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            {/* <SignalTable /> */}
            <LoadingOverlay
                active={isActive}
                spinner={<SyncLoader />}
                // text='Loading your content...'
                > 
            <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3, mx:2,
              justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                    <Box component="main" sx={{ display:'flex', width:'100%', alignItems:'center',
                        minHeight:'14vh', px:1.3, borderRadius:4}}>
                        <Box sx={{ display:'flex', width:'100%',py:4, px:2, alignItems:'left', flexDirection:'column',
                            minHeight:'18vh',maxHeight:'18vh',bgcolor:"#fff", my:2,  borderRadius:4}}>
                            <Box sx={{display:'flex',width:'100%', alignItems:'center',}}>
                                
                            {/* <input variant="outlined" placeholder="Search..."
                                   value={keyword} onChange={(event)=>setKeyword(event.target.value)}
                                   label="Keyword" style={{ bgcolor: '#ffffff', minHeight:"5.5vh",maxHeight:'5.5vh',
                                     border:'1px solid',borderColor:"#E2E2EA",fontSize:20,
                                    borderRadius:4, width:'100%'}}
                                    onKeyDown={()=>handleKeywordSearch()}>
                                {/*<FilterListIcon sx={{ fontSize: 25,  }}/>*/}
                            {/*</input> */}

                            <TextField fullWidth id="outlined-basic" variant="outlined"
                                        className="inputRounded" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                                           label="Keyword" sx={{ display:'flex',bgcolor: '#ffffff',borderRadius:16, }}
                                           onKeyDown={()=>handleKeywordSearch()}/>

                        <Button sx={{minWidth:'75px', minHeight:'7vh',maxHeight:'7vh', display:'flex',ml:2,color:'#939EAA',
                            alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'gray',
                            py:3
                            }}
                                variant="outlined"
                                onClick={handleClick}>
                            <FilterListIcon sx={{ fontSize: "2em",  }}/>
                            <div style={{ paddingLeft:12,fontSize: "1em",
                                lineHeight: "125%"}}>Filter By Topics</div>
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
                                    {uniqueTopics && uniqueTopics !== null && uniqueTopics !== undefined && uniqueTopics.length > 0 &&
                                         uniqueTopics.map((topic, index)=><MenuItem onClick={() => {
                                        setCurrentOption("All")
                                        // setAnchorEl(null)
                                    }}><div style={{display:'flex', alignItems:'center'}}
                                        onClick={()=>{
                                            setFilterTopics(localFilterTopics)
                                            setLocalFilterTopics([])
                                            handleTopicFilter(topic.split(",").[0])
                                        }}>
                                            <input type={"checkbox"} name="topic" value={topic}/>
                                            <div style={{paddingLeft:10}}>{topic.split(",").[0]}</div>
                                        </div>
                                        </MenuItem>)
                                    }

                                </Menu>

                        <Button sx={{minWidth:'75px', minHeight:'7vh',maxHeight:'7vh', display:'flex',ml:2,color:'#939EAA',
                            alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'#939EAA',
                            py:3
                            }}
                                variant={"outlined"}
                                onClick={()=>handleKeywordSearch()}>
                            <SearchIcon sx={{ fontSize: "2em", }}/>
                            <div style={{ paddingLeft:12, paddingRight:4, fontSize: "1em",
                                lineHeight: "125%"}}>Search by Keyword</div>
                        </Button>
                            </Box>
                            <Box sx={{display:'flex', pt:2}}>
                                <div style={{paddingTop:8}}>Applied Filters: {filterTopics && filterTopics.length >0 && 
                                    filterTopics.toString().split(/(?:,| )+/).map((word,index)=> index <7 && <Button
                                    variant="outlined"
                                    sx={{marginRight:1, borderRadius:4, bgcolor:'#FF49A1',color:'#fff',
                                        textTransform:'lowercase', borderColor:'#FF49A1',
                                    }}
                                    onClick={()=>{
                                        mixpanel.track('Keywords Entered in the Search Bar', {
                                            'source': "Browse Catalog page",
                                            'action': "Keyword Entered",
                                            'keywords': keyword.split(/(?:,| )+/).filter(key=>key!==word).toString(),
                                            'email': user.email,
                                        });
                                        setFilterTopics(filterTopics.toString().split(/(?:,| )+/).filter(key=>key!==word).toString())
                                    }}
                                    endIcon={<CancelIcon />}>
                                    {word +" "}</Button>)}
                                </div>

                            </Box>
                        </Box>

                    </Box>

                <Box sx={{minHeight:'100%', minWidth:'100%', overflowX:"hidden", 
                    overflowY:'auto', maxHeight:'60vh', paddingLeft:1.5, paddingRight:-8}}>
                    {searchMode === 0 ? dataSources !== null && dataSources !== undefined &&
                    // dataSources.map((data,index)=><FeatureCard
                    //     openDetails={openDetails}
                    //     data={data}
                    //     index={index}
                    //     token={token}
                    //     user={user}
                    //     handleOpenDetails={handleOpenDetails}
                    //     handleCloseDetails={handleCloseDetails}
                    //     dataset={dataset.catalog}
                    //     dataSources={dataSources}
                    //     removeDatasetcatalog={removeDatasetcatalog}
                    //     addDatasetcatalog={addDatasetcatalog}
                    // />)
                    "":
                    searchMode === 1 ? keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined &&
                    keywordFilteredDataSources.map((data,index)=> <FeatureCard
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
                        topicFilteredDataSources.map((data,index)=> <FeatureCard
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
          </LoadingOverlay>

          <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:2, bgcolor: 'gray-900', width:'100%',
              justifyContent:'space-between'}}>

              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Newly Added Data Catalogs &nbsp;</div>
                      {/* { dataSources !== null && dataSources !== undefined &&
                        <div>{"("+ 4 +")"}</div> } */}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </Box>
              <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                    onClick={()=>router.push("/settings")}/>

          </Box>

          <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3, mx:2, pt:1,
              justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>

                {(searchMode === 0 || searchMode === 1 || searchMode === 2 ) ? dataSources !== null && dataSources !== undefined &&
                    dataSources.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> index < 5 && <FeatureCard
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

