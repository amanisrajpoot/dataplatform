import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";
import Divider from '@mui/material/Divider';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

function searchInArray(array, search) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].ID === search) {
      return true
    }
  }
  return false;
}

export default function FeatureCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(!searchInArray(props.dataset, props.data.ID)){
          props.addDatasetcatalog(props.data);
          mixpanel.track('Catalog Added to the Dataset', {
            'source': "Create Dataset Page",
            'action': "catalog added",
            'catalog': props.data.ID,
              'email': props.user.email
          })
        } else {
            props.removeDatasetcatalog(props.data);
            mixpanel.track('Catalog Removed from the Dataset', {
              'source': "Create Dataset Page",
              'action': "catalog removed",
              'catalog': props.data.ID,
                'email': props.user.email
            })
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    const [changingIcon, setChangingIcon] = React.useState(<AddIcon />);

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'12px', width:"100%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', marginBottom:16,
              textOverflow:'clip',  }}>
      
                    <div style={{fontSize:14, maxWidth:"19%", overflow:'hidden'}}>
                      <p style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "FDA Approved Drugs"}</b><br></br>
                            {props.data.description?props.data.description.substring(0,40):"FDA has been very responsible in controlling drug flow"}</p>
                    </div>
                    <div style={{fontSize:14, width:"12%"}}>
                    <p><b>No. of Features:</b>&nbsp;{props.data.features?props.data.features.split(",").length: "0"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"14%"}}>
                      <p><b>No. of Rows:</b>&nbsp;{props.data.row_count?props.data.row_count: "0"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14,width:"19%"}}>
                      <p><b>Topic:</b>&nbsp;{props.data.topic?props.data.topic.substring(0,30): "FDA Approved Drugs"}<br></br>
                         </p>
                    </div>
                    <div style={{fontSize:14, cursor:'pointer',width:"9%"}} 
                        onClick={()=>{
                          props.handleOpenDetails(props.data)
                          mixpanel.track('Catalog Card View Details', {
                            'source': router.pathname,
                            'action': "clicked on view details on catalog card",
                            'catalog': props.data.ID,
                              'email': props.user.email
                           }) 
                          }
                        }>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div>
                    
                    {router.pathname.includes('/dashboard')?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 0 ?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 1 ?"":
                    <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleAdd()}>
                      <p>{searchInArray(props.dataset, props.data.ID)? <DoneIcon />: <AddIcon />}</p>
                    </div>}
        
          </div>
    )

}