import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DateRangeIcon from '@mui/icons-material/DateRange';
import TimerIcon from '@mui/icons-material/Timer';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowRightAltSharpIcon from '@mui/icons-material/ArrowRightAltSharp';
import AddIcon from '@mui/icons-material/Add';

export default function FeatureCard(props){
    return (
          // <Box sx={{ width: '100%', 
          //       minheight:275, py:2, my:1, px:4, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
          //       alignItems:'center', justifyContent:'space-between',  }}>
                
          //           <Box
          //               component="span"
          //               sx={{ display: 'inline-block', pl:4,pr:12,display:'flex', flexDirection:'row'}}> 
      
          //               <Typography sx={{ fontSize: 28 , paddingTop:1}} color="text.secondary" gutterBottom>
          //               {1===1?<StarIcon/>:<StarBorderIcon />}&nbsp;&nbsp;
          //               </Typography>
          //               <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          //               Actual - Maximum Temperature
          //               </Typography>
          //           </Box>
                    
                     
                   
          //           <Box
          //               component="span"
          //               sx={{ display: 'inline-block', px:12, justifyContent:'space-around'}}
          //             >
          //               <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
          //               NOAA
          //               </Typography>
          //               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          //               Historic Weather
          //               </Typography>
          //             </Box>

          //             <Box
          //               component="span"
          //               sx={{ display: 'inline-block', px:12, justifyContent:'space-around'}}
          //             >
          //               <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
          //               Geo:Weather Station - USA
          //               </Typography>
          //               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          //               Date:Day
          //               </Typography>
          //               <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          //               Available Through: 10/05/2021
          //               </Typography>
          //             </Box>

          //             <Typography variant="h5" component="div" sx={{pr:4}}>
          //             ＋
          //             </Typography>
                      
          // </Box>

          <div style={{display:"flex", flexDirection:'row', maxHeight:'125px', width:"100%",
              justifyContent:'space-around',backgroundColor:'#fff', marginBottom:16 }}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      {1===1?<StarIcon/>:<StarBorderIcon />}&nbsp;&nbsp;
                      Actual - Maximum Temperature
                    </div>
                    <div>
                      <p>{props.description}Historic Weather<br></br>
                          Historic Weather</p>
                    </div>
                    <div>
                      <p>{props.description}Historic Weather<br></br>
                          Historic Weather<br></br>
                          Historic Weather</p>
                    </div>
                    <div style={{display:"flex",flexDirection:'row', alignItems: 'center',}}>
                        <AddIcon />
                    </div>
          </div>
    )

}