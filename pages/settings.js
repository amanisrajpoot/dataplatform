import {useState, useEffect} from 'react';
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
import AddedFeatureCard from '../components/AddedFeatureCard';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcesdetails';
import {getPublicDatasets, createUserDataset, getUser} from '../function/users';
import TopicsCard from '../components/topicsCard';
import FormControl from '@mui/material/FormControl';
import {useRouter} from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';
import LeftNav from "../components/LeftNav";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {signOut} from "../function/checkAuth";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Divider from "@mui/material/Divider";
import CachedIcon from "@mui/icons-material/Cached";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import LockIcon from '@mui/icons-material/Lock';
import Switch from '@mui/material/Switch';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, minWidth:'100%' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
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

export default function Settings({
  token, 
  setToken, 
  dataset, 
  dataSources,
  setDataSources,
  setDataset,
  setUserdatasets, 
  title, setTitle, description, setDescription,
  userdatasets,
  addDatasetcatalog,
  removeDatasetcatalog,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [localDataset, setLocalDataset] = useState('');
  const [search, setSearch] = useState(false);
  const [searching4, setSearching4] = useState([]);
  // const [title, setTitle] = React.useState('');
  // const [description, setDescription] = React.useState('');
  const [topic, setTopic] = React.useState('');
  const [keywords, setKeywords] = React.useState('');
  const [localdataset, setLocaldataset] = React.useState({title: '', description: '', topic: '', keywords: ''});
  const router = useRouter()
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleClickChange = (newValue) => {
        setValue(newValue);
    };

  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

    const [user, setuser] = useState({});
    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(userP === null || userP === undefined ){
            setuser({})
        } else{
            setuser(userP)
        }
        console.log('userP', userP);
    }, [token]);

    const [openDetails, setOpenDetails] = useState(false);
    const [dsDetails, setDSDetails] = useState([]);
    const handleOpenDetails = (data) => {
      setOpenDetails(true);
      setDSDetails(data);
    };
    const handleCloseDetails = () => {
      setOpenDetails(false);
    };

  const [keyword, setKeyword] = useState('');
  const [keywordSearch, setKeywordSearch] = useState(false);


  const handleSendData = async () => {
      if(token!==null){
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
        mixpanel.track('Clicked on Create', {
          'source': "Create Dataset Page",
          'scrolled first': true,
            'email':user.email,
        })
        console.log("created dataset",data);
        router.push('/dataset/'+data.ID);
      }
  };

  useEffect( () => {
    setLocaldataset({title, description,});
    setDataset({...dataset,...localdataset});
    console.log("added details",dataset);
  }, [title, description, topic, keywords]);

  useEffect( () => {
    console.log("added details",dataset);
  }, [dataset]);

    const getImages = (base64Image, fileImage) => {
        // Do something with the selected image)
        console.log(base64Image);
        console.log(fileImage);
    };

  return (
    <Box sx={{display:'flex', flexDirection:'row'}}>
        <Box sx={{width:"18%", display:'flex', flexDirection:'column'}}>
            <LeftNav />
        </Box>

        <Box sx={{width:"82%", bgcolor: '#f7f7f7'}}>
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

            <Box sx={{ display: 'flex', flexDirection:'row', py: 2,px:4, bgcolor: '#f7f7f7', justifyContent:'space-between'}}>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', fontSize:18, width:"40%",
                    color:'gray-700', alignItems:'center'}}>
                    <Button  size="medium" sx={{display:'flex', alignItems:'center',paddingRight:2,
                            justifyContent:'center'}} startIcon={<ArrowBackIcon />} onClick={()=>router.back()}>
                            {"Back"}</Button>
                    <Divider variant="middle" orientation="vertical" />
                    <div style={{paddingLeft:8,paddingRight:2,fontSize:24}}>Settings</div>

                </Box>
                </Box>

            <Box
                sx={{ flexGrow: 1, bgcolor: "background.paper", display: 'flex' , minHeight:'88vh',mx:2, pt:2}}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'left', }}
                >
                    <Tab sx={{ textAlign: 'left', }} label={"User Profile "} {...a11yProps(0)} />
                    <Tab sx={{ textAlign: 'left', }} label="Notification" {...a11yProps(1)} />
                    <Tab sx={{ textAlign: 'left', active: {color:'#5A00E2' }}} label="API Configurations" {...a11yProps(2)} />

                </Tabs>
                <TabPanel value={value} index={0} sx={{width:'100%',}}>
                    <Box sx={{display:'flex',flexDirection:'column', alignItems:'space-between', width:'100%'}}>
                    <Box >
                        <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto',
                         fontSize:20,pb:2, minWidth:'100%', mr:45, }}>
                            <div>My Account &nbsp;</div>
                            <Avatar alt="Remy Sharp" sx={{height:175, width:175, marginTop:2}} src="https://picsum.photos/200/300" />
                         </Box>

                    <Box sx={{display:'flex', flexDirection:'column',width:"100%", bgColor:'#fff',color:'#fff', paddingBottom:28}}>
                        <FormControl fullWidth sx={{width:'100%' }}>
                            {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}

                            <div style={{fontSize:12, paddingTop:4, color:'#939EAA',textTransform:'uppercase'}}>Full Name</div>
                            <div style={{display:'flex', alignItems:'center', paddingTop:12}}>
                                <AccountCircleOutlinedIcon sx={{fontSize:28, color:'black'}}/>
                                <div style={{fontSize:20, paddingLeft:8, color:'#030D55',}}>
                                    {user!== null && user !== undefined ? user.firstname+" "+user.lastname: ""}</div>
                            </div>

                            <div style={{fontSize:12, paddingTop:24, color:'#939EAA',textTransform:'uppercase'}}>Email Address</div>
                            <div style={{display:'flex', alignItems:'center', paddingTop:12}}>
                                <AlternateEmailOutlinedIcon sx={{fontSize:28, color:'black'}}/>
                                <div style={{fontSize:20, paddingLeft:8, color:'#030D55',}}>
                                    {user!== null && user !== undefined ? user.email: ""}
                                </div>
                            </div>

                            <div style={{fontSize:12, paddingTop:24, color:'#939EAA',textTransform:'uppercase'}}>Password</div>
                            <div style={{display:'flex', alignItems:'center', paddingTop:12}}>
                                <LockIcon sx={{fontSize:28, color:'black'}}/>
                                <div style={{fontSize:20, paddingLeft:8, color:'#030D55',
                                    }} type="password">{"**********"}</div>
                            </div>

                        </FormControl>
                    </Box>
                    </Box>

                    </Box>
                </TabPanel>
                <TabPanel value={value} index={1} sx={{width:'100%',}}>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto',fontSize:20,mr:75,width:'100%'}}>
                        <div>Notification Settings &nbsp;</div>

                    </Box>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                        <div style={{display: 'flex',flexDirection:'column',width:"45%"}}>
                            <div style={{color:'black'}}>Email Notification</div>
                            <div style={{color:'gray', width:'80%'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{ marginLeft:12,display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>News and update</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>News and update</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                        </div>

                    </Box>

                    <Divider sx={{width:'100%', marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4}}>
                        <div style={{display: 'flex',flexDirection:'column',width:"45%"}}>
                            <div style={{color:'black'}}>Reminders</div>
                            <div style={{color:'gray', width:'80%'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{ marginLeft:12,display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>All Reminders</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                            <div style={{display:'flex', alignItems:"start", paddingBottom:24}}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"
                                       style={{backgroundColor:'#5A00E2'}}/>
                                <div style={{display: 'flex',flexDirection:'column',marginLeft:8}}>
                                    <div style={{color:'black'}}>Important only</div>
                                    <div style={{color:'gray'}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. "} &nbsp;</div>
                                </div>
                            </div>
                        </div>

                    </Box>

                    <Divider sx={{width:'100%', marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                            width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray',}}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch  defaultChecked />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'column', font:'roboto',fontSize:20,mr:75}}>
                        <div>API Configuration &nbsp;</div>

                    </Box>
                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                        width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray', }}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch  />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                    <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',pt:4,paddingBottom:2,
                        width:'100%', justifyContent:'space-between'}}>
                        <div style={{display: 'flex',flexDirection:'column',}}>
                            <div style={{color:'black'}}>Notification</div>
                            <div style={{color:'gray', }}>{localdataset.title ? localdataset.title : "Euismod rhoncus ac in ultrices a. At ipsum varius massa interdum. Quam adipiscing"} &nbsp;</div>
                        </div>

                        <div style={{display:'flex', flexDirection:'column',alignItems:'start'}}>
                            <Switch   />
                        </div>

                    </Box>

                    <Divider sx={{width:'100%',marginBottom:2}} />

                </TabPanel>

            </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog}/>
          </Box>                  
       </Modal>

      {/*  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column',}}>*/}
      {/*    <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>*/}
      {/*       <Typography color="inherit" variant="h5" component="h1">*/}
      {/*            <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',}}>*/}
      {/*                <div>Matching Topics &nbsp;</div>*/}
      {/*           */}
      {/*            </Box>*/}
      {/*        </Typography>*/}
      {/*    </Box>*/}

      {/*    <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', */}
      {/*        justifyContent:"center",alignItems:'center', }}>*/}
      {/*          {dataSources && <TopicsCard */}
      {/*            openDetails={openDetails}*/}
      {/*            data={dataSources}*/}
      {/*            token={token}*/}
      {/*            user={user}*/}
      {/*            handleOpenDetails={handleOpenDetails}*/}
      {/*            handleCloseDetails={handleCloseDetails} */}
      {/*            dataset={dataset.catalog}*/}
      {/*            dataSources={dataSources}*/}
      {/*            removeDatasetcatalog={removeDatasetcatalog}*/}
      {/*            addDatasetcatalog={addDatasetcatalog}*/}
      {/*            />}*/}
      {/*    </Box>*/}
      {/*</Box>*/}
    
      {/* <Box sx={{  minHeight: '23vh', }}>        
        <Box component="main" sx={{ flex: 1, pt:6, px: 4, bgcolor: '#ffffff' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>HELP CENTER &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box component="main" sx={{ py:4,bgcolor: '#ffffff' }}>

            <Box sx={{ 
                    minheight:275, my:1, px:16, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
                    alignItems:'center', justifyContent:'space-between', alignSelf:'center' }}>
             <HelpCenterCard 
                title={"GETTING STARTED"}
                description={"Learn about how Data Platform works. Information for new users."}
                linkText={'How to Create a Custom Dataset?'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"GEOGRAPHIC AND TIME GRAINS"}
                description={"Learn what Geographic and Time grains are and how they work."}
                linkText={'Data Grains Explained'}
                link={'#'}
                all={'See all articles'}/>

              <HelpCenterCard 
                title={"DATA SCIENCE TREATMENTS"}
                description={"Learn about the different data science treatments you can apply to your signals."}
                linkText={'Overview of Data Science Treatments'}
                link={'#'}
                all={'See all articles'}/>

            </Box>
        </Box>
    </Box>   */}

        </Box>
    </Box>
  );
}

