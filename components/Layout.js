import * as React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
          <Header onDrawerToggle={handleDrawerToggle} />
           
  );
}