import Box from '@material-ui/core/Box';
import React from 'react';
import Divider from '@mui/material/Divider';
import { Button } from 'react-bootstrap';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { TextField } from '@mui/material';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function SelectFeatures(props){
  const [checked, setChecked] = React.useState([true, false]);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');


  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <div style={{width:"100%",display:"flex", flexDirection:'column',color:'#fff'}}>
          <div style={{display:"flex", }}>
            <div style={{width:"25%"}}>
              <p style={{paddingLeft:54, }}>SIGNAL OVERVIEW</p>
            </div>
          
            <div style={{display:"flex", flexDirection:'column', width:'100%'}}>
              <div style={{display:'flex',flexDirection:'column', }}>

                <FormGroup sx={{width:'21%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Diseases" />
                </FormGroup>
                
                <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', width:'100%',
                    justifyContent:'space-around', }}>
                  
                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Diabetes" />
                    <FormControlLabel control={<Checkbox />} label="Hyper Tension" />
                    <FormControlLabel control={<Checkbox />} label="Disabled" />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel control={<Checkbox />} label="Cancer" />
                    <FormControlLabel control={<Checkbox />} label="Aids" />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                  </FormGroup>

                  <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                  </FormGroup>
                
                </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column', }}>

                <FormGroup sx={{width:'21%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                </FormGroup>

                  <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', width:'100%',
                      justifyContent:'start', paddingLeft:42}}>
                    
                    <FormGroup sx={{width:'21%'}}>
                      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    </FormGroup>

                    <FormGroup sx={{width:'20%'}}>
                      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                    </FormGroup>

                  </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column', }}>

                <FormGroup sx={{width:'21%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Drugs" />
                </FormGroup>

                <div style={{display:"flex", flexDirection:'row', maxHeight:'30vh', width:'100%',
                    justifyContent:'start', paddingLeft:42}}>
                  
                  <FormGroup sx={{width:'21%'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Regular" />
                  </FormGroup>

                  <FormGroup sx={{width:'21%'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Experimental" />
                  </FormGroup>

                  <FormGroup sx={{width:'21%'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                  </FormGroup>

                  <FormGroup sx={{width:'21%'}}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
                  </FormGroup>

                </div>
              </div>

              <Divider variant="middle" sx={{bgColor:"#bcbcbc"}}/>

              <div style={{display:'flex',flexDirection:'column', }}>

                <FormGroup sx={{width:'21%',paddingLeft:2}}>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="COVID-19" />
                </FormGroup>
              </div>

            </div>
          </div>

          <Box sx={{display:"flex",pt:4 }}>
            <div style={{width:"20%"}}>
              <p style={{paddingLeft:54, }}>RECOMMEND BASED ON</p>
            </div>
          
            <div style={{display:'flex', flexDirection:'column', width:'80%'}}>
              <div style={{display:"flex", flexDirection:'row', width:'50%',paddingBottom:18}}>
                <Box sx={{ minWidth: '49%',px:2 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label">Industry</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={industry}
                        label="Industry"
                        onChange={handleChangeIndustry}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                      <MenuItem value={10}>---Select Industry---</MenuItem>
                      <MenuItem value={20}>Drugs</MenuItem>
                      <MenuItem value={30}>Physician Practices</MenuItem>
                      <MenuItem value={40}>Healthcare</MenuItem>
                      <MenuItem value={50}>Insurance</MenuItem>
                      <MenuItem value={60}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{  minWidth: "49%", px:2}}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-filled-label" >Analysis</InputLabel>
                      <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled-label"
                        value={analysis}
                        label="Analysis"
                        onChange={handleChangeAnalysis}
                        sx={{ bgcolor: '#ffffff'}}
                      >
                        <MenuItem value={"Select Analysis"}>---Select Analysis---</MenuItem>
                        <MenuItem value={'Cassification'}>Cassification</MenuItem>
                        <MenuItem value={'Forecasting'}>Forecasting</MenuItem>
                        <MenuItem value={'Impact Analysis'}>Impact Analysis</MenuItem>
                        <MenuItem value={'Scoring'}>Scoring</MenuItem>
                        <MenuItem value={'Others'}>Others</MenuItem>

                      </Select>
                    </FormControl>
                  </Box>
                </div>

              </div>
          </Box>


          <Box sx={{display:"flex",pt:4 }}>
            <div style={{width:"20%"}}>
              <p style={{paddingLeft:54, }}>KEYWORD SEARCH</p>
            </div>
          
            <div style={{display:'flex', flexDirection:'column', width:'80%'}}>
              <div style={{display:"flex", flexDirection:'row', width:'50%',paddingBottom:18}}>
                  <Box component="main" sx={{  minWidth: '49%', px:2}}>
                      <TextField fullWidth id="outlined-basic" variant="outlined" label="Enter Keyword" 
                      sx={{ bgcolor: '#ffffff'}}/>
                  </Box>

                  <Box sx={{ display:'flex', minWidth: "100%", px:2}}> 
                        <FormControlLabel control={<Checkbox {...label} icon={<CircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} />} label="Sort Favorites First" />
                        <FormControlLabel control={<Checkbox {...label} icon={<CircleOutlinedIcon />} 
                            checkedIcon={<CheckCircleIcon />} />} label="Sort User-Generated First" />
                  </Box>
                </div>

              </div>
          </Box>

      </div>

    )

}