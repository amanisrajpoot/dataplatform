import {useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import { confirmSignUp, signIn, signOut } from '../function/checkAuth';
import DataSourcesDetails from '../components/datasourcesdetails';
import { useRouter } from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import InputAdornment from "@mui/material/InputAdornment";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';
import InputBase from '@mui/material/InputBase';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { RWebShare } from "react-web-share";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar, } from 'recharts';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Auth } from 'aws-amplify';


const data = [
    // {name: 'Jan', datasets: 400,industry_points: 400,amt: 2400},{name: 'Feb', datasets: 300,industry_points: 500, amt: 2000},
    // {name: 'Mar', datasets: 200,industry_points: 600, amt: 2200},{name: 'Apr', datasets: 400,industry_points: 700, amt: 2400},
    // {name: 'May', datasets: 500,industry_points: 400, amt: 2400},{name: 'Jun', datasets: 600,industry_points: 600, amt: 2400},
    {name: 'COV-19 Mortality', datasets: 550,industry_points: 800, amt: 2400},{name: 'COV-19 Vaccination', datasets: 800,industry_points: 400, amt: 2400},
    {name: 'COV-19 Surveillance', datasets: 500,industry_points: 500, amt: 2400},{name: 'Insurance Coverage', datasets: 600,industry_points: 600, amt: 2400},
    {name: 'Disability', datasets: 700,industry_points: 900, amt: 2400},];

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

export default function Dashboard({
                                      token,
                                      setToken,
                                      dataset,
                                      userdatasets,
                                      setUserdatasets,
                                      dataSources,
                                      setDataSources,
                                      user,
                                      setuser,

                                  }) {

    const router = useRouter()
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

    useEffect(async () => {
        console.log('user call token', token);
        const userP = await getUser(token);
        if(user === null){
            setuser({});
        }else{
            setuser(userP)
        }
        console.log('userP', userP);
    }, [token, router]);

    useEffect(async () => {
        // console.log("user aws",Auth.user.attributes.email);
        // console.log("user aws",Auth.user.attributes.name);
        // console.log("user aws",Auth.user.attributes.company);
    },[router]);

    useEffect(async () => {
        const data = await getDatasets(
            token
        );
        setUserdatasets(data);
    console.log("fetched datasets",data);
    }, [token,router]);
        
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

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const post1 = new Date(2018, 0, 1, 10, 33);
    const post2 = new Date(2020, 1, 18, 9, 33);
    const post3 = new Date(2020, 12, 21, 11, 33);

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
                <Box sx={{width:"18%",}}>
                    <Box sx={{width:"18%",position:'fixed'}}>
                    <LeftNav token={token} userdatasets={userdatasets} setUserdatasets={setUserdatasets}/>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width:'82%',flexDirection:'column',bgcolor: '#FAFAFB', fontStyle:'roboto',}}>
                    <Box component="main" sx={{  minWidth:'82%', display:'flex', position:'fixed' }}>
                        <Box sx={{minWidth:'80%', display:'flex', flexDirection:'row', bgcolor:'white', alignItems:'center', height:"70px" }} >
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
                                <MenuItem onClick={()=>{
                                    mixpanel.track('Sign Out', {
                                        'source': "Dashboard Page",
                                        'action': "Signed Out from User Menu",
                                        'email': user.email !== null && user.email !== undefined && user.email,
                                    });
                                    signOut({path:router.pathname})
                                }}><ExitToAppIcon/>&nbsp; Sign Out</MenuItem>
                            </Menu>
                        </div>
                    </Box>

                    <Box sx={{ minWidth:'100%',width:'100%',display: 'flex', flexDirection:'column', py: 2,px:2,
                        justifyContent:'space-between',paddingTop:11}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28, paddingBottom:10}}>Dashboard &nbsp;&nbsp;</div>

                        </Box>

                        {showDraft && <Box sx={{ minWidth:"100%", width:'100%',bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                            alignItems:'start',paddingTop:1}}>

                            <div style={{height:'22ch', minWidth:'63%', maxWidth:'28ch', backgroundColor:'#E4F7FF',
                                marginRight:14, display:'flex', flexDirection:'row',marginBotoom:8,
                                justifyContent:"space-between",borderRadius:9,  }}>
                                <div style={{marginTop:18,marginLeft:18, display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between', width:'80%', overflow:'hidden',
                                }}
                                >

                                    <div>
                                        <div style={{color:'black', fontSize:20,}}>Announcement </div>
                                        <div style={{paddingTop:12,color:'gray'}}>The health data platform is in public beta, for a limited time period we are offering our professional version of the platform for free to the early adopters. Please take our product for a test drive and let us know what you think.</div>
                                    </div>
                                    <div style={{paddingTop:12,color:'gray', paddingBottom:24}}>{today.toLocaleDateString("en-US", options)}</div>
                                </div>
                                <div style={{marginTop:12, cursor:'pointer', width:'20%', display:'flex', justifyContent:"center",alignItems:'center'}}
                                     onClick={()=>router.push('/searchresult')} >
                                    <div><CelebrationIcon sx={{fontSize:124, color: "#FFC542", opacity:0.4, pb:1,
                                    }}/></div>

                                </div>
                            </div>

                            <div style={{height:'22ch', minWidth:'35.8%', maxWidth:'35.8%', backgroundColor:'#FFF4E4',
                                marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9, }}>
                                <div style={{marginLeft:18, display:'flex', flex:"start", flexDirection:'column',height:'100%',
                                    lineHeight:"22px", justifyContent:'space-between', justifyItems:'space-between',paddingTop:18, paddingRight:12
                                }}>

                                    <div>
                                        <div style={{color:'black', fontSize:18,}}>We would love to hear your opinion </div>
                                        <div style={{paddingTop:12,color:'gray'}}>Please feel free to give your advice and notes on how we can do better to give you more. </div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', paddingBottom:24, display:'flex',width:'100%',
                                                justifyContent:'space-between'}}>
                                        <Button
                                            variant="filled"
                                            sx={{bgcolor:'#FF9800', borderRadius:2, color:"#fff",
                                                textTransform:'capitalize', maxHeight:42}}
                                            endIcon={<ArrowForwardIcon />}
                                            onClick={()=>{
                                                mixpanel.track('Redirected to Survey Page', {
                                                    'source': "Dashboard Page",
                                                    'action': "Survey Button Clicked",
                                                    'email': user.email !== null && user.email !== undefined && user.email,
                                                });
                                                router.push('https://0w6e3b6atr1.typeform.com/to/JliJ1Qvo')
                                            }}
                                        >Take Survey</Button>
                                        <PollOutlinedIcon sx={{fontSize:42}}/>
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

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'28ch', backgroundColor:'#FFF',
                                marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                                }}
                                >

                                    <div onClick={()=>{
                                        mixpanel.track('Redirected to 1st Industry Wide Trends URL', {
                                            'source': "Dashboard Page",
                                            'action': "1st Industry Wide Trends Clicked",
                                            "url": "https://catalyst.nejm.org/doi/full/10.1056/CAT.18.0290",
                                            'email': user.email !== null && user.email !== undefined && user.email,
                                        });
                                        router.push('https://catalyst.nejm.org/doi/full/10.1056/CAT.18.0290')
                                    }}>
                                        <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                        >Big Data is essential to every significant healthcare undertaking. </div>
                                        <div style={{paddingTop:12,color:'#667280'}}
                                        >Read about the challenges, applications, and potential brilliant future for healthcare big data.</div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                        justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{color:'gray',fontSize:14}}>{post1.toLocaleDateString("en-US", options)}</div>
                                        <RWebShare
                                            data={{
                                                text: "Read about the challenges, applications, and potential brilliant future for healthcare big data.",
                                                url: "https://catalyst.nejm.org/doi/full/10.1056/CAT.18.0290",
                                                title: "Big Data is essential to every significant healthcare undertaking.",
                                            }}
                                            onClick={() => {
                                                mixpanel.track('Shared 1st Industry Wide Trends URL', {
                                                    'source': "Dashboard Page",
                                                    'action': "Clicked on Share button of 1st Industry Wide Trends",
                                                    "url": "https://catalyst.nejm.org/doi/full/10.1056/CAT.18.0290",
                                                    'email': user.email !== null && user.email !== undefined && user.email,
                                                });
                                                console.log("shared successfully!")
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                                    textTransform:'capitalize'}}
                                            >Share</Button>
                                        </RWebShare>

                                    </div>
                                </div>
                            </div>

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'28ch', backgroundColor:'#FFF',
                                marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                                }}
                                >
                                    <div onClick={()=>{
                                        mixpanel.track('Redirected to 2nd Industry Wide Trends URL', {
                                            'source': "Dashboard Page",
                                            'action': "2nd Industry Wide Trends Clicked",
                                            "url": "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                            'email': user.email !== null && user.email !== undefined && user.email,
                                        });
                                        router.push('https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/')
                                    }}>
                                        <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                        >How these 4 tech trends are reshaping healthcare</div>
                                        <div style={{paddingTop:12,color:'#667280'}}>It’s evident that, in the years ahead, this sector will continually and increasingly be defined by the development.</div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                        justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{color:'gray',fontSize:14}}>{post2.toLocaleDateString("en-US", options)}</div>
                                        <RWebShare
                                            data={{
                                                text: "It’s evident that, in the years ahead, this sector will continually and increasingly be defined by the development.",
                                                url: "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                                title: "How these 4 tech trends are reshaping healthcare",
                                            }}
                                            onClick={() => {
                                                mixpanel.track('Shared 2nd Industry Wide Trends URL', {
                                                    'source': "Dashboard Page",
                                                    'action': "Clicked on Share button of 2nd Industry Wide Trends",
                                                    "url": "https://medcitynews.com/2020/02/from-data-to-ai-how-these-4-tech-trends-are-reshaping-healthcare/",
                                                    'email': user.email !== null && user.email !== undefined && user.email,
                                                });
                                                console.log("shared successfully!")
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                                    textTransform:'capitalize'}}
                                            >Share</Button>
                                        </RWebShare>
                                    </div>
                                </div>
                            </div>

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'28ch', backgroundColor:'#FFF',
                                marginRight:14, display:'flex', flexDirection:'column',marginBotoom:8,
                                justifyContent:"space-around", flex:'end',borderRadius:9,}}>
                                <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                    lineHeight:"22px", justifyContent:'space-between',  paddingTop:18, marginRight:18,
                                }}
                                >

                                    <div onClick={()=>{
                                        mixpanel.track('Redirected to 3rd Industry Wide Trends URL', {
                                            'source': "Dashboard Page",
                                            'action': "3rd Industry Wide Trends Clicked",
                                            "url": "https://www.pwc.com/gx/en/industries/healthcare/publications/ai-robotics-new-health/five-trends.html",
                                            'email': user.email !== null && user.email !== undefined && user.email,
                                        });
                                        router.push('https://www.pwc.com/gx/en/industries/healthcare/publications/ai-robotics-new-health/five-trends.html')
                                    }}>
                                        <div style={{color:'black', fontSize:18, fontWeight:'500'}}
                                        >Five distinct trends are converging to determine</div>
                                        <div style={{paddingTop:12,color:'#667280'}}>Five distinct trends are converging to determine how artificial intelligence (AI) and robotics will define New Health.</div>
                                    </div>
                                    <div style={{paddingTop:18,color:'gray', display:'flex',paddingBottom:24,
                                        justifyContent:'space-between', alignItems:'center'}}>
                                        <div style={{color:'gray',fontSize:14}}>{post3.toLocaleDateString("en-US", options)}</div>
                                        <RWebShare
                                            data={{
                                                text: "Five distinct trends are converging to determine how artificial intelligence (AI) and robotics will define New Health.",
                                                url: "https://www.pwc.com/gx/en/industries/healthcare/publications/ai-robotics-new-health/five-trends.html",
                                                title: "Five distinct trends are converging.",
                                            }}
                                            onClick={() => {
                                                mixpanel.track('Shared 3rd Industry Wide Trends URL', {
                                                    'source': "Dashboard Page",
                                                    'action': "Clicked on share button of 3rd Industry Wide Trends",
                                                    'url': "https://www.pwc.com/gx/en/industries/healthcare/publications/ai-robotics-new-health/five-trends.html",
                                                    'email': user.email !== null && user.email !== undefined && user.email,
                                                });
                                                console.log("shared successfully!")
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                sx={{ borderRadius:2, borderColor:'#667280', color:'#667280',
                                                    textTransform:'capitalize'}}
                                            >Share</Button>
                                        </RWebShare>
                                    </div>
                                </div>
                            </div>

                        </Box>}

                    </Box>

                    {showDraft && <Box sx={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                        alignItems:'start',marginLeft:2,marginRight:2, paddingTop:2}}>

                        <div style={{height:'58ch', minWidth:'97.2%', backgroundColor:'#FFF',
                            marginRight:14, display:'flex', flexDirection:'row',marginBottom:8,
                            justifyContent:"space-between",borderRadius:9,  }}>
                            <div style={{marginTop:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                lineHeight:"22px", justifyContent:'space-between', width:'100%'
                            }}
                            >

                                <div>
                                    <div style={{color:'black', fontSize:20,marginLeft:18,}}>Top Downloads by Topic</div>
                                </div>
                                {/*<LineChart width={800} height={450} data={data}margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>*/}
                                {/*    <Line type="monotone" strokeWidth={3} dataKey="datasets" stroke="#46D989" label={"Hello"}/>*/}
                                {/*    <Line type="monotone" strokeWidth={3} dataKey="industry_points" stroke="#24BBFF" />*/}
                                {/*    <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />*/}
                                {/*    <XAxis dataKey="name" axisLine={false} stroke="#92929D"/>*/}
                                {/*    <YAxis axisLine={false} stroke="#92929D"/>*/}
                                {/*    <Tooltip content={<CustomTooltip />}/>*/}
                                {/*</LineChart>*/}

                                <BarChart width={1100} height={450} data={data} margin={{  bottom: 5}} >
                                    <XAxis dataKey="name" axisLine={false} stroke="#92929D" />
                                    <YAxis axisLine={false} stroke="#92929D"/>
                                    <Tooltip />
                                    <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                                    <Bar dataKey="datasets" fill="#8884d8" barSize={50} />
                                </BarChart>
                            </div>

                        </div>

                        {/*<div>*/}
                        {/*    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',*/}
                        {/*        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,*/}
                        {/*        justifyContent:"space-around", flex:'end',borderRadius:9, }}>*/}
                        {/*        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',*/}
                        {/*            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'*/}
                        {/*        }}*/}
                        {/*             onClick={()=>router.push(`/topic/FDA`)} >*/}
                        {/*            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#5A00E2', borderRadius:50,*/}
                        {/*                padding:18, marginRight:18,}}>*/}
                        {/*                <RoomServiceOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <div style={{color:'black', fontSize:18,}}>Food & Drugs Administration </div>*/}
                        {/*                <div style={{paddingTop:12,color:'#5A00E2', fontSize:28}}>3412</div>*/}
                        {/*            </div>*/}

                        {/*        </div>*/}
                        {/*    </div>*/}


                        {/*    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',*/}
                        {/*        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8, marginTop:20,*/}
                        {/*        justifyContent:"space-around", flex:'end',borderRadius:9, }}>*/}
                        {/*        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',*/}
                        {/*            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'*/}
                        {/*        }}*/}
                        {/*             onClick={()=>router.push(`/topic/Physician`)} >*/}
                        {/*            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#24BBFF', borderRadius:50,*/}
                        {/*                padding:18, marginRight:18}}>*/}
                        {/*                <MasksOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <div style={{color:'black', fontSize:18,}}>Physician </div>*/}
                        {/*                <div style={{paddingTop:12,color:'#24BBFF', fontSize:28}}>4578</div>*/}
                        {/*            </div>*/}

                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',*/}
                        {/*        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,marginTop:20,*/}
                        {/*        justifyContent:"space-around", flex:'end',borderRadius:9, }}>*/}
                        {/*        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',*/}
                        {/*            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'*/}
                        {/*        }}*/}
                        {/*             onClick={()=>router.push(`/topic/Drugs`)} >*/}
                        {/*            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#FF9800', borderRadius:50,*/}
                        {/*                padding:18, marginRight:18}}>*/}
                        {/*                <MedicalServicesOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <div style={{color:'black', fontSize:18,}}>Drugs </div>*/}
                        {/*                <div style={{paddingTop:12,color:'#FF9800', fontSize:28}}>6532</div>*/}
                        {/*            </div>*/}

                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div style={{height:'12ch', minWidth:'29ch', maxWidth:'28ch', backgroundColor:'#FFF',*/}
                        {/*        marginRight:12, display:'flex', flexDirection:'column',marginBotoom:8,marginTop:20,*/}
                        {/*        justifyContent:"space-around", flex:'end',borderRadius:9, }}>*/}
                        {/*        <div style={{marginLeft:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'row',*/}
                        {/*            lineHeight:"22px", width:'85%', paddingTop:18, alignItems:'center'*/}
                        {/*        }}*/}
                        {/*             onClick={()=>router.push(`/topic/Insurance Companies`)} >*/}
                        {/*            <div style={{paddingTop:18,color:'gray', paddingBottom:24, backgroundColor:'#FF6262', borderRadius:50,*/}
                        {/*                padding:18, marginRight:18}}>*/}
                        {/*                <CorporateFareOutlinedIcon fontSize="large" sx={{color:"#fff"}}/>*/}
                        {/*            </div>*/}
                        {/*            <div>*/}
                        {/*                <div style={{color:'black', fontSize:18,}}>Insurance Companies </div>*/}
                        {/*                <div style={{paddingTop:12,color:'#FF6262', fontSize:28}}>7890</div>*/}
                        {/*            </div>*/}

                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*</div>*/}

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

