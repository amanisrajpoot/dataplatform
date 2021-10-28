import {useState, } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Output() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industry, setIndustry] = React.useState('');
  const [analysis, setAnalysis] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeIndustry = (event) => {
    setIndustry(event.target.value);
  };

  const handleChangeAnalysis = (event) => {
    setAnalysis(event.target.value);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  return (
    
    <div style={{ paddingTop: 32, paddingLeft: 8, paddingRight: 8, paddingBottom: 8,
        backgroundColor: '#fff',width:'100%', display:'flex',  }}>
          
          <div style={{paddingTop: 8, paddingLeft: 24, paddingRight: 4, paddingBottom: 8,
             bgcolor: '#eaeff1',width:'30%' }}>
                  <div sx={{ display: 'flex',flexDirection:'column', 
                      justifyContent:'space-between',font:'roboto',
                      fontSize:24, width:'100%' }}>
                      <div style={{paddingLeft:14}}><div style={{fontSize:24, }}>OUTPUT OPTIONS</div> &nbsp;
                      <>Last time exported at 10/21/2021 15:10 pm</></div>
                      
                      <div>
                        <Button variant="outlined" size="large" 
                        sx={{mx:2, width:'100%', py:2, mt:4}}
                          startIcon={<FileDownloadOutlinedIcon />} onClick={handleOpen}>
                          Download Excel</Button>
                          <Button variant="outlined" size="large" 
                        sx={{mx:2, width:'100%', py:2, my:4}}
                          startIcon={<FileDownloadOutlinedIcon />} onClick={handleOpen}>
                          Download CSV</Button>
                      </div>
                  </div>
          </div>
           
          <div style={{ paddingTop: 18,display: 'flex', flexDirection: 'column', 
            width:'65%', mb:4, paddingLeft:56, }}>
              
              <div style={{display:'flex', flexDirection:'row', 
                  width:'100%', height:'100%', justifyContent:'end',paddingBottom:12}}>
                <div style={{fontSize:14,}}>DOCUMENTATION</div>
              </div>

              <div style={{display:'flex', flexDirection:'column', 
                  width:'100%', height:'100%', paddingBottom:48}}>
                <div style={{fontSize:20, paddingBottom:8 }}>API Credentials</div>
                <div style={{paddingLeft:32, paddingTop:16 , paddingBottom:4,
                  backgroundColor:"#bcbcbc"}}>
                  <div><p><b>Endpoint:</b> https://app.readysignal.com/api</p></div>
                  <div><p><b>Access Token:</b> eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.</p></div>
                  <div><p><b>Workspace:</b> 430</p></div>
                  
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', 
                  width:'100%', height:'100%', paddingBottom:48}}>
                <div style={{fontSize:20, paddingBottom:8 }}>Domo Data Connector</div>
                <div style={{paddingLeft:32, paddingTop:16 , paddingBottom:4,
                  backgroundColor:"#bcbcbc"}}>
                  <div><p><b>API Key:</b> eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ</p></div>
                  <div><p><b>Workspace:</b> 430</p></div>
                  
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', 
                  width:'100%', height:'100%'}}>
                <div style={{fontSize:20, paddingBottom:8 }}>API Integration</div>
                <div style={{paddingLeft:32, paddingTop:12 , paddingBottom:8,
                  backgroundColor:"#bcbcbc"}}>
                  <div><p>1. GET /api/signals/430/output HTTP/1.1</p></div>
                  <div><p>2. Host: app.readysignal.com.</p></div>
                  <div><p>3. Content-Type: application/json</p></div>
                  <div><p>4. Accept: application/json</p></div>
                  <div><p>5. Authorization: Bearer eyJ0eXAiOiJKV1...</p></div>
                  
                </div>
              </div>
          </div>
    </div>

  );
}

