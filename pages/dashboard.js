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
import {useRouter} from 'next/router';
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import LeftNav from "../components/LeftNav";
import mixpanel from 'mixpanel-browser';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import { RWebShare } from "react-web-share";
import styles from '../styles/dashboard.module.css';
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Auth } from 'aws-amplify';
import {createUser} from "../function/users";
mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true});
import {
    CartesianGrid,
    XAxis,
    YAxis,
    BarChart,
    ResponsiveContainer,
    Bar, 
    Tooltip,
    Legend,
  } from "recharts";

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

export default function Dashboard({
                                      token,
                                      setToken,
                                      dataset,
                                      userdatasets,
                                      setUserdatasets,
                                      dataSources,
                                      setDataSources,
                                      user,
                                      name,
                                      email, 
                                      company,
                                      setuser,

                                  }) {

    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);
    const open2 = Boolean();
    const [currentRouteTitle, setCurrentRouteTitle] = useState("")
    const [items, setItems] = useState([]); 

    useEffect(()=>{
        console.log("dashboard token", token)
    },[token])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleClose2 = () => {
        setAnchorEl(null);
    };

    const [localdataset, setLocaldataset] = useState([]);

    const handleOpen2 = () => {
        setOpen(false);
        setOpen2(true);}
    const handleClose = () => setOpen(false);

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined &&
            user !== {} && user !== null && user !== undefined){
            console.log('get users called from dashboard', token);
            const userP = await getUser(token);
            if(userP === null || userP === undefined ){
                setuser({})
            } else{
                setuser(userP)
            }
            console.log('userP', userP);
        }
    }, [token]);

    useEffect((async ()=> {
        console.log("dashboard user create function reached")
        console.log("query",router.query)
        console.log("cameFrom",router.query.cameFrom)
        console.log("origin",router.query.origin)
        sleep(2000);
        if(token && (user === {} || user === null || user.error)){
          console.log("cleared the conditions to create user")

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
        //   if("ID" in erro){
        //        router.reload()
        //      }
        }
    }),[])

    useEffect(async () => {
        if(token !== 0 && token && token !== null && token !== undefined && 
            (userdatasets === [] || userdatasets === null)){
            console.log('get datasets called from dashboard', token);
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
            console.log("fetched datasets",data);
        }
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
        if(token !== 0 && !token && token !== null && token !== undefined){
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

    useEffect(async () => {
		if(token!==null){
            const data = await getPublicDatasets(
			token
		    );
			setDataSources(data);
      console.log("fetched data",data);
      }
  }, []);

    useEffect(async ()=>{
        if(dataSources && dataSources !== null && dataSources !== undefined && dataSources.length > 0){
        setUniqueTopics([...new Set(dataSources.map(item => item.topic))])
        console.log("unique topicsssssss",uniqueTopics);
        }
    }, [dataSources])

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today  = new Date();
    const post1 = new Date(2018, 0, 1, 10, 33);
    const post2 = new Date(2020, 1, 18, 9, 33);
    const post3 = new Date(2020, 12, 21, 11, 33);
    const [uniqueTopics, setUniqueTopics] = useState();
    const [topicNumbers, setTopicNumbers] = useState([]);

    useEffect(async ()=>{
        topicNumbers.length === 0 && uniqueTopics && uniqueTopics.length > 0 && uniqueTopics.map(async (topic)=>{
            const data = dataSources.filter(item=>item.topic === topic)
            setTopicNumbers(prev=>[...prev, {name:topic, Catalogs:data.length}])
        }
        )
        setItems([...items, ...topicNumbers])
        console.log("topic number count",topicNumbers);
    }, [uniqueTopics])


    return (

                <div style={{ display: 'flex',flexDirection:'column',backgroundColor: '#FAFAFB', fontStyle:'roboto',
                    height:'100%', minWidth:'100%', maxwidth:'100%',minHeight:'100%', maxHeight:'100%',}}>

                    <div style={{ minWidth:'100%', maxwidth:'100%',display: 'flex', flexDirection:'column', paddingBottom:"2em",
                        paddingLeft:'1em', paddingRight:'1em',paddingTop:'6.5em',
                        justifyContent:'space-between',}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:28, paddingBottom:10}}>Dashboard &nbsp;&nbsp;</div>

                        </Box>

                        {showDraft && <div style={{ minWidth:"100%", minWidth:'100%',bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                            alignItems:'start',paddingTop:1}}>

                            <div style={{height:'22ch', minWidth:'69%', maxWidth:'69%', backgroundColor:'#E4F7FF',
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

                            <div style={{height:'22ch', minWidth:'29.5%', maxWidth:'29.5%', backgroundColor:'#FFF4E4',
                                display:'flex', flexDirection:'column',marginBottom:8,
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
                                            variant="contained"
                                            sx={{backgroundColor:'#FF9800', borderRadius:2, color:"#fff",
                                                textTransform:'capitalize', maxHeight:42}}
                                            endIcon={<ArrowForwardIcon />}
                                            color="primary"
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

                        </div>}

                    </div>

                    <div style={{ display: 'flex', flexDirection:'column', paddingLeft:'1em', paddingRight:'1em',
                        justifyContent:'space-between'}}>

                        <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', maxWidth:'40%',
                            color:'gray-700',justifyContent:'space-between', alignItems:'end'}}>
                            <div style={{fontSize:22, paddingBottom:12}}>Industry-wide trends &nbsp;&nbsp;</div>

                        </Box>

                        {showDraft && <div style={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                            alignItems:'start', paddingTop:1}}>

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'32.5%', backgroundColor:'#FFF',
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

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'32.5%', backgroundColor:'#FFF',
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

                            <div style={{height:'22ch', minWidth:'32.5%', maxWidth:'32.5%', backgroundColor:'#FFF',
                                 display:'flex', flexDirection:'column',marginBotoom:8,
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

                        </div>}

                    </div>

                    {showDraft && <div style={{ width:"100%", bgcolor: 'gray-900', display:'flex', flexDirection:'row', flex:'start',
                        alignItems:'start',marginLeft:2, }}></div>}

                        <div style={{ minWidth:'100%', maxWidth:'100%',paddingTop:'1.5em', 
                             display:'flex', flexDirection:'row',
                            justifyContent:"space-between",borderRadius:9,  }}>
                            <div style={{marginTop:18, cursor:'pointer', display:'flex', flex:"start", flexDirection:'column',
                                lineHeight:"22px", justifyContent:'space-between', width:'100%',
                            }}
                            >

                                {/* <LineChart width={700} height={450} data={data}margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                   <Line type="monotone" strokeWidth={3} dataKey="datasets" stroke="#46D989" label={"Hello"}/>
                                   <Line type="monotone" strokeWidth={3} dataKey="industry_points" stroke="#24BBFF" />
                                   <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                                   <XAxis dataKey="name" axisLine={false} stroke="#92929D"/>
                                   <YAxis axisLine={false} stroke="#92929D"/>
                                   <Tooltip content={<CustomTooltip />}/>
                                 </LineChart> */}

                                 {/* <PieChart width={750} height={250}>
                                    <Pie data={data} dataKey="datasets" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
                                    <Pie data={data} dataKey="industry_points" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
                                    </PieChart> */}
                                <div style={{display:'flex', width:'100%'}}>
                                    <div style={{display:'flex', flexDirection:'column', width:'100%', paddingBottom:'1em'}}>
                                        <div style={{color:'black', fontSize:20,marginLeft:18,paddingBottom:"1em"}}>Catalog By Types</div>
                                        <div className="pie-row" style={{ styles }}>
                                            <ResponsiveContainer height={items.length + 420 + 69} width="100%">
                                            <BarChart
                                                width={500}
                                                height={300}
                                                data={items}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                                >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="Catalogs" fill="#8884d8" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                    
                                </div>

                                {/* <ResponsiveContainer width="100%" height="100%">
                                    <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="datasets"
                                        isAnimationActive={false}
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Pie dataKey="industry_points" data={data} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                                    <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer> */}

                                {/* <BarChart width={1100} height={450} data={data} margin={{  bottom: 5}} >
                                    <XAxis dataKey="name" axisLine={false} stroke="#92929D" />
                                    <YAxis axisLine={false} stroke="#92929D"/>
                                    <Tooltip />
                                    <CartesianGrid stroke="#F1F1F5" strokeDasharray="1 1" horizontal={false} />
                                    <Bar dataKey="datasets" fill="#8884d8" barSize={50} />
                                </BarChart> */}
                                </div>

                        </div>
                    

                    <Modal open={openDetails} onClose={handleCloseDetails}>
                        <Box sx={style2}>
                            <DataSourcesDetails user={user} handleCloseDetails={handleCloseDetails}
                                                data={dsDetails}/>
                        </Box>
                    </Modal>

                </div>
    );
}
