import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

export default function FeatureCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDataset(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDataset(props.data);
  }

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh',maxHeight:'125px', width:"100%",
              justifyContent:'space-around', alignItems:'center' ,backgroundColor:'#fff', marginBottom:16 }}>
      
                    <div style={{fontSize:14, maxWidth:"17%"}}>
                      <p><b>{props.data.title?props.data.title: "Historic Weather"}</b><br></br>
                            {props.data.description?props.data.description:"Historic Weather"}</p>
                    </div>
                    <div style={{fontSize:14, width:""}}>
                    <p><b>Features:</b>&nbsp;{props.data.features?props.data.features: "Historic Weather"}<br></br>
                         <b>Ranges:</b>&nbsp;{props.ranges?props.ranges:"345"}</p>
                    </div>
                    <div style={{fontSize:14,}}>
                      <p><b>Rows:</b>&nbsp;{props.data.row_count?props.data.row_count: "Historic Weather"}<br></br>
                         <b>Data Points:</b>&nbsp;{props.data_points?props.data_points:"345"}</p>
                    </div>
                    <div style={{fontSize:14,width:""}}>
                      <p><b>Address:</b>&nbsp;{props.data.address?props.data.address: "Historic Weather"}<br></br>
                         <b>Base Address:</b>&nbsp;{props.base_address?props.base_address:"345"}</p>
                    </div>
                    <div style={{fontSize:14, cursor:'pointer',width:""}} 
                        onClick={()=>props.handleOpenDetails(props.data)}>
                      <p><b>{props.geo?"View Details": "View Details"}</b></p>
                    </div>
                    {router.pathname.includes('/dashboard')?"":
                        router.pathname.includes('/createsignalsecond')?
                        <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleRemove()}>
                          <p><ClearIcon /></p>
                        </div>:
                    <div style={{fontSize:14, cursor:'pointer'}} 
                        onClick={()=>handleAdd()}>
                      <p>{added?<DoneIcon /> :<AddIcon />}</p>
                    </div>}
        
          </div>
    )

}