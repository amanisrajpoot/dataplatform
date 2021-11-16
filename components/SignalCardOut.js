import React, { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserDataset, updateUserDataset } from "../function/users"
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';

export default function SignalCardOut({token, data, datasetMode, setDatasetMode,
    localTitle, setLocalTitle, localDescription, setLocalDescription, userdatasets, setUserDatasets,
}){

    const router = useRouter();

    async function deteleF(dataF){
        console.log(dataF)
        const data = await deleteUserDataset({token, data:dataF});
        if(data){
            window.open("/dashboard", "_self")
        }
    }

    async function updateF(dataF){
        setUserDatasets({...userdatasets, [dataF.id]:{...dataF, title:localTitle, description:localDescription}})
        console.log(dataF)
        const data = await updateUserDataset({token, data:dataF});
        if(data){
            window.open("/dashboard", "_self")
        }
    }

    useEffect(() => {console.log("DATATATA",data)})
    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',backgroundColor:'#fff',}}>
          <p style={{paddingLeft:36}}>DATASET OVERVIEW</p>
          <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
            justifyContent:'space-around', paddingRight:76 ,paddingLeft: '1.5ch'}}>
              
              
              <div style={{display:'flex', alignItems:'center', 
                  justifyContent:'space-between', width:"25%"}}>
                  
                  {datasetMode === 0? 
                    <p><b>Title:</b> {data.title?data.title:""}<br></br><br></br>
                    <b>Description:</b>{data.description?data.description:""} </p>
                    : datasetMode === 1?
                    <p><TextField value={data.title} size="small" onChange={(e)=>{setLocalTitle(e.target.value)}}
                    label="Title" variant="outlined" /><br></br><br></br>
                    <b></b><TextField value={data.description} size="small" onChange={(e)=>{setLocalDescription(e.target.value)}}
                    label="Outlined" variant="outlined"/></p>
                    : null}


              </div>
              <div style={{display:'flex',width:'25%' }}>
                <p><b>Topics:</b>{data.topic?data.topic.substring(0,40):""} <br></br><br></br>
                    <b>Datasources:</b> {data.catalog?data.catalog.length:"0"}</p>
              </div>
              <div style={{display:'flex',width:'25%' }}>
                <p><b>No. of Rows:</b>{data.row_count?data.row_count:"0"}<br></br><br></br>
                    <b>Data Points:</b> {data.data_points?data.data_points:""}</p>
              </div>

              <div style={{display:"flex",flexDirection:'column',width:'7%'}}>
                  {datasetMode=== 0? <div style={{paddingTop:8, paddingBottom:8, width:64}}>
                      <Button variant="contained" size="small" onClick={() => setDatasetMode(1)}
                      starIcon={<EditOutlinedIcon />}>{"Edit"}</Button>
                  </div>
                : datasetMode=== 1?
                <div style={{paddingTop:8, paddingBottom:8, width:64}}>
                      <Button variant="contained" size="small" onClick={() => {updateF(data)}}
                      starIcon={<EditOutlinedIcon />}>{"Update"}</Button>
                  </div>: null}

                    <div>
                      <Button variant="contained" size="small"  onClick={() => {deteleF(data)}}
                      starIcon={<DeleteIcon />}>Delete</Button>
                    </div>
                   
              </div>
            </div>
            {/* <Divider variant="middle" /> */}
            <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
            justifyContent:'space-around', paddingRight:84 }}>
              
            <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                        paddingBottom: '2vh',width:'100%', alignItems: 'flex-start',
                         minWidth: '100%', paddingLeft: '3.5ch', 
                                            }}>

                <div>
                <p><b>Features:</b>{data.features?data.features.substring(0,100):""}<br></br><br></br>
                    </p>
              </div>
              </div>                                          
                </div>

        </div>
   
    )

}