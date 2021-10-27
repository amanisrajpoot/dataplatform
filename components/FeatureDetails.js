import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import { Button } from 'react-bootstrap';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function FeatureDetails(props){
    return (
      <div style={{width:"100%",display:"flex", 
          flexDirection:'column',backgroundColor:'#fff',
          marginBottom:16}}>
          <div style={{display:'flex', alignItems:'center', 
            paddingLeft:56, paddingTop:8}}>
              <p><b>Feature:</b> Covid Vaccine, Seas Adj Annual Rate</p>
          </div>
      <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
        justifyContent:'space-around', paddingRight:128 }}>
          
          <div style={{display:'flex', alignItems:'center', 
              justifyContent:'space-between', width:"45%"}}>
              
              <p><b>Export Name:</b> Covid Vaccine Sales, Seas Adj Annual Rate<EditOutlinedIcon sx={{fontSize:18, mx:2}}/><br></br><br></br>
              <b>Available Through:</b> 08/31/2021</p>
          </div>
          <div>
            <p>{props.description}<b>Publisher:</b> FRED<br></br>
                <b>Product:</b> Retail Sales</p>
          </div>
          <div style={{display:"flex",flexDirection:'column',paddingBottom:4}}>
              <div style={{dispplay:'flex', alignItems:'center'}}><EditOutlinedIcon />&nbsp;Edit</div>
              <div style={{dispplay:'flex', alignItems:'center', paddingTop:8}}><DeleteIcon />&nbsp;Delete</div><br></br>
              <div style={{dispplay:'flex', alignItems:'center', paddingTop:8}}><ContentCopyIcon />&nbsp;Duplicate</div><br></br>
               
          </div>
        </div>

        <Divider variant="middle" />

        <div style={{display:"flex", flexDirection:'row', maxHeight:'125px', fontSize:14,
        justifyContent:'space-around',backgroundColor:'#fff', marginBottom:16, marginLeft:25 }}>
          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Lead/Lag</b><br></br><br></br>
            None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Decay</b><br></br><br></br>
                None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Difference</b><br></br><br></br>
                None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>SSNL Diff</b><br></br><br></br>
                None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Ladder</b><br></br><br></br>
                None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Indexing</b><br></br><br></br>
                None</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Geo Grain</b><br></br><br></br>
                Data Source</p>
          </div>

          <div style={{display:'flex', alignItems:'center',justifyContent:'center'}}>
          
            <p>{props.description}<b>Time Grain</b><br></br><br></br>
                Data Source</p>
          </div>
        </div>
    </div>
      
    //   <Box sx={{width: '100%',  bgcolor:"#ffffff",}}>
    //       <Box sx={{width: '100%', py:2, px:4,}}>
           
    //         <Box sx={{ width: '100%', 
    //                 minheight:275, my:1, bgcolor: '#ffffff', display:'flex', flexDirection:'row',
    //                 alignItems:'center', justifyContent:'space-between', alignItems:'center', }}>
                
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"35%"}}>            
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Feature: Vehicle Sales, Seas Adj Annual Rate
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Export Name: vehicle-sales-seas-adj-annual-rate-diff                            
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Available Through: 09/30/2021
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', flexDirection:'column',
    //                         justifyContent:'start',
    //                         alignItems:'start', maxWidth:"10%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                           <EditOutlinedIcon />
    //                         </Typography>
                            
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"30%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} color="text.secondary" gutterBottom>
    //                         Publisher: FRED
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //                         Product: Retail Sales
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', maxWidth:"20%"}}> 
    //                     <Box>
    //                       <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} 
    //                           gutterBottom>
    //                           <EditOutlinedIcon />&nbsp;
    //                           Edit 
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} 
    //                           gutterBottom>
    //                           <EditOutlinedIcon />&nbsp;
    //                           Edit 
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 14 , fontWeight:'bold'}} 
    //                           gutterBottom>
    //                         <DeleteIcon />&nbsp;
    //                           Delete
    //                         </Typography>
    //                     </Box> 

    //                 </Box>
                    
                    
    //              </Box>
    //           </Box>
        
    //       <Box sx={{ width: '100%', my:1, px:4,  bgColor:"#fff",display:'flex', flexDirection:'row', 
    //                  alignItems:'center', justifyContent:'space-between', alignItems:'center', }}>    
    //           <Divider variant="middle" />
    //       </Box>
    //         <Box >
    //           <h3 style={{paddingLeft:32}}>{"Transforms & Treatments"}</h3>              
    //           <Box sx={{ minWidth: '100%', 
    //                  my:1, px:4, pb:2,bgcolor: '#ffffff', display:'flex', flexDirection:'row',
    //                 alignItems:'center',  }}>
                    
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>
                    
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>

    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>
                    
    //                 <Box
    //                     sx={{ display: 'inline-block',display:'flex', 
    //                     flexDirection:'column', width:"17%"}}> 
      
    //                     <Box>
    //                       <Typography sx={{ fontSize: 4 , fontWeight:'bold'}} 
    //                           variant="body1" color="text.secondary" gutterBottom>
    //                         Lead/Lag
    //                         </Typography>
    //                         <Typography sx={{ fontSize: 4 }} 
    //                           variant="body2" color="text.secondary" gutterBottom>
    //                         None
    //                         </Typography>
    //                     </Box>  

    //                 </Box>


    //              </Box>
    //         </Box>
    //   </Box>


     )

}