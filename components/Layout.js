import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeftNav from './LeftNav';
import Header from './Header';
import TopNav from './TopNav';

export default function Layout({ children, user, Auth, userdatasets }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{display:"flex",width:'100%' }}>
      
        <LeftNav user ={user} userdatasets={userdatasets}/>
          <div style={{display:"flex", flexDirection:'row', width:'100%', backgroundColor:"#fff",paddingLeft:12,
          paddingRight:12, paddingTop:12, paddingBottom:12}}>
            <TopNav user={user} Auth={Auth}/>
            <main>{children}</main>
          </div>
    </div>
           
  )
}