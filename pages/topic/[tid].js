import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TextField from '@mui/material/TextField';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FeatureCard from '../../components/FeatureCard';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../../components/datasourcedetails';
import { getPublicDatasetsTopics} from '../../function/users';
import TopicsCard from '../../components/TopicsCard';
import { useRouter } from 'next/router'
import AddedFeatureCard from '../../components/AddedFeatureCard';
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

export default function Topic({token, 
  setToken,
  dataset,
  setDataset,
  dataSources,
  removeDatasetcatalog,
  addDatasetcatalog}) {
  const [search, setSearch] = useState(false);
  const [localDataset, setLocalDataset] = useState([]);
  const [searching4, setSearching4] = useState(false);
  const [topicDatasources, setTopicDatasources] = useState([]);
  const router = useRouter()
  const topic_id = router.query.tid;
  
  useEffect(() => {
    setSearching4(dataset.catalog);
    console.log("fetched dataset",searching4);
  }, [dataset]);

  useEffect(async()=>{
    const datasources = await getPublicDatasetsTopics(token, topic_id);
    setTopicDatasources(datasources);
  }, [token, topic_id]);

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

  const [keyword, setKeyword] = useState('FDA');
  const [keywordSearch, setKeywordSearch] = useState(false);
  const handleKeywordSearch = (event) => {
    setKeywordSearch(!keywordSearch);
  };

  // useEffect(async () => {
	// 	if(token!==null){
  //     const data = await getPublicDatasetsTopics(
	// 		token, keyword,
	// 	);
	// 		setDataSources(data);
  //     console.log("fetched data",data);
  //     }
  // }, [token]);

  return (
    <Box>
      <Navbar token={token} setToken={setToken}/>
        
      <Box sx={{ display: 'flex' }}>        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ display:'flex',flexDirection:"row",
          justifyContent: 'space-between',px: 4, py:2,bgcolor: '#eaeff1' }}>
            
            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Browse By Topic: {topic_id}&nbsp;</div>
                      {/* <div><HelpOutlineIcon /></div> */}
                  </Box>
              </Typography>

              <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
                mr:10}}
                onClick={() => router.back()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Back</div>
                </Button>
              
          </Box>
        </Box>
      </Box>

      <Modal open={openDetails} onClose={handleCloseDetails}>
          <Box sx={style2}>            
              <DataSourcesDetails handleCloseDetails={handleCloseDetails}
              data={dsDetails}/>
          </Box>                  
       </Modal>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Matching Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {topicDatasources !==null && topicDatasources !== undefined && topicDatasources.length > 0 &&
                topicDatasources.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset.catalog}
                  dataSources={topicDatasources}
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
                      <div>Added Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {searching4 !== null && searching4 !== undefined && searching4.length > 0 &&
                searching4.map((data)=><AddedFeatureCard 
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
              <Link>
                <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                onClick={() => router.back()}>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Back</div>
                </Button>
              </Link>

            </Box>
          </Box>
       <Footer />
    </Box>
  );
}

