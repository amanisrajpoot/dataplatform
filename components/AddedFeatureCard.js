import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import mixpanel from "mixpanel-browser";

export default function AddedFeatureCard(props){
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

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'12px', minWidth:"100%", maxWidth:'100%',
              alignItems:'center' ,backgroundColor:'#fff', marginBottom:16, flex:'start', borderRadius:16,
              textOverflow:'clip',
              border:router.pathname.includes("/searchresult")?'1px solid #E2E2EA':'',}}>

              <div style={{flexDirection:'column',display:'flex',justifyContent:'center', maxHeight:'6px', minWidth:'5%',
                  paddingLeft:8, paddingRight:8}}>

                  <Button sx={{borderRadius:2,minWidth:'48px',maxWidth:'48px',minHeight:'36px',backgroundColor:"#5A00E2", color:"#fff"}}
                          variant="outlined">{parseInt(props.index+1)}</Button>
              </div>

              <div style={{fontSize:14, minWidth:"47%", overflow:'hidden', display:'flex', flexDirection:'column',flex:'start'}}>
                  <div style={{textOverflow:'clip', overflow:'hidden',paddingBottom:8}}><b>{props.data.title?props.data.title: "FDA Approved Drugs"}</b></div>
                  <div style={{paddingBottom:8, color:'#939EAA'}}>{props.data.description?props.data.description.substring(0,40):"FDA has been very responsible in controlling drug flow"}</div>
                  <div style={{fontSize:14,display:'flex', alignItems:'center'}}><div style={{paddingRight:4,}}><b>{"Topics:  "}</b></div>
                      {props.data.topic?props.data.topic.split(',').map((topic, index)=>index < 5 && <Button sx={{backgroundColor:"#E4F7FF",
                              borderRadius:4, border:1, fontSize:10, fontWeight:"bold", mr:1,
                              color:'#24BBFF'}} size="small"
                              onClick={()=>router.push(`/topic/${topic}`)}>{topic}</Button>)
                          : "6"}</div>
              </div>


              <div style={{minWidth:'43%', display:'flex', flex:'end',justifyContent:'space-between', }}>
                  <Divider orientation="vertical" variant="middle" flexItem/>
                  <div style={{fontSize:14, width:"25%"}}>
                      <div>No. of Features<br></br>
                      </div>
                      <div><b>{props.data.features?props.data.features.split(",").length: "0"}</b></div>
                  </div>
                  <Divider orientation="vertical" variant="middle" flexItem/>
                  <div style={{fontSize:14,width:"25%"}}>
                      <div>No. of Rows<br></br>
                      </div>
                      <div><b>{props.data.row_count?props.data.row_count: "0"}</b></div>
                  </div>
                  <Divider orientation="vertical" variant="middle" flexItem/>

                  <div style={{display:'flex',fontSize:12, cursor:'pointer',width:"25%", justifyContent:'center',
                  maxHeight:36}}>
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
                          <div style={{textTransform:'capitalize'}}>View</div>
                      </Button>
                  </div>

                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                      <p>{added?<DoneIcon /> :<ClearIcon />}</p>
                    </div>}
                </div>
          </div>
    )

}