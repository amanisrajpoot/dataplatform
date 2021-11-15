import React, { useEffect } from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteUserDataset } from "../function/users"
import { useRouter } from 'next/router';

export default function SignalCardOut({token, data}){

    const router = useRouter();

    async function deteleF(dataF){
        console.log(dataF)
        const data = await deleteUserDataset({token, data:dataF});
        if(data){
            window.open("/dashboard", "_self")
        }
    }

    useEffect(() => {console.log("DATATATA",data)})
    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',backgroundColor:'#fff',}}>
          <p style={{paddingLeft:54}}>DATASET OVERVIEW</p>
          <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', 
            justifyContent:'space-around', paddingRight:84 }}>
              
              
              <div style={{display:'flex', alignItems:'center', 
                  justifyContent:'space-between', width:"25%"}}>
                  
                  <p><b>Title:</b> {data.title?data.title:""}<br></br><br></br>
                  <b>Description:</b>{data.description?data.description:""} </p>
              </div>
              <div style={{display:'flex', }}>
                <p><b>Topics:</b>{data.topic?data.topic:""} <br></br><br></br>
                    <b>Datasources:</b> {data.catalog?data.catalog.length:"0"}</p>
              </div>
              <div>
                <p><b>No. of Rows:</b>{data.row_count?data.row_count:"0"}<br></br><br></br>
                    <b>Data Points:</b> {data.data_points?data.data_points:""}</p>
              </div>

              
              <div style={{display:"flex",flexDirection:'column',}}>
                  <div style={{paddingTop:8, paddingBottom:8, width:64}}>
                      <Button variant="contained" size="small" 
                      starIcon={<EditOutlinedIcon />}>Edit</Button>
                  </div>
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
                <p><b>Features:</b>{data.features?data.features:""}<br></br><br></br>
                    </p>
              </div>
              </div>
                                    {/* <table style={{width:'96%',paddingLeft:42}}>
                                        <tbody style={{width:'100%',}}>
                                            <tr style={{width:'100%',}}>
                                                <td style={{width:'20%', border:'1px solid',borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Title </b>{props.data.datasourcetype}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Granularity </b>{props.data.datasourceformat}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Range </b>{props.data.datasourceformat}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Range </b>{props.data.datasourceformat}</p>
                                                </td>
                                            </tr>
                                            <tr style={{width:'100%',}}>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Geography </b>{props.data.datasourcetype}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>Country </b>{props.data.datasourceformat}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>USA </b>{props.data.datasourceformat}</p>
                                                </td>
                                                <td style={{width:'20%', border:'1px solid', borderColor:'#3f4544', textAlign:'center'}}>
                                                    <p><b>USA </b>{props.data.datasourceformat}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table> */}
                                                              
                                </div>

        </div>
   
    )

}