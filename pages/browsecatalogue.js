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
import Pagination from 'react-bootstrap/Pagination'
import axios from 'axios'
import ReactPaginate from "react-paginate";


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
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElUser2, setAnchorElUser2] = React.useState(null);
    const open = Boolean(anchorEl);
    const open2 = Boolean(anchorEl2);
    const openUser = Boolean(anchorElUser);
    const [isActive, setIsActive] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

  const [localdataset, setLocaldataset] = useState([]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleFilter = ((topic)=>{
    setCurrentOption("All")
    setFilterTopics(localFilterTopics)
    setLocalFilterTopics([])
    handleTopicFilter(topic.split(",")[0])
    setAnchorEl(null)
  })


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
  const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
  // Example items, to simulate fetching from another resources.
  const [users, setUsers] = useState(searchMode === 0 ? dataSources && dataSources.slice(0, 50):
                                     searchMode === 1 ? keywordFilteredDataSources && keywordFilteredDataSources.slice(0, 50):
                                     searchMode === 2 ? topicFilteredDataSources && topicFilteredDataSources.slice(0, 50):null);

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = users !==null && users && users
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> <div style={{width:'100%', paddingLeft:'0.7rem',
                    paddingRight:'0.7rem'}}>
                        <FeatureCard
                        openDetails={openDetails}
                        data={data}
                        index={index}
                        token={token}
                        user={user}
                        pagesVisited={pagesVisited}
                        usersPerPage={usersPerPage}
                        handleOpenDetails={handleOpenDetails}
                        handleCloseDetails={handleCloseDetails}
                        dataset={dataset.catalog}
                        dataSources={dataSources}
                        removeDatasetcatalog={removeDatasetcatalog}
                        addDatasetcatalog={addDatasetcatalog}
                    />
                    </div>
      );

    useEffect(()=>{
        if(searchMode === 0){
            setUsers(dataSources && dataSources.slice(0, 50));
        }else if(searchMode === 1){
            setUsers(keywordFilteredDataSources && keywordFilteredDataSources.slice(0, 50));
        }else if(searchMode === 2){
            setUsers(topicFilteredDataSources && topicFilteredDataSources.slice(0, 50));
        }
    },[searchMode, dataSources, keywordFilteredDataSources, topicFilteredDataSources])

  const pageCount = users !== null && users && Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
            <div style={{  display:'flex', flexDirection:'column', borderRadius:'0.75em', 
              justifyContent:"center",alignItems:'center', flexWrap:'wrap',border:'0.5px solid #bfbfbf',}}>
                    <Box component="main" sx={{ display:'flex', width:'100%', alignItems:'center',
                        minHeight:'14vh', px:1.3, borderRadius:4}}>
                        <Box sx={{ display:'flex', width:'100%',py:4, px:2, alignItems:'left', flexDirection:'column',
                            minHeight:'18vh',maxHeight:'18vh',bgcolor:"#fff", my:2,  borderRadius:4}}>
                            <Box sx={{display:'flex',width:'100%', alignItems:'center',textTransform: "capitalize",}}>
                                
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
                                        sx={{ display:'flex',bgcolor: '#ffffff',borderRadius:16, width:'70%' }}
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

                            <Button sx={{minWidth:'12em',maxWidth:'12em', minHeight:'6vh',maxHeight:'6vh', display:'flex',ml:3,color:'#939EAA',
                                alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'gray',
                                textTransform: "capitalize",
                                py:3
                                }}
                                    variant="outlined"
                                    onClick={handleClick}>
                                <svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.25 5.25H15.75" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M4.5 9H13.5" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                    <path d="M7.5 12.75H10.5" stroke="#030D55" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>

                                <div style={{fontSize: "1em",paddingLeft:'0.5em',
                                    lineHeight: "125%"}}>Filter By Topics</div>
                            </Button>

                            <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {uniqueTopics && uniqueTopics !== null && uniqueTopics !== undefined && uniqueTopics.length > 0 &&
                                         uniqueTopics.map((topic, index)=><MenuItem onClick={()=>handleFilter(topic.split(",")[0])}>{topic.split(",")[0]}
                                        </MenuItem>)
                                    }

                            </Menu>

                            <Button sx={{minWidth:'12em', maxWidth:'12em',minHeight:'6vh',maxHeight:'6vh', display:'flex',ml:3,color:'#939EAA',
                                alignItems:'center', justifyContent:'center', borderRadius:2, border:0.5, borderColor:'#939EAA',
                                py:3,textTransform: "capitalize",
                                }}
                                    variant={"outlined"}
                                    onClick={handleClick2}>
                                
                                <svg width="12" height="24" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.98509 1.39286V2.59999V14.75C3.98509 14.7631 3.99029 14.7787 4.00458 14.793C4.01887 14.8073 4.03452 14.8125 4.04759 14.8125C4.06065 14.8125 4.0763 14.8073 4.09059 14.793C4.10488 14.7787 4.11009 14.7631 4.11009 14.75V2.6075V1.40039L4.96364 2.25394L6.79364 4.08395C6.80205 4.09235 6.809 4.09621 6.81436 4.09837C6.82019 4.10071 6.82781 4.10248 6.83761 4.10248C6.8474 4.10248 6.855 4.10071 6.86081 4.09838C6.86615 4.09623 6.8731 4.09238 6.88153 4.08395C6.9002 4.06528 6.9087 4.02595 6.87728 3.9918L4.09906 1.21354M3.98509 1.39286L4.25761 1.05499V0.732498M3.98509 1.39286L3.13153 2.24644L1.29407 4.08395C1.29407 4.08395 1.29407 4.08395 1.29406 4.08395C1.28463 4.09338 1.26993 4.10063 1.2501 4.10063C1.23026 4.10063 1.21556 4.09338 1.20613 4.08395C1.19669 4.0745 1.18945 4.05981 1.18945 4.04C1.18945 4.02019 1.19669 4.0055 1.20613 3.99606L3.99616 1.20603C4.00812 1.19407 4.02335 1.18783 4.03884 1.18751M3.98509 1.39286L4.03884 1.18751M4.09906 1.21354L4.10226 1.21033C4.09836 1.20916 4.09441 1.20793 4.09042 1.20664M4.09906 1.21354L4.10226 1.21033C4.18001 1.23363 4.24104 1.23273 4.25534 1.23252C4.25632 1.23251 4.25708 1.2325 4.25761 1.2325V1.05499L4.45261 0.859985M4.09906 1.21354C4.09793 1.21241 4.09506 1.20981 4.09042 1.20664M4.09042 1.20664C4.08996 1.20632 4.08949 1.20601 4.089 1.20568C4.08358 1.20212 4.07766 1.19904 4.07191 1.19674L4.25761 0.732498M4.09042 1.20664C4.07453 1.20147 4.05802 1.19528 4.04115 1.18787M4.25761 0.732498C4.25011 0.732498 4.24259 0.732491 4.23509 0.724991M4.25761 0.732498C4.33261 0.762498 4.40012 0.807485 4.45261 0.859985M4.45261 0.859985L7.23509 3.6425L4.45261 0.859985ZM4.04115 1.18787C4.04152 1.18794 4.04193 1.18802 4.04237 1.18811C4.04678 1.18899 4.05274 1.19061 4.05952 1.19316L4.23509 0.724991M4.04115 1.18787C4.04006 1.18768 4.0393 1.18757 4.03884 1.18751M4.04115 1.18787C4.04079 1.18772 4.04043 1.18756 4.04008 1.1874C3.98833 1.16454 3.93316 1.13017 3.88154 1.07855L4.04008 0.920003L4.23509 0.724991M4.23509 0.724991L4.03884 1.18751" 
                                    fill="#292D32" stroke="#939EAA"/>
                                </svg>

                                <svg width="12" height="24" viewBox="0 0 8 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M4.01517 13.4V14.6071L4.86873 13.7536L6.70619 11.9161C6.71562 11.9066 6.73032 11.8994 6.75016 11.8994C6.77 11.8994 6.78469 11.9066 6.79413 11.9161C6.8128 11.9347 6.82129 11.974 6.78987 12.0082L4.00411 14.794C3.99214 14.8059 3.97691 14.8122 3.96142 14.8125C3.96096 14.8124 3.96019 14.8123 3.95912 14.8121C3.94224 14.8047 3.92574 14.7985 3.90984 14.7934C3.9052 14.7902 3.90233 14.7876 3.9012 14.7865L1.11873 12.0039L0.765936 12.3567L1.11873 12.0039C1.10929 11.9945 1.10205 11.9798 1.10205 11.96C1.10205 11.9402 1.10929 11.9255 1.11873 11.9161C1.12817 11.9066 1.14287 11.8994 1.16267 11.8994C1.18248 11.8994 1.19718 11.9066 1.20662 11.9161L3.03662 13.7461L3.89017 14.5996V13.3925V1.25C3.89017 1.23694 3.89538 1.22128 3.90967 1.20699C3.92396 1.1927 3.93961 1.1875 3.95267 1.1875C3.96574 1.1875 3.98139 1.1927 3.99568 1.20699C4.00997 1.22128 4.01517 1.23694 4.01517 1.25V13.4Z" 
                                    fill="#292D32" stroke="#939EAA"/>
                                </svg>


                                <div style={{ paddingLeft:12, paddingRight:4, fontSize: "1em",
                                    lineHeight: "125%"}}>Sort By</div>
                            </Button>

                            <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl2}
                                    open={open2}
                                    onClose={handleClose2}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={()=>setAnchorEl2(null)}>Recent First</MenuItem>
                                    <MenuItem onClick={()=>setAnchorEl2(null)}>Data Points</MenuItem>
                                    

                            </Menu>
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

                {/* <Box sx={{minHeight:'100%', minWidth:'100%', overflowX:"hidden", paddingLeft:'0.75em',paddingRight:'0.75em',
                    overflowY:'auto', maxHeight:'60vh', paddingTop:'0.15em'}}>
                    {searchMode === 0 ? dataSources !== null && dataSources !== undefined &&
                    dataSources.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data,index)=> index < 5 &&<FeatureCard
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
                    />)
                    :
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
                    </Box> */}
                    {displayUsers}
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                    />
          </div>
          
          </LoadingOverlay>
          

          {/* <Box sx={{ display: 'flex', flexDirection:'row', py: 3, bgcolor: 'gray-900', width:'100%',
              justifyContent:'space-between'}}>

              <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18,
                    color:'gray-700',justifyContent:'space-around', alignItems:'center'}}>
                    <div><TableViewOutlinedIcon fontSize="large"/>&nbsp;&nbsp;</div>
                      <div>Newly Added Data Catalogs &nbsp;</div>
                      {/* { dataSources !== null && dataSources !== undefined &&
                        <div>{"("+ 4 +")"}</div> } 
                    <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>

                </Box>
              <div style={{color:'gray'}}><Divider variant="middle" flexItem/></div>
                {/* <SettingsIcon fontSize="large" sx={{cursor:'pointer', color:"gray"}}
                    onClick={()=>router.push("/settings")}/> 

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
       </Modal> */}

       {/*<Footer />*/}

    </div>
  );
}

