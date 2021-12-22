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
import Button from "@mui/material/Button";

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

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'12px', width:"98%",
               alignItems:'center' ,backgroundColor:'#fff', marginBottom:16, flex:'start', borderRadius:16,
              textOverflow:'clip', font:'roboto',paddingRight:8,paddingLeft:4,
          border:router.pathname.includes("/searchresult")?'1px solid #E2E2EA':'',}}>

              <div style={{flexDirection:'column',display:'flex',justifyContent:'center', maxHeight:'6px', minWidth:'7%',
                  paddingLeft:18, paddingRight:64,}}>

                  <Button sx={{borderRadius:2,minWidth:'48px',maxWidth:'48px',minHeight:'36px',backgroundColor:"#5A00E2", color:"#fff"}}
                          variant="outlined">{parseInt(props.index+1)}</Button>
              </div>

                    <div style={{fontSize:14, minWidth:"47%", overflow:'hidden', display:'flex', flexDirection:'column',flex:'start'}}>
                        <div style={{textOverflow:'clip', overflow:'hidden',paddingBottom:8}}><b>{props.data.title?props.data.title: "FDA Approved Drugs"}</b></div>
                        <div style={{paddingBottom:8}}>{props.data.description?props.data.description.substring(0,40):"FDA has been very responsible in controlling drug flow"}</div>
                        <div style={{fontSize:14,display:'flex', alignItems:'center'}}><div style={{paddingRight:4,paddingBottom:4}}><b>{"Topics:  "}</b></div>
                            {props.data.topic?props.data.topic.split(',').map((topic, index)=>index < 5 && <Button sx={{backgroundColor:"#E4F7FF",
                                    borderRadius:4, border:1, fontSize:10, fontWeight:"bold", mr:1,
                                    color:'#24BBFF'}}
                                    size="small"
                                    onClick={()=>router.push(`/topic/${topic}`)}>{topic}</Button>)
                                : "6"}</div>
                    </div>


                    <div style={{minWidth:'43%', display:'flex', flex:'end',justifyContent:'space-between', }}>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    <div style={{fontSize:14, width:"25%"}}>
                        <div>No. of Features<br></br>
                         </div>
                        <div><b>{props.data.features?props.data.features.split(",").length.toLocaleString(): "0"}</b></div>
                    </div>
                        <Divider orientation="vertical" variant="middle" flexItem/>
                    <div style={{fontSize:14,width:"25%"}}>
                        <div>No. of Rows<br></br>
                        </div>
                        <div><b>{props.data.row_count?props.data.row_count.toLocaleString(): "0"}</b></div>
                    </div>
                        <Divider orientation="vertical" variant="middle" flexItem/>

                    <div style={{display:'flex',fontSize:12, cursor:'pointer',width:"27%",alignItems:'center'}}>
                        <div style={{display:'flex',fontSize:12, cursor:'pointer',width:"100%", justifyContent:'center',
                        maxHeight:36, alignItems:'center'}}>
                            <Button variant="outlined" fontSize="small" sx={{borderRadius:2, color:'#5A00E2', borderColor:'#5A00E2'}}
                            onClick={()=>{
                              // props.handleOpenDetails(props.data)
                                router.push(`/catalog/${props.data.ID}`)
                              mixpanel.track('Catalog Card View Details', {
                                'source': router.pathname,
                                'action': "clicked on view details on catalog card",
                                'catalog': props.data.ID,
                                  'email': props.user.email
                               })
                              }
                            }>
                          <div ><b>{props.geo?"View": "View"}</b></div>
                        </Button>
                            </div>
                    
                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/browsecatalogue')?"":
                            router.pathname.includes('/catalog')?"":
                                router.pathname.includes('/topic')?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 0 ?"":
                    router.pathname.includes('/dataset') && props.datasetMode === 1 ?"":
                    <div style={{fontSize:14, cursor:'pointer', alignItems:'center'}}
                        onClick={()=>handleAdd()}>
                      <p>{searchInArray(props.dataset, props.data.ID)? <DoneIcon />: <AddIcon />}</p>
                    </div>}

                    </div>
                    </div>
        
          </div>
    )

}