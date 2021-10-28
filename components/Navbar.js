import * as React from 'react';
import Header from './Header';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
          <Header onDrawerToggle={handleDrawerToggle} />
           
  );
}