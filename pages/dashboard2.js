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
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
const data = [{name: 'Jan', datasets: 400,industry_points: 400,amt: 2400},{name: 'Feb', datasets: 300,industry_points: 500, amt: 2000},
    {name: 'Mar', datasets: 200,industry_points: 600, amt: 2200},{name: 'Apr', datasets: 400,industry_points: 700, amt: 2400},
    {name: 'May', datasets: 500,industry_points: 400, amt: 2400},{name: 'Jun', datasets: 600,industry_points: 600, amt: 2400},
    {name: 'Jul', datasets: 550,industry_points: 800, amt: 2400},{name: 'Aug', datasets: 800,industry_points: 400, amt: 2400},
    {name: 'Sep', datasets: 500,industry_points: 500, amt: 2400},{name: 'Oct', datasets: 600,industry_points: 600, amt: 2400},
    {name: 'Nov', datasets: 700,industry_points: 900, amt: 2400},{name: 'Dec', datasets: 800,industry_points: 1000, amt: 2400}];

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

export default function Dashboard({
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

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{backgroundColor:'#fff', borderRadius:20,
                    boxShadow: "0px 5px 15px rgba(68, 68, 79, 0.1)", height:140, width:180,  }}>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center',paddingLeft:20, paddingTop:18}}>
                        <FiberManualRecordIcon sx={{color:'#46D989'}}/>
                        <div style={{paddingLeft:8}}>
                            <div style={{fontSize:18, color:'#171725'}} >
                                {`${payload[0].value}`}
                            </div>
                            <div style={{fontSize:14, color:'#9A99AD'}}>
                                {`Datasets`}
                            </div>
                        </div>
                        
                    </div>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center',paddingLeft:20, paddingTop:24}}>
                        <FiberManualRecordIcon sx={{color:'#24BBFF'}}/>
                        <div style={{paddingLeft:8}}>
                            <div style={{fontSize:18, color:'#171725'}} >
                                {`${payload[1].value}`}
                            </div>
                            <div style={{fontSize:14, color:'#9A99AD'}}>
                                {`Industry Points`}
                            </div>
                        </div>

                    </div>
                </div>
            );
        }

        return null;
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

            <Box sx={{ display: 'flex', flexDirection:'column', py: 2,px:2,justifyContent:'space-between'}}>

                    <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                        color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                        <div style={{fontSize:24, paddingBottom:12}}>Dashboard &nbsp;&nbsp;</div>

                    </Box>

                {showDraft && <Box sx={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                    alignItems:'start',paddingTop:1}}>

                    <div style={{height:'18ch', minWidth:'74.5ch', maxWidth:'28ch', backgroundColor:'#E4F7FF',
                        marginRight:14, display:'flex', flexDirection:'row',marginBotoom:8,
                        justifyContent:"space-between",borderRadius:9,  }}>
                        <div style={{marginTop:18,marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                            lineHeight:"22px", justifyContent:'space-between', width:'80%'
                            }}
                             onClick={()=>router.push('/searchresult')} >

                            <div>
                                <div style={{color:'black', fontSize:20,}}>Announcement </div>
                                <div style={{paddingTop:12,color:'gray'}}>Non, nisl, tortor id facilisis et elementum ultrices arcu cras. Sit montes, lectus non commodo, lectus auctor. Netus amet leo nascetur neque. Et molestie sem odio dui, curabitur. Ac sapien porta tempor enim.</div>
                            </div>
                            <div style={{paddingTop:12,color:'gray', paddingBottom:24}}>23 Mar, 2021 09:10PM</div>
                        </div>
                        <div style={{marginTop:12, cursor:'pointer', width:'20%', display:'flex', justifyContent:"center",alignItems:'center'}}
                             onClick={()=>router.push('/searchresult')} >
                            <div><CelebrationIcon sx={{fontSize:124, color: "#FFC542", opacity:0.4, pb:1,
                            }}/></div>

                        </div>
                    </div>

                    <div style={{height:'18ch', minWidth:'36.5ch', maxWidth:'28ch', backgroundColor:'#FFF4E4',
                        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,
                        justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                            lineHeight:"22px", justifyContent:'space-between', width:'85%', paddingTop:18
                        }}
                             onClick={()=>router.push('/searchresult')} >

                            <div>
                                <div style={{color:'black', fontSize:18,}}>We would love to hear your opinion </div>
                                <div style={{paddingTop:12,color:'gray'}}>Please feel free to give your advice and notes on how we can do better to give you more. </div>
                            </div>
                            <div style={{paddingTop:18,color:'gray', paddingBottom:24}}>
                                <Button
                                    variant="filled"
                                    sx={{bgcolor:'#FF9800', borderRadius:2, color:"#fff",
                                    textTransform:'capitalize'}}
                                    endIcon={<ArrowForwardIcon />}
                                >Take Survey</Button>
                            </div>
                        </div>
                    </div>

                </Box>}

                </Box>

            <Box sx={{ display: 'flex', flexDirection:'column', py: 2,px:2,justifyContent:'space-between'}}>

                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                    color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                    <div style={{fontSize:22, paddingBottom:12}}>Industry-wide trends &nbsp;&nbsp;</div>

                </Box>

                {showDraft && <Box sx={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                    alignItems:'start', paddingTop:1}}>

                    <div style={{height:'18ch', minWidth:'36.5ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                        justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                            lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                        }}
                             onClick={()=>router.push('/searchresult')} >

                            <div>
                                <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                    >Datasets for the Insaurance approval </div>
                                <div style={{paddingTop:12,color:'#667280'}}>There is no better classification and accumulation of data at a single portal on the internet. </div>
                            </div>
                            <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                        justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{color:'gray',fontSize:14}}>23 Mar, 2021 09:10PM</div>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                        textTransform:'capitalize'}}
                                >Share</Button>
                            </div>
                        </div>
                    </div>

                    <div style={{height:'18ch', minWidth:'36.5ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                        justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                            lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                        }}
                             onClick={()=>router.push('/searchresult')} >

                            <div>
                                <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                >Datasets for the Insaurance approval </div>
                                <div style={{paddingTop:12,color:'#667280'}}>There is no better classification and accumulation of data at a single portal on the internet. </div>
                            </div>
                            <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{color:'gray',fontSize:14}}>23 Mar, 2021 09:10PM</div>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                        textTransform:'capitalize'}}
                                >Share</Button>
                            </div>
                        </div>
                    </div>

                    <div style={{height:'18ch', minWidth:'36.5ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                        justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                            lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                        }}
                             onClick={()=>router.push('/searchresult')} >

                            <div>
                                <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                >Datasets for the Insaurance approval </div>
                                <div style={{paddingTop:12,color:'#667280'}}>There is no better classification and accumulation of data at a single portal on the internet. </div>
                            </div>
                            <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                justifyContent:'space-between', alignItems:'center'}}>
                                <div style={{color:'gray',fontSize:14}}>23 Mar, 2021 09:10PM</div>
                                <Button
                                    variant="outlined"
                                    sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                        textTransform:'capitalize'}}
                                >Share</Button>
                            </div>
                        </div>
                    </div>

                </Box>}

            </Box>

            {showDraft && <Box sx={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                alignItems:'start',marginLeft:2, paddingTop:2}}>

                <div style={{height:'54ch', minWidth:'82ch', maxWidth:'28ch', backgroundColor:'#FFF',
                    marginRight:14, display:'flex', flexDirection:'row',marginBottom:8,
                    justifyContent:"space-between",borderRadius:9,  }}>
                    <div style={{marginTop:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                        lineHeight:"22px", justifyContent:'space-between', width:'100%'
                    }}
                         >

                        <div>
                            <div style={{color:'black', fontSize:20,marginLeft:18,}}>Analytics</div>
                        </div>
                        <LineChart width={800} height={450} data={data}margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" strokeWidth={3} dataKey="datasets" stroke="#46D989" label={"Hello"}/>
                            <Line type="monotone" strokeWidth={3} dataKey="industry_points" stroke="#24BBFF" />
                            <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                            <XAxis dataKey="name" axisLine={false} stroke="#92929D"/>
                            <YAxis axisLine={false} stroke="#92929D"/>
                            <Tooltip content={<CustomTooltip />}/>
                        </LineChart>
                    </div>

                </div>

                <div>
                    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,
                        justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',
                            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'
                        }}
                             onClick={()=>router.push('/searchresult')} >
                            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#5A00E2', borderRadius:50,
                                padding:18, marginRight:18,}}>
                                <RoomServiceOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>
                            </div>
                            <div>
                                <div style={{color:'black', fontSize:18,}}>Food & Drugs Administration </div>
                                <div style={{paddingTop:12,color:'#5A00E2', fontSize:28}}>3412</div>
                            </div>

                        </div>
                    </div>


                    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8, marginTop:20,
                        justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',
                            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'
                        }}
                             onClick={()=>router.push('/searchresult')} >
                            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#24BBFF', borderRadius:50,
                                  padding:18, marginRight:18}}>
                                <MasksOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>
                            </div>
                            <div>
                                <div style={{color:'black', fontSize:18,}}>Physician </div>
                                <div style={{paddingTop:12,color:'#24BBFF', fontSize:28}}>4578</div>
                            </div>

                        </div>
                    </div>

                    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,marginTop:20,
                        justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',
                            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'
                        }}
                             onClick={()=>router.push('/searchresult')} >
                            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#FF9800', borderRadius:50,
                                padding:18, marginRight:18}}>
                                <MedicalServicesOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>
                            </div>
                            <div>
                                <div style={{color:'black', fontSize:18,}}>Drugs </div>
                                <div style={{paddingTop:12,color:'#FF9800', fontSize:28}}>6532</div>
                            </div>

                        </div>
                    </div>

                    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',
                        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,marginTop:20,
                        justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',
                            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'
                        }}
                             onClick={()=>router.push('/searchresult')} >
                            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#FF6262', borderRadius:50,
                                padding:18, marginRight:18}}>
                                <CorporateFareOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>
                            </div>
                            <div>
                                <div style={{color:'black', fontSize:18,}}>Companies </div>
                                <div style={{paddingTop:12,color:'#FF6262', fontSize:28}}>7890</div>
                            </div>

                        </div>
                    </div>

                </div>

            </Box>}

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

