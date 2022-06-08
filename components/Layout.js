import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeftNav from './LeftNav';
import Header from './Header';
import TopNav from './TopNav';
import {useRouter} from "next/router";

export default function Layout({ children, user, Auth, userdatasets }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const showHeader = router.pathname === '/login' ? false : true;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div style={{display:"flex",minWidth:'100%', maxWidth:'100%' }}>
      
        {showHeader && <LeftNav user ={user} userdatasets={userdatasets}/>}
          <div style={{display:"flex", flexDirection:'row', minWidth:'100%', maxWidth:'100%', backgroundColor:"#fff",}}>
            {showHeader && <TopNav user={user} Auth={Auth}/>}
            <div style={{minWidth:'100%', maxWidth:'100%'}}><main>{children}</main></div>
          </div>
    </div>
           
  )
}