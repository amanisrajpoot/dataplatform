import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';

export default function FeatureCard(props){
    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'125px', width:"100%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', marginBottom:16 }}>
                    <div style={{display:'flex', alignItems:'center', fontSize:16,width:"25%"}}>
                      {props.popular==="1"?<StarIcon/>:<StarBorderIcon />}&nbsp;&nbsp;&nbsp;
                      {props.title? props.title:"Actual - Maximum Temperature"}
                    </div>
                    <div style={{fontSize:14, width:"25%"}}>
                      <p><b>{props.description?props.description: "Historic Weather"}</b><br></br>
                            {props.description2?props.description2:"Historic Weather"}</p>
                    </div>
                    <div style={{fontSize:14,}}>
                      <p><b>Tags:</b>&nbsp;{props.geo?"Drugs, Vaccines": "Historic Weather"}<br></br>
                         <b>Data Points:</b>&nbsp;{props.available?props.available:"345"}</p>
                    </div>
                    <div style={{fontSize:14, cursor:'pointer'}}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div>
          </div>
    )

}