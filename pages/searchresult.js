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
import DataSourcesDetails from '../components/dataSourceDetails';
import { getPublicDatasets,createUserDataset } from '../function/users';
import TopicsCard from '../components/TopicsCard';
import FormControl from '@mui/material/FormControl';
import {useRouter} from 'next/router';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import mixpanel from 'mixpanel-browser';

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

export default function Searchresult({
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

  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
      setSearch(!search)}
    }

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

  useEffect(() => {
    setLocalDataset(dataset);
    console.log("updated dataset",localDataset);
  }, [dataset]);

  const handleKeywordSearch = async (event) => {
    if(token!==null){
        const data = await getPublicDatasets(
        token,keyword
      );
        setDataSources(data);
        console.log("fetched data",data);
        console.log("previous dataset",dataset);
    }
};

  const handleSendData = async () => {
      if(token!==null){
        const data = await createUserDataset({
          token,
          dataset
        });
        setUserdatasets(data);
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

  return (
    <Box>
      <Navbar token={token} setToken={setToken}/>
        
      <Box sx={{ display: 'flex' }}>        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ flex: 1, bgcolor: '#eaeff1' }}>
            {/* <Box sx={{ width: '100%', px:10,py:2,pb:4}}>
              <p>Step 2 of 3</p>
              <LinearProgress variant="determinate" value={66} sx={{height:'2vh', 
              backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
              color:'linear-gradient(to right,#094a98, #4e0c98)'}} />
            </Box> */}
            
            <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', bgcolor:"#fff",
                        color:'gray', fontSize:24, py:2,px:4,}}>
                <Box sx={{ display: 'flex', flexDirection:'row', font:'roboto', bgcolor:"#fff",
                        color:'gray', justifyContent:'space-between',fontSize:24,pl:10, py:2, pr:10}}>
                        <div style={{display:"flex"}}>
                          <div>CREATE DATASET &nbsp;</div>
                          <div><HelpOutlineIcon /></div>
                        </div>

                        <Button variant="contained" size="small" sx={{px:2, py:2.5,
              backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                      startIcon={<ArrowBackIcon />} onClick={()=>router.push('/dashboard')}>
                      {"Back to Dashboard"}</Button>


                </Box>
                
                <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:10,pb:2}}>
                    <div>BASIC INFO &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>*Enter a title and description for your signal.</div>
                </Box>

                <Box sx={{display:'flex',px:10, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>*/}
                    <TextField
                      variant="outlined"
                      value={title}
                      onChange={(event)=>setTitle(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Title"
                    />

                    <TextField
                      variant="outlined"
                      value={description}
                      onChange={(event)=>setDescription(event.target.value)}
                      sx={{color:'#fff',pb:2}}
                      rows={4}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="What this data will be doing for you?"
                      multiline
                    />

                    {/* <TextField
                      variant="outlined"
                      value={topic}
                      onChange={(event) => setTopic(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Topic"
                    /> */}
                  </FormControl>

                </Box>
              </Box>

                {/* <Box sx={{ display: 'flex', flexDirection:'column', font:'roboto', 
                    color:'gray', fontSize:18,px:16, py:2, pb:4}}>
                    <div>ENTER KEYWORDS &nbsp;</div>
                    <div style={{fontSize:12, paddingTop:4}}>{"Limit the size of your signal by filtering down to a specific geography"}</div>
                </Box>

                <Box sx={{display:'flex',px:16, width:"100%", bgColor:'#fff',color:'#fff'}}>
                <FormControl fullWidth sx={{ }}>
                    {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <TextField
                      variant="outlined"
                      value={keywords}
                      onChange={(event)=>setKeywords(event.target.value)}
                      sx={{color:'#fff', bgColor:'#fff',pb:2}}
                      //startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      label="Keywords"
                    />
                  </FormControl>
                </Box> */}

            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:14,pt:4}}>
                      <div>Explore Healthcare Data Platform &nbsp;</div>
                      <div><HelpOutlineIcon /></div>
                  </Box>
              </Typography>
              
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'1', py: 2, px: 8, bgcolor: '#eaeff1',
              justifyContent: 'space-between',


            }}
            noValidate
            autoComplete="off"
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', flex:'1', }}> 
            <Box component="main" sx={{  minWidth: '42vw', px:5}}>
                <TextField fullWidth id="outlined-basic" variant="outlined" 
                value={keyword} onChange={(e) => setKeyword(e.target.value)}
                label="Keyword" sx={{ bgcolor: '#ffffff'}}
                onKeyDown={()=>handleKeywordSearch()}/>
            </Box>
            
            <Box>
                <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                onClick={()=>handleKeywordSearch()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Search</div>
                </Button>

            </Box>
            </Box>

            <Box>
              <Link >
                <a>
                <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', 
                display:'flex', bgcolor: '#009BE5', mr:5,
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                 onClick={()=>handleSendData()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Create</div>
                </Button>
                </a>
              </Link>

            </Box>
          </Box>
          </Box>
        </Box>
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails handleCloseDetails={handleCloseDetails}
              data={dsDetails} addDatasetcatalog={addDatasetcatalog}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ display:'flex',flexDirection:'row',
            flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>

          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources && dataSources.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset.catalog}
                  dataSources={dataSources}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog}
                  />)}
          </Box>
          
        </Box>
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Topics &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {dataSources && <TopicsCard 
                  openDetails={openDetails}
                  data={dataSources}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset.catalog}
                  dataSources={dataSources}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog}
                  />}
          </Box>

          
        </Box>
      </Box>
                
      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Added Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {searching4.map((data)=><AddedFeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  removeDatasetcatalog={removeDatasetcatalog}
                  addDatasetcatalog={addDatasetcatalog} />)}
          </Box>
        </Box>
      </Box>
    
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
        <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'end', 
              justifyContent:'end',py: 2, px: 13, bgcolor: '#eaeff1'

            }}
            noValidate
            autoComplete="off"
          >
          <Box>
              
                <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                onClick={()=>handleSendData()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Create</div>
                </Button>
                

            </Box>
          </Box>
       <Footer />
    </Box>
  );
}

