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
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import DataSourcesDetails from '../components/datasourcedetails';



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

export default function Searchresult({token, setToken,dataset,addDataset,removeDataset,addDatasetcatalog}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searching, setSearching] = useState('');
  const [search, setSearch] = useState(false);
  const [searching2, setSearching2] = useState([]);
  const [searching3, setSearching3] = useState([]);
  const [searching4, setSearching4] = useState([dataset.catalog]);


  const [dataSources, setDataSources] = React.useState([
    {   
        dataset_id:"24",
        user_email:'',
        title:"Insurance Companies LEIE ",
        description:"List of Excluded Individuals/Entities (LEIE)",
        features:"",
        row_count:'68',
        data_points:'369',
        address:'',
        base_adress:'',
        ranges: '',
        data_sources:'',  
        template_id:'',
        refreshed_at:'6 Oct',
   },
    { dataset_id:"25",
    user_email:'',
    title:"Insurance Companies LEIE ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'6 Oct',
   },
    { dataset_id:"29",
    user_email:'',
    title:"Insurance Companies LEIE ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'6 Oct',
   },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct',
    },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct', },
    { dataset_id:"29",
    user_email:'',
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    features:"",
    row_count:'68',
    data_points:'369',
    address:'',
    base_adress:'',
    ranges: '',
    data_sources:'',  
    template_id:'',
    refreshed_at:'9 Oct', }
  ]);
  
  const [predefinedModels, setPredefinedModels] = React.useState([
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
    { title:"From Predefined Models",
      body:"Create a new Dateset based on predefined domain models.",
      icon:"ContentCopyOutlinedIcon",
    },
  ]);

  React.useEffect(async () => {
    let searchresults = [];
    searchresults = dataSources.filter(search=>{
        if(search.title.toLowerCase().includes(searching.toLowerCase())){
          return search.title.toLowerCase().includes(searching.toLowerCase());
        }
        else return search.description.toLowerCase().includes(searching.toLowerCase());     
      } 
    );
    setSearching2(searchresults);
  
    let matchingresults = [];
    matchingresults = dataSources.filter(search=>{
      if(search.topic.toLowerCase().includes(searching.toLowerCase()) !== -1){
       return search.topics.toLowerCase().includes(searching.toLowerCase());
      }
      else if(search.geo.toLowerCase().includes(searching.toLowerCase())){
       return search.geo.toLowerCase().includes(searching.toLowerCase())
      } else if(search.date.toLowerCase().includes(searching.toLowerCase())){
        return search.date.toLowerCase().includes(searching.toLowerCase()) 
       } else return search.available.toLowerCase().includes(searching.toLowerCase());      
    } 
  );
  setSearching3(matchingresults);
  console.log("searching")
  }, [,searching,search]);

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

  return (
    <Box>
      <Navbar token={token} setToken={setToken}/>
        
      <Box sx={{ display: 'flex' }}>        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          <Box component="main" sx={{ flex: 1, px: 4, bgcolor: '#eaeff1' }}>
            <Box sx={{ width: '100%', px:10,py:2,pb:4}}>
              <p>Step 2 of 3</p>
              <LinearProgress variant="determinate" value={66} sx={{height:'2vh', 
              backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)',
              color:'linear-gradient(to right,#094a98, #4e0c98)'}} />
            </Box>

            <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Explore Healthcare Data Platform &nbsp;</div>
                      <div><HelpOutlineIcon /></div>
                  </Box>
              </Typography>
              
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1}, 
              display: 'flex', flexDirection: 'row', flex:'1', py: 2, px: 8, bgcolor: '#eaeff1'

            }}
            noValidate
            autoComplete="off"
          >
            
            <Box component="main" sx={{  minWidth: '68vw', px:1}}>
                <TextField fullWidth id="outlined-basic" variant="outlined" 
                value={searching} onChange={(e) => setSearching(e.target.value)}
                label="Keyword" sx={{ bgcolor: '#ffffff'}}
                onKeyDown={handleKeyDown}/>
            </Box>
            
            <Box>
              <Link href="/createsignalsecond">
                <Button sx={{minWidth:'225px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                href='/createsignalsecond'>
                  {/*onClick={()=>setSearch(!search)}*/}
                    {/* <SearchIcon sx={{ fontSize: 25, color:'white' }}/> */}
                    <div style={{color:'#fff',fontSize:18}}>Continue</div>
                </Button>
              </Link>

            </Box>
          </Box>
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
                {searching2.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  addDataset={addDataset}
                  removeDataset={removeDataset}
                  addDatasetcatalog={addDatasetcatalog}
                  />)}
          </Box>
          
        </Box>
      </Box>

      <Box sx={{ display: 'flex', minHeight: '23vh', bgcolor:'#eaeff1',}}>
        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '12vh',mb:4}}>
          
          <Box component="main" sx={{ flex: 1, py: 2, px: 4, bgcolor: '#eaeff1' }}>
             <Typography color="inherit" variant="h5" component="h1">
                  <Box sx={{ display: 'flex', flex:'1',flexDirection:'row', font:'roboto',px:10}}>
                      <div>Related Data Sources &nbsp;</div>
                 
                  </Box>
              </Typography>
          </Box>

          <Box sx={{ width:"100%", bgcolor: '#eaeff1', display:'flex', flexDirection:'column', 
              justifyContent:"center",alignItems:'center', px:14 }}>
                {searching4.map((data)=><FeatureCard 
                  openDetails={openDetails}
                  data={data}
                  handleOpenDetails={handleOpenDetails}
                  handleCloseDetails={handleCloseDetails} 
                  dataset={dataset}
                  addDataset={addDataset}
                  removeDataset={removeDataset}
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
       <Footer />
    </Box>
  );
}

