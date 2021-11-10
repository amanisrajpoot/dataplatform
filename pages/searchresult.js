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

export default function searchresult() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searching, setSearching] = useState('');
  const [search, setSearch] = useState(false);
  const [searching2, setSearching2] = useState([]);
  const [searching3, setSearching3] = useState([]);

  const [dataSources, setDataSources] = React.useState([
    { popular:"1",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    description2:"Information to the health care industry, patients and the public regarding individuals and entities",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"1",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    description2:"Applied Research Network conducts high-priority, multi-institutional research on the prevention & management of acute illnesses.",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"1",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    description2:"Information about FDA-approved human drugs and biological therapeutic products.",
    geo:"Country - Mexico",
    date:"",
    available:"", },
    { popular:"0",
    title:"Insurance Companies LEIE    ",
    description:"List of Excluded Individuals/Entities (LEIE)",
    description2:"Information to the health care industry, patients and the public regarding individuals and entities",
    geo:"Country - USA",
    date:"",
    available:"" },
    { popular:"0",
    title:"PECARN ",
    description:"PECARN, the Pediatric Emergency Care",
    description2:"Applied Research Network conducts high-priority, multi-institutional research on the prevention & management of acute illnesses.",
    geo:"Country - USA",
    date:"",
    available:"", },
    { popular:"0",
    title:"Drugs at FDA",
    description:"Information about FDA-approved ",
    description2:"Information about FDA-approved human drugs and biological therapeutic products.",
    geo:"Country - Mexico",
    date:"",
    available:"", }
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

  React.useEffect(() => {
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
      if(search.description2.toLowerCase().includes(searching.toLowerCase()) !== -1){
       return search.description2.toLowerCase().includes(searching.toLowerCase());
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
  }, [searching,search]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      console.log('do validate')
      setSearch(!search)}
    }

  return (
    <Box>
      <Navbar />
        
      <Box sx={{ display: 'flex' }}>        
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box component="main" sx={{ flex: 1, pt:4, px: 4, bgcolor: '#eaeff1' }}>
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
            <Box component="main" sx={{  minWidth: '50vw', px:1}}>
                <TextField fullWidth id="outlined-basic" variant="outlined" 
                value={searching} onChange={(e) => setSearching(e.target.value)}
                label="Keyword" sx={{ bgcolor: '#ffffff'}}
                onKeyDown={handleKeyDown}/>
            </Box>
            
            <Box>
                <Button sx={{minWidth:'75px', height:'55px', bgcolor:'#fff', display:'flex', bgcolor: '#009BE5',
                alignItems:'center', justifyContent:'center', borderRadius:1, border:0.5, borderColor:'gray',
                backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)'}}
                  onClick={()=>setSearch(!search)}>
                    <SearchIcon sx={{ fontSize: 25, color:'white' }}/>
                </Button>

            </Box>
          </Box>
          </Box>
        </Box>
      </Box>

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
                  popular={data.popular}
                  title={data.title}
                  key={data.title}
                  description={data.description}
                  description2={data.description2}
                  geo={data.geo}
                  date={data.date}
                  available={data.available} />)}
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
                {searching3.map((data)=><FeatureCard 
                  popular={data.popular}
                  title={data.title}
                  key={data.title}
                  description={data.description}
                  description2={data.description2}
                  geo={data.geo}
                  date={data.date}
                  available={data.available} />)}
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

