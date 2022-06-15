import {useState, useEffect } from 'react';
// import '../styles/globalStyles.css';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import { InputBase } from '@mui/material';
import FeatureCard from '../components/FeatureCard';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { Grid } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import DataSourcesDetails from '../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser, getPublicDatasetsTopics, getPublicDatasetsTopicKeyword} from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined'
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingOverlay from 'react-loading-overlay';
import SyncLoader from 'react-spinners/SyncLoader';
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
import TextField from '@mui/material/TextField';


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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
  name,
  email,
  company,
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
        if(token !== 0 && token && token !== null && token !== undefined && 
            user !== {} && user !== null && user !== undefined){
                console.log('get users called from catalog page', token);
            const userP = await getUser(token);
            if(userP === null){
                setuser({});
            }else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token, router]);

    useEffect(async ()=> {
        if(token !== 0 && token !== null && token !== undefined &&
            (user === {} || user === null || user.error)){
            console.log("settings page reached for account creation")

          console.log('token in the dashboard page', token)
          console.log('creating user in the backend')
          const erro = await createUser({
              email: email?email:Auth.user.attributes.email,
              //phone: '+1' + phone,
              name:name?name:Auth.user.attributes.name,
              company:company?company:Auth.user.attributes['custom:company'],
              token
            
          });
  
          console.log('user created response', user)
          console.log('error while creating user using api call', erro)
           await sleep(2000);
        //    if("ID" in erro){
        //        router.reload()
        //      }
        }
    },[]);

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
        if(token !== 0 && token && token !== null && token !== undefined && 
            (userdatasets === [] || userdatasets === null || userdatasets !== undefined)){
            console.log('get datasets called from catalog page', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
            }
    }, [token]);

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
    
    <div style={{minHeight:"100%", display:'flex',minWidth:'100%', maxWidth:'100%',backgroundColor: '#FAFAFB',
        fontStyle:'roboto', minWidth:'100%', maxWidth:'100%',paddingBottom:"2em",
            paddingLeft:'1em', paddingRight:'1em',paddingTop:'7.15em',flexDirection:'column'}}>
      {/*<Navbar token={token} setToken={setToken}/>*/}

                    <div style={{ display: 'flex', flexDirection:'row', font:'roboto',paddingBottom:"1.5em",
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28}}>Browse Catalogs &nbsp;&nbsp;</div>

                        </div>

          <div style={{ display: 'flex', flexDirection:'row', bgcolor: 'gray-900', minWidth:'100%', maxWidth:'100%',
              justifyContent:'space-between',paddingBottom:"1.5em", }}>

              <div style={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center', }}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Search Data Catalogs &nbsp;</div>
                  {/* {searchMode === 0 && dataSources !== null && dataSources !== undefined ?
                  <div>{"("+ dataSources.length+")"}</div>: */}
                      {searchMode === 1 && keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined ?
                      <div>{"("+ keywordFilteredDataSources.length+")"}</div>:
                      searchMode === 2 && topicFilteredDataSources !== null && topicFilteredDataSources !== undefined ?
                      <div>{"("+ topicFilteredDataSources.length+")"}</div>:null}
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </div>
              <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                {/* <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                    onClick={()=>router.push("/settings")}/> */}

          </div>


          {/* <Paper sx={{ width: '100%', overflow: 'hidden' }}> */}
            {/* <SignalTable /> */}
            <LoadingOverlay
                active={isActive}
                spinner={<SyncLoader />}
                // text='Loading your content...'
                > 
            <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3, 
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
                                        className="inputRounded" value={keyword} 
                                        onChange={(e) => setKeyword(e.target.value)}
                                        label="Keyword" 
                                        sx={{ display:'flex',bgcolor: '#ffffff',borderRadius:16, width:'65.5%' }}
                                        onKeyDown={()=>handleKeywordSearch()}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            placeholder:"Search..."
                                          }}/>

                            {/* <InputBase
                                // onChange={setVal}
                                sx={{ width:'100%'}}
                                id="outlined-basic" variant="outlined"
                                placeholder="Search Google Maps"
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={()=>handleKeywordSearch()}
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    placeholder:"Search..."
                                }}
                            /> */}

                        <Button sx={{minWidth:'75px', minHeight:'6vh',maxHeight:'6vh', display:'flex',ml:2,color:'#939EAA',
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
                                            handleTopicFilter(topic.split(",")[0])
                                        }}>
                                            <input type={"checkbox"} name="topic" value={topic}/>
                                            <div style={{paddingLeft:10}}>{topic.split(",")[0]}</div>
                                        </div>
                                        </MenuItem>)
                                    }

                                </Menu>

                        <Button sx={{minWidth:'75px', minHeight:'6vh',maxHeight:'6vh', display:'flex',ml:2,color:'#939EAA',
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
                    overflowY:'auto', maxHeight:'60vh', }}>
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

          <Box sx={{ display: 'flex', flexDirection:'row', py: 3, bgcolor: 'gray-900', width:'100%',
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
                {/* <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                    onClick={()=>router.push("/settings")}/> */}

          </Box>

          <Box sx={{  display:'flex', flexDirection:'column', borderRadius:3,  pt:1,
              justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>

                {searchMode === 0 ?
                    dataSources !== null && dataSources !== undefined &&
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
                    />):
                
                    searchMode === 1?
                    keywordFilteredDataSources !== null && keywordFilteredDataSources !== undefined && 
                    keywordFilteredDataSources.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> index < 5 && <FeatureCard
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
                    
                    searchMode === 2  ? 
                    topicFilteredDataSources !== null && topicFilteredDataSources !== undefined &&
                    topicFilteredDataSources.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> index < 5 && <FeatureCard
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
      
      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
              data={dsDetails}/>
          </Box>                  
       </Modal>

       {/*<Footer />*/}

    </div>
  );
}

