import React from 'react';
import Divider from '@mui/material/Divider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function FeatureDetails(props){
    return (
      <div style={{width:"100%",display:"flex", 
          flexDirection:'column',backgroundColor:'#fff',
          marginBottom:16}}>
          <div style={{display:'flex', alignItems:'center', 
            paddingLeft:50, paddingTop:8}}>
              <p><b>Title:</b> Covid Vaccine, Seas Adj Annual Rate</p>
          </div>
      <div style={{display:"flex", flexDirection:'row', maxHeight:'25vh', 
        justifyContent:'space-around', paddingRight:128 }}>
          
          <div style={{display:'flex', alignItems:'center', 
              justifyContent:'space-between', width:"45%"}}>
              
              <p><b>Description:</b> Covid Vaccine Sales, Seas Adj Annual Rate<EditOutlinedIcon sx={{fontSize:18, mx:2}}/><br></br><br></br>
              </p>
          </div>
          <div>
            <p>{props.description}<b>No. of Rows:</b> 12<br></br>
                <b>Columns(Features):</b> 234</p>
          </div>
          <div>
            <p>{props.description}<b>Range:</b> 12<br></br>
                <b>Grains:</b> 234</p>
          </div>
        </div>

        {/* <Divider variant="middle" />

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
        </div> */}
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