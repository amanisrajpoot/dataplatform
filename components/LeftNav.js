import styles from '../styles/LeftNav.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableViewOutlinedIcon from '@mui/icons-material/TableViewOutlined';
import SourceIcon from '@mui/icons-material/Source';
import SettingsIcon from '@mui/icons-material/Settings';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import Divider from '@mui/material/Divider';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link'
import {getPublicDatasets, getDatasets, getUser} from '../function/users';


export default function LeftNav({
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
}) {
	const router = useRouter();
	const [addSampleModalVisible, setAddSampleModalVisible] = useState(false);
	const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false);
	const [locationModalVisible, setLocationModalVisible] = useState(false);
	const [width, setWidth] = useState(null);
	const [favourite, setFavourite] = useState(true)
	const [recently, setRecently] = useState(true)

	async function redirect(route) {
		setmenu(false);
		await router.push(route);
	}
	const [doctor, setDoctor] = useState(null);
	useEffect(async () => {
		console.log('get datasets called from leftnav', token);
        const data = await getDatasets(
            token
        );
        setUserdatasets(data);
    console.log("fetched datasets",data);
    }, [token,router]);

	return (
		<div className={`${styles.header} ${leftAnimation}`} style={{ fontStyle:'normal', minHeight:'100vh',
			fontWeight:400,border: "1px solid #dedede",
			}}>
			{/* ADD SAMPLES */}
			<Modal
				open={addSampleModalVisible}
				onClose={() => {
					setAddSampleModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<AddSamples*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	onClose={() => setAddSampleModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			{/* DISPENSE */}
			<Modal
				open={addPatientsModalVisible}
				onClose={() => {
					setAddPatientsModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<AddPatients*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	onClose={() => setAddPatientsModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			{/* LOCATION */}
			<Modal
				open={locationModalVisible}
				onClose={() => {
					setLocationModalVisible(false);
				}}
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{/*<LocationModal*/}
				{/*	role={role}*/}
				{/*	location={location}*/}
				{/*	setLocation={setLocation}*/}
				{/*	onClose={() => setLocationModalVisible(false)}*/}
				{/*	token={token}*/}
				{/*/>*/}
			</Modal>

			<div className={styles.navbar}>
				<div style={{width:'100%',}}>
					 	<div style={{ width:'100%', }} onClick={()=>router.push("/dashboard")}>
							 <img src='/logo02.png' layout="responsive" width='100%' style={{cursor:'pointer'}}
								></img>
						{/*<div style={{width:'100%',textAlign:'center', fontSize:32, 
						paddingTop:30,paddingBottom:30, cursor:"pointer",
						fontFamily:'-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;',
						backgroundImage: 'url(/logo01.png)',}}
						>Health Data Platform</div> */}
						</div>
					<Divider />
				</div>


				<div
					onClick={() => {
						router.push('/dashboard');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/dashboard')
							? '#5A00E2'
							: 'gray',
					}}
				>
						<DashboardIcon fontSize="medium" sx={{fontSize:28,}}/>

					<p
						style={{fontSize:20, font:'roboto', fontWeight:500,
							color: router.pathname.includes('/dashboard') ? '#5A00E2' : '',
						}}
					>
						Dashboard
					</p>
				</div>


				<div
					onClick={() => {
						router.push('/datasets');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/datasets')||
						router.pathname.includes('/searchresult')||
						router.pathname.includes('/dataset/')
							? '#5A00E2'
							: 'gray',
					}}
				>
						<TableViewOutlinedIcon fontSize="medium" sx={{fontSize:28,}}/>


					<p
						style={{fontSize:20, font:'roboto', fontWeight:500,
							color: router.pathname.includes('/datasets') ||
							router.pathname.includes('/searchresult') ||
							router.pathname.includes('/dataset/')? '#5A00E2' : '',
						}}
					>
						My Datasets
					</p>
				</div>

				<div
					onClick={() => {
						router.push('/browsecatalogue');
						// if (width !== null && width <= 800) {
						// 	setmenu(false);
						// 	setLeftAnimation(styles.menuTopClose);
						// }
					}}
					className={styles.items}
					style={{
						color: router.pathname.includes('/browsecatalogue') ||
						 	   router.pathname.includes('/topic')
							? '#5A00E2'
							: 'gray',
					}}
				>
						<SourceIcon fontSize="medium" sx={{fontSize:28,}}/>


					<p
						style={{fontSize:20, font:'roboto', fontWeight:500,
							color: router.pathname.includes('/browsecatalogue')||
							router.pathname.includes('/topic') ? '#5A00E2' : '',
						}}
					>
						Catalogs
					</p>
				</div>

				{/* <div style={{paddingTop:18, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<div style={{textTransform: "capitalize", color:'#939EAA', fontSize:14}}>FAVOURITE</div>
					<div onClick={()=>setFavourite(!favourite)}>
						{favourite?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>

				</div>

				{favourite && <>{userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                        userdatasets.sort((a,b)=>new Date(a.CreatedAt) - new Date(b.CreatedAt)).map((data, index)=> index <3 &&
						<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12,cursor:"pointer",
				textAlign:'left'}} onClick={() => {router.push(`/dataset/${data.ID}`)}}>
					<div style={{width:"20%"}}><FiberManualRecordIcon color="error" fontSize="small" sx={{color:"#5A00E2"}} /></div>
					<div style={{width:"70%"}}>{data.title.substring(0,16)}</div>
					<div style={{width:"14%", color:'#C5CDD4'}}>{data.data_sources}</div>
				</div>):null} </>} */}

				<div style={{paddingTop:18, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between',  paddingBottom:12}}>
					<div style={{textTransform: "capitalize", color:'#939EAA', fontSize:14}}>RECENT DATASETS</div>
					<div onClick={()=>setRecently(!recently)}>
						{recently?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>

				</div>

				 {recently && <><div style={{display:'flex', flex:'start', paddingBottom:9, color:"#5A00E2", alignItems:'center',
				cursor:'pointer', justifyContent:'center'}} onClick={()=>router.push("/searchresult")}>
					<div style={{width:'20%'}}><AddCircleOutlineOutlinedIcon color="disabled" style={{fontSize:28,color:"gray",marginRight:24}} /></div>
					<div style={{width:'80%'}}>Start New Set</div>
				</div>

					{userdatasets !== null && userdatasets !== undefined && userdatasets.length > 0 ?
                        userdatasets.sort((a,b)=>new Date(b.CreatedAt) - new Date(a.CreatedAt)).map((data, index)=> index <3 && 
						<div style={{display:'flex', justifyContent:'space-between',paddingBottom:12,alignItems:'center', cursor:"pointer" }}
							onClick={() => {router.push(`/dataset/${data.ID}`)}}>
							<div style={{width:"21%"}}>
								<div style={{backgroundColor:"#5A00E2", borderRadius:'50%', height:32, width:32, color:'white',
									textAlign:'center',paddingTop:6}}>
									{data.title.charAt(0).toUpperCase()}
								</div></div>
							<div style={{width:"75%"}}>{data.title.substring(0,19)}</div>
							<div style={{width:"10%"}}><FiberManualRecordIcon color="success" fontSize="small" sx={{color:'#9147ff'}}/></div>
						</div>):null}
				</>}
			
				<div
					className={`${styles.items} ${styles.loc}`}
					onClick={() => setLocationModalVisible(true)}
				>
					<Image src='/location.svg' width={20} height={20} />
					<p>Location</p>
				</div>

			</div>

			{/*<section className={styles.accountSection}>*/}
			{/*	<div*/}
			{/*		onClick={() => {*/}
			{/*			redirect('/profile');*/}
			{/*			if (width !== null && width <= 800) {*/}
			{/*				setmenu(false);*/}
			{/*				setLeftAnimation(styles.menuTopClose);*/}
			{/*			}*/}
			{/*		}}*/}
			{/*		className={styles.itemsAcc}*/}
			{/*		style={{*/}
			{/*			backgroundColor: router.pathname.includes('/profile')*/}
			{/*				? '#ecfefc'*/}
			{/*				: '',*/}
			{/*		}}*/}
			{/*	>*/}
			{/*		<p style={{ marginRight: '1rem', zIndex: '2' }}>*/}
			{/*			<Image src='/account.svg' width={40} height={40} />*/}
			{/*		</p>*/}
			{/*		<p className={styles.itemlabel}>*/}
			{/*			{doctor && doctor.name ? doctor.name : 'Account'}*/}
			{/*		</p>*/}
			{/*	</div>*/}
			{/*	<div*/}
			{/*		onClick={signOut}*/}
			{/*		className={styles.itemsLogout}*/}
			{/*		style={{ marginTop: '0.5em' }}*/}
			{/*	>*/}
			{/*		<p style={{ marginRight: '1rem', zIndex: '2' }}>*/}
			{/*			<Image src='/logout_red.svg' width={40} height={40} />*/}
			{/*		</p>*/}
			{/*		<p className={styles.itemlabel}>Log out</p>*/}
			{/*	</div>*/}
			{/*</section>*/}
		</div>
	);
}
