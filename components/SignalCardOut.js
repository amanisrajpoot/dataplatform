import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserDataset, updateUserDataset } from "../function/users"
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


export default function SignalCardOut({token, data, datasetMode, setDatasetMode,localTitle,setLocalTitle,localDescription,
    setLocalDescription, localTopic, setLocalTopic, localDataset, setLocalDataset, userdatasets, setUserDatasets,
    deleteF, updateF
}){

    useEffect(() => {
        setLocalTitle(data.title);
        setLocalDescription(data.description);
        setLocalTopic(data.topic);
        setLocalDataset(userdatasets)
    }, [userdatasets])

    const router = useRouter();

    useEffect(() => {
        setLocalDataset({...userdatasets, title:localTitle, description:localDescription,topic:localTopic});
    }, [localTitle, localDescription, localTopic]);

    useEffect(() => {console.log("DATATATA",data)})
    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',backgroundColor:'#fff',borderRadius:16,minHeight:'32vh'}}>
          <div style={{display:"flex", flexDirection:'row', height:'100%', maxHeight:'100%',
            justifyContent:'space-between', paddingRight:76 ,paddingLeft: '1.5ch'}}>
              
              {datasetMode === 0? <div style={{display:'flex', flexDirection:'column', width:"100%", paddingTop:16,minHeight:'32vh',
                  wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word", justifyContent:'space-around',
                  alignItems:'space-around'}}>
   
                    <div><b>{data.title?data.title:""}</b></div>
                    <div>{data.description?data.description:""} </div>
                      <div style={{fontSize:14,display:'flex', alignItems:'center'}}><b>{"Topics:  "}</b>
                          {data.topic?data.topic.split(',').map((topic, index)=>index < 5 && <Button sx={{backgroundColor:"#E4F7FF",
                                  borderRadius:4, border:1, fontSize:10, fontWeight:"bold", mr:1,
                                  color:'#24BBFF'}} size="small">{topic}</Button>)
                              : "6"}</div>
                      <div style={{display:'flex',width:'100%', }}>
                          <div style={{display:'flex',wordWrap: "break-word",
                              whiteSpace: "pre-wrap", wordBreak: "break-word", paddingRight:128 }}>
                              <b>Datasources:</b> {data.catalog?data.catalog.length:"0"}
                          </div>
                          <div style={{display:'flex' }}>
                              <b>No. of Rows:</b>{data.row_count?data.row_count:"0"}
                          </div>
                      </div>

                      <div style={{display:'flex',width:'100%',  }}>
                          <div style={{display:'flex',wordWrap: "break-word",
                              whiteSpace: "pre-wrap", wordBreak: "break-word",paddingRight:64 }}>
                              <b>Data Points:</b> {data.data_points?data.data_points:""}
                          </div>
                          <div style={{display:'flex', alignItems:'center', }}><b>Features:</b>
                              {data.features?data.features.split(',').map((feature, index)=>index < 5 && <Button sx={{backgroundColor:"#E4F7FF",
                                      borderRadius:4, border:1, fontSize:10, fontWeight:"bold",mr:1,
                                      color:'#24BBFF'}} size="small">{feature}</Button>)
                                  : "6"}</div>
                      </div>

              </div>
              : null}

              {datasetMode === 1? <div style={{display:'flex', alignItems:'center', 
                  justifyContent:'space-between', width:"50%",
                  wordWrap: "break-word", whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
   
                  <FormControl fullWidth sx={{ }}>
                    <p><TextField value={localTitle} size="small" onChange={(e)=>{setLocalTitle(e.target.value)}}
                    label="Title" variant="outlined" sx={{minWidth:"100%"}}/><br></br><br></br>
                    <b></b><TextField value={localDescription} size="small" multiline maxRows={5}
                    onChange={(e)=>{setLocalDescription(e.target.value)}}
                    label="Description" variant="outlined"sx={{minWidth:"100%"}}/></p>
                    <TextField value={localTopic} size="small" multiline maxRows={4}
                onChange={(e)=>{setLocalTopic(e.target.value)}}
                label="Topic" variant="outlined" />
                    </FormControl>

              </div>
              : null}

                {datasetMode === 1?
                <>
                <div style={{display:'flex',width:'25%',wordWrap: "break-word", 
                    whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <p><b>Datasources:</b> {data.catalog?data.catalog.length:"0"}<br></br><br></br><br></br>
                    <b>No. of Rows:</b>{data.row_count?data.row_count:"0"}<br></br><br></br><br></br>
                        <b>Data Points:</b> {data.data_points?data.data_points:""}</p>
                
                </div>
                </>
                : null} 

            </div>

        </div>
   
    )

}