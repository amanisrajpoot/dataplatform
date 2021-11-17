import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';

export default function DatasetCard(props){
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

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:64, width:"100%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', marginBottom:4,
              textOverflow:'clip',  }}>
      
                    <div style={{fontSize:14, width:"12%", overflow:'hidden'}}>
                      <p style={{textOverflow:'clip', overflow:'hidden',}}><b>{props.data.title?props.data.title: "Sample Dataset"+props.data.ID}</b><br></br>
                            </p>
                    </div>
                    <div style={{fontSize:14, width:"18%", wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
                    <p><b>&nbsp;{props.data.description?props.data.description.substring(0,99): "Dataset Description"}</b><br></br>
                          
                        </p>
                    </div>
                    <div style={{fontSize:14,width:"18%"}}>
                      <p><b>Row Count:&nbsp;{props.data.row_count?props.data.row_count: "123"}</b><br></br>
                      <b>Data Points:&nbsp;{props.data.data_points?props.data.data_points: "567"}</b></p>
                    </div>
                    {/* <div style={{fontSize:14,width:"12%"}}>
                    <p><b>From:&nbsp;{props.data.row_count?props.data.row_count: "1st Oct 2021"}</b><br></br>
                      <b>To:&nbsp;{props.data.data_points?props.data.data_points: "31st Oct 2021"}</b></p>
                    </div>
                    <div style={{fontSize:14,width:"14%"}}>
                      <p><b>&nbsp;{props.data.address?props.data.address: "Features"}</b><br></br>
                      <b>Time Granule:&nbsp;{props.data.data_points?props.data.data_points: "Monthly"}</b></p>
                    </div> */}
                    <div style={{fontSize:14,width:"12%"}}>
                      <p><b>Datasources:&nbsp;{props.data.data_sources?props.data.data_sources: "123"}</b><br></br>
                      <b>Topics:&nbsp;{props.data.topic?props.data.topic.split(",").length: "6"}</b></p>
                    </div>
                    
                    
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
                    <div style={{fontSize:14, cursor:'pointer', width:"3%"}} 
                        onClick={()=>router.push('/dataset/'+props.data.ID)}>
                      <p><SettingsIcon /></p>
                    </div>}
        
          </div>
    )

}