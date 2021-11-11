import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';

export default function DataSourcesDetails(props){
    const router = useRouter();

    return (
                        <div style={{flex: 1, height: '70%', margin: '1rem', maxWidth: '100%',
                        backgroundColor:'white', }}>
                            <div onClick={()=>props.handleCloseDetails()}>
                              <p>X</p>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                                            justifyContent: 'space-between', margin: '1rem 0'}}>
                              <div style={{fontFamily: 'Plus Jakarta Sans',fontStyle: 'normal', fontWeight: 'bold',
                                                fontSize: '1.5rem', color: '#3f4544',display: 'flex', flexDirection: 'column'}}>
                                <span>Data Source Details</span>
                              </div>
                              {/* {role === 'Doctor' && (
                                <div
                                  onClick={editDetails}
                    
                                >
                                  Edit details
                                </div>
                              )} */}
                            </div>
                            <div style={{display:'flex', maxWidth:'80%', maxHeight:'80%', flexDirection:'column', 
                                    justifyContent:'space-around'}}>
                              <div >
                                {/* <p>{props.data.title}</p> */}
                              </div>
                              <div style={{display: 'flex', flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                flexWrap: 'wrap',alignItems: 'center',
                                                    margin: "1rem 0",}}>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Provider</b></label>
                                  {props.data.title}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Description</b></label>
                                  {props.data.description}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Topics</b></label>
                                  {props.data.topics}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Tags</b></label>
                                  {props.data.tags}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Geographic Granule</b></label>
                                  {props.data.geo}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Time Granule</b></label>
                                  {props.data.time}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Data Points</b></label>
                                  {props.data.datapoints}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>Start Date</b></label>
                                  {props.data.startdate}
                                </div>
                                <div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                                            alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
                                  <label><b>End Date</b></label>
                                  {props.data.enddate}
                                </div>
                                
                              </div>
                            </div>
                            <div style={{ flexDirection: 'column' }}>
                              
                              <div
                                style={{
                                  display: 'flex',
                                  justifyContent: 'end',
                                  columnGap: '1em',
                                }}
                              >
                                {router.pathname.includes('/dashboard')?<button
                                  // onClick={disposeFunc}
                                  style={{  width: '30%', height: '2.5rem', 
                                  backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', 
                                  color: 'white',}}
                                  href="/createsignalfirst"
                                >
                                  Create Dataset to Explore More
                                </button>:router.pathname.includes('/createsignalsecond')?"":
                                <button
                                  // onClick={disposeFunc}
                                  style={{ width: '30%', height: '2.5rem', 
                                  backgroundImage: 'linear-gradient(to right,#094a98, #4e0c98)', 
                                  color: 'white',  }}
                                >
                                  Add to Dataset
                                </button>}

                              </div>
                            </div>
                          </div>

    );
}
