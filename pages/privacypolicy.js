import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import UseMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import * as React from 'react';
import Button from '@mui/material/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomepageCards from '../components/HomepageCards';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function PrivacyPolicy() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  return (
    
    <Box>
      <Navbar />

      <Box sx={{ display: 'flex', flexDirection:'column', 
               pt:6,px: 24, bgcolor: '#fff', 
               justifyContent:'center', color:'#000', alignItems:'center',
              backgroundImage:'../components/homepage-banner.jpeg'
              }}>
        
            <Box sx={{pb: 2, }}>
                <Typography color="inherit" variant="h4" component="h1" 
                    sx={{display:'flex', flexDirection:'column', py:0, my:0, 
                         }}
                    style={{textAlign:'center'}}>
                    PRIVACY POLICY
                </Typography>
                <p style={{textAlign:'center'}}>Last updated: 5/8/2020</p>
            </Box> 

            <Box>
              <p>Ready Signal ("us", "we", or "our") operates http://www.readysignal.com (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information we receive from users of the Site.</p>
              <p>We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.</p>
              <h3>Information Collection And Use</h3>
              <p>While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited, to your name and contact information ("Personal Information").</p>
              <h3>Log Data</h3>
              <p>Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").</p>
              <p>This Log Data may include information such as your computer's Internet Protocol (IP) address, browser type, browser version, the pages of our Site you visit, the time and date of your visit, the time spent on those pages, and other statistics.</p>
              <p>In addition, we may use third party services such as Google Analytics that collect, monitor, and analyze this information.</p>
              <h3>Communications</h3>
              <p>We may use your Personal Information to contact you with newsletters, marketing, or promotional materials and other information that pertains to your use of Ready Signal.</p>
              <h3>Cookies</h3>
              <p>Cookies are files with small amounts of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive.</p>
              <p>Like many sites, we use cookies to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.</p>
              <h3>Security</h3>
              <p>The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.</p>
              <h3>Changes To This Privacy Policy</h3>
              <p>This Privacy Policy is effective as of 5/8/2020 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.</p>
              <p>We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
              <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our Site.</p>
              <h3>Children Under the Age of 16</h3>
              <p>Our Site is not intended for children under 16 years of age. No one under age 16 may provide any personal information to or on the Site. We do not knowingly collect personal information from children under 16. If you are under 16, do not use or provide any personal information on this Site. If we learn we have collected or received personal information from a child under 16 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 16, please contact us.</p>
              <h3>Contact Us</h3>
              <p>If you have any questions about this Privacy Policy, please contact us.</p>

            </Box>
      </Box>

        <Box sx={{ display: 'flex', flexDirection:'column', 
              height:'60vh', bgcolor: '#3e3e33', 
               justifyContent:'center', color:'#000',  
              backgroundImage:'../components/homepage-banner.jpeg', pb:4,pt:4
              }}>
        
            <Box sx={{pt:4, px:14,}}>
                <Box sx={{width:'85%'}}>
                  <img src="https://www.readysignal.com/wp-content/uploads/2021/01/Domo.png" />
                </Box>

                <Box sx={{textAlign:'right', color:'#BCBCBC'}}>
                  <Box>
                      <p>ABOUT US</p>
                      <p>SERVICES</p>
                      <p>CONTACT US</p>
                      <p>HELP CENTERy</p>
                      <p>{"BLOG & RESOURCES"}</p>
                      <p>TERMS OF USE</p>
                      <p>PRIVACY POLICY</p>
                  </Box>
                </Box>
            </Box>

            <Box sx={{pt:8, px:14}}>
                <Box sx={{width:'90%', color:'#BCBCBC'}}>
                  <p>contact@readysignal.com </p>
                  <p>330 E. Liberty St. Ann Arbor, MI 48104</p>
                </Box>
            </Box>
          </Box>
    
      <Footer />
    </Box>
  );
}

