import React, {useEffect, useState} from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import mixpanel from 'mixpanel-browser';
import {getUser} from "../function/users";
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

mixpanel.init('d4ba2a4d19d51d9d4f19903db6a1a396', {debug: true,ignore_dnt: true}); 

export default function DatasetDraftCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDatasetcatalog(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDatasetcatalog(props.data);
  }

    console.log("fetched dataset",props.data);
    return (
        <div style={{display:"flex", flexDirection:'column', minWidth:"38ch", paddingBottom:12,paddingRight:6,marginLeft:6,
              border:"1px solid black", borderRadius:8}}>
          <div style={{display:"flex", flexDirection:'column', minHeight:'28vh',maxHeight:'36vh', borderRadius:9,
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', paddingLeft:12,
              textOverflow:'clip',  }}>

                    <div style={{fontSize:15, width:"100%", overflow:'hidden',
                        flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "Sample Dataset"+props.data.ID}</b><br></br>
                            </div>
                        <div>{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</div>

                    </div>
                    {/*<div style={{fontSize:14, width:"18%", wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word",*/}
                    {/*    flexDirection:'column',display:'flex',justifyContent:'center', }}>*/}
                    {/*<p><b>&nbsp;{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</b><br></br>*/}
                    {/*      */}
                    {/*    </p>*/}
                    {/*</div>*/}

                     <Divider  flexItem variant="middle"/>

              <div style={{display:'flex', flexDirection:"row", width:'100%'}}>
                    <div style={{fontSize:12,width:"26%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                      <div >Row Count</div>
                        <div style={{fontWeight:'bold', fontSize:15}}>{props.data.row_count?props.data.row_count: "123"}</div>
                    </div>

                      <div style={{fontSize:12,width:"36%",flexDirection:'column',display:'flex',justifyContent:'center',}}>
                          <div >Data Points</div>
                          <div style={{fontWeight:'bold', fontSize:15}}>{props.data.data_points?props.data.data_points: "567"}</div>
                      </div>

                      <div style={{fontSize:12,width:"28%",flexDirection:'column',display:'flex',justifyContent:'center',}}>
                          <div >Data Source</div>
                          <div style={{fontWeight:'bold', fontSize:15}}>{props.data.data_sources?props.data.data_sources: "123"}</div>
                      </div>

                      <div style={{fontSize:12,width:"20%",flexDirection:'column',display:'flex',justifyContent:'center', }}>
                          <div >Topics</div>
                          <div style={{fontWeight:'bold', fontSize:15}}>{props.data.topic?props.data.topic.split(",").length: "6"}</div>
                      </div>
              </div>

              <Divider flexItem variant="middle"/>
                    {/* <div style={{fontSize:14, cursor:'pointer',width:"12%"}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div> */}
                    {router.pathname.includes('/searchresult')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{display:'flex',alignItems:'space-between', justifyContent:'space-between',
                        fontSize:14, cursor:'pointer', width:'96%', paddingRight:9 }}
                        onClick={()=>{
                          router.push('/dataset/'+props.data.ID)
                          mixpanel.track('Dataset Card Operations', {
                            'source': "Data Platform Dashboard",
                            'action': "clicked on operations icon",
                            'dataset': props.data.ID,
                              'email': props.user.email
                          });
                          }
                        }>
                        <div><Button sx={{borderRadius:2,paddingRight:1, paddingTop:1,}} variant="outlined" startIcon={<DeleteIcon />}></Button></div>
                        <div><Button sx={{borderRadius:2}} variant="outlined">Edit Details</Button></div>
                    </div>}
              </div>
          </div>
    )

}