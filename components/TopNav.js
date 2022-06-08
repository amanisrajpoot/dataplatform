import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Link from 'next/link'
import {getPublicDatasets, getDatasets, getUser} from '../function/users';
import Box	from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Auth from 'aws-amplify';
import * as React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { signOut } from '../function/checkAuth';

export default function TopNav({
	setmenu,
	leftAnimation,
	setLeftAnimation,
	role,
	setLocation,
	userdatasets,
	setUserdatasets,
	location,
	menu,
	token,
	user,
	Auth
}) {
	const router = useRouter();
	const [addSampleModalVisible, setAddSampleModalVisible] = useState(false);
	const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false);
	const [locationModalVisible, setLocationModalVisible] = useState(false);
	const [width, setWidth] = useState(null);
	const [favourite, setFavourite] = useState(true)
	const [recently, setRecently] = useState(true)
	const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
	const openUser = Boolean(anchorElUser);

	const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

	async function redirect(route) {
		setmenu(false);
		await router.push(route);
	}
	const [doctor, setDoctor] = useState(null);
	useEffect(async () => {
		if(token !== 0 && token && token !== null && token !== undefined && 
            (userdatasets === [] || userdatasets === null)){
			console.log('get datasets called from leftnav', token);
        	const data = await getDatasets(
            token
       		 );
        setUserdatasets(data);
    	console.log("fetched datasets",data);
		}
    }, [token]);

	return (
		<div component="main" style={{  display:'flex',minWidth:'100%', maxWidth:'100%',  
				position:'fixed',backgroundColor:'white', height:'9vh'  }}>
                        <div style={{minWidth:'67%', display:'flex', flexDirection:'row', backgroundColor:'white', alignItems:'center', 
						 }} >
                            <div style={{color:'gray', paddingRight:'1em', paddingLeft:'1em'}}>
                                <SearchIcon />
                            </div>

                            <InputBase
                                // onChange={setVal}
                                sx={{ bgcolor:'white',width:'90%'}}
                                placeholder="Search Google Maps"
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    placeholder:"Search..."
                                }}
                            />
                        </div>

						<div style={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'flex-end',
							bgcolor:'white', alignItems:'center',  }} >
							<div style={{display:"flex",flexDirection:'row', backgroundColor:"#fff",paddingLeft:12,
								alignItems: 'center',cursor: 'pointer',  height:"70px", }}>
								{/* <Link href='/login'>
									{/* <NotificationsIcon
										fontSize="large"
										sx={{color:'#939EAA', cursor:'pointer'}}
									/> 
								</Link> */}
								&nbsp;&nbsp;&nbsp;
								<Link href={"/settings"}>
									<AccountCircleIcon onClick={()=>router.push("/settings")} 
										fontSize="large" sx={{color:'#939EAA'}}/>
								</Link>
								&nbsp;&nbsp;&nbsp;
								<p style={{fontSize:20}}>{user && user.name?user.name:Auth.user?Auth.user.attributes.name: 'Account'} </p>
								&nbsp;&nbsp;&nbsp;
								<div
									// onClick={()=>signOut({path:router.pathname})}
									onClick={handleClickUser}
								>
									<ArrowDropDownIcon fontSize="large" sx={{color:'#939EAA'}}/>
								</div>

								<Menu
									id="basic-menu"
									anchorEl={anchorElUser}
									open={openUser}
									onClose={handleCloseUser}
									MenuListProps={{
										'aria-labelledby': 'basic-button',
									}}
								>
									<MenuItem onClick={()=>router.push('/settings')}><SettingsIcon/>&nbsp; Settings</MenuItem>
									<MenuItem onClick={()=>router.push('/support')}><LiveHelpIcon/>&nbsp; Support</MenuItem>
									<MenuItem onClick={()=>{
										// mixpanel.track('Sign Out', {
										// 	'source': "Dashboard Page",
										// 	'action': "Signed Out from User Menu",
										// 	'email': user.email !== null && user.email !== undefined && user.email,
										// });
										signOut({path:router.pathname})
									}}><ExitToAppIcon/>&nbsp; Sign Out</MenuItem>
								</Menu>
							</div>
							</div>
						</div>


	)
}
