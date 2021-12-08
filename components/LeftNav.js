import styles from '../styles/LeftNav.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from '../function/checkAuth';
// import AddSamples from './AddSamples';
// import AddPatients from './AddPatients';
import { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
// import { getDoctor } from '../function/doctor';
// import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
// import LocationModal from './LocationModal';
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

export default function LeftNav({
	setmenu,
	leftAnimation,
	setLeftAnimation,
	role,
	setLocation,
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
	// useEffect(async () => {
	// 	const doctorP = await getDoctor({ token });
	// 	setDoctor(doctorP);
	// 	console.log('doctorP', doctorP);
	// }, [token]);

	useEffect(() => {
		window.addEventListener('resize', function () {
			setWidth(window.innerWidth);
		});
	}, []);

	useEffect(() => {
		window.addEventListener('resize', function () {
			setWidth(window.innerWidth);
			if (width >= 800) setLeftAnimation(styles.menuTopOpen);
		});
	}, [width]);

	return (
		<div className={`${styles.header} ${leftAnimation}`}>
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
				<div style={{width:'100%', paddingBottom:12}}>
					<div style={{width:'100%',textAlign:'center', fontSize:32, paddingTop:12,paddingBottom:12,
						fontFamily:'roboto'}}>Data Platform</div>
					<Divider />
				</div>


				<div
					onClick={() => {
						redirect('/dashboard');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.items}
					style={{
						backgroundColor: router.pathname.includes('/dashboard')
							? '#ECFEFC'
							: '',
					}}
				>
					{router.pathname.includes('/dashboard') ? (
						<DashboardIcon fontSize="medium"/>
					) : (
						<Image src='/dashboard.svg' width={20} height={20} />
					)}
					<p
						style={{
							color: router.pathname.includes('/dashboard') ? '#0DB1A1' : '',
						}}
					>
						Dashboard
					</p>
				</div>


				<div
					onClick={() => {
						redirect('/samples');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.items}
					style={{
						backgroundColor: router.pathname.includes('/samples')
							? '#ECFEFC'
							: '',
					}}
				>
					{router.pathname.includes('/dashboard') ? (
						<TableViewOutlinedIcon fontSize="medium"/>
					) : (
						<Image src='/sample.svg' width={20} height={20} />
					)}
					<p
						style={{
							color: router.pathname.includes('/samples') ? '#0DB1A1' : '',
						}}
					>
						My Datasets
					</p>
				</div>

				<div
					onClick={() => {
						redirect('/dispense');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.items}
					style={{
						backgroundColor: router.pathname.includes('/dispense')
							? '#ECFEFC'
							: '',
					}}
				>
					{router.pathname.includes('/dashboard') ? (
						<SourceIcon fontSize="medium" />
					) : (
						<Image src='/patient.svg' width={20} height={20} />
					)}
					<p
						style={{
							color: router.pathname.includes('/dispense') ? '#0DB1A1' : '',
						}}
					>
						Catalogues
					</p>
				</div>

				<div
					onClick={() => {
						redirect('/dispense');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.items}
					style={{
						backgroundColor: router.pathname.includes('/dispense')
							? '#ECFEFC'
							: '',
					}}
				>
					{router.pathname.includes('/dashboard') ? (
						<SettingsIcon fontSize="medium" />
					) : (
						<Image src='/patient.svg' width={20} height={20} />
					)}
					<p
						style={{
							color: router.pathname.includes('/dispense') ? '#0DB1A1' : '',
						}}
					>
						Settings
					</p>
				</div>

				<div
					onClick={() => {
						redirect('/alerts');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.items}
					style={{
						backgroundColor: router.pathname.includes('/alerts')
							? '#ECFEFC'
							: '',
					}}
				>
					{router.pathname.includes('/dashboard') ? (
						<LiveHelpIcon fontSize="medium" />
					) : (
						<Image src='/bell.svg' width={20} height={20} />
					)}
					<p
						style={{
							color: router.pathname.includes('/alerts') ? '#0DB1A1' : '',
						}}
					>
						Support
					</p>
				</div>

				<div style={{paddingTop:24, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<div>Favourite</div>
					<div onClick={()=>setFavourite(!favourite)}>
						{favourite?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>

				</div>

				{favourite && <><div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<FiberManualRecordIcon color="error" fontSize="small" />
					<div>Healthcare</div>
					<div>345</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<FiberManualRecordIcon color="error" fontSize="small" />
					<div>FDA Drugs </div>
					<div>123</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between',paddingBottom:12}}>
					<FiberManualRecordIcon color="error" fontSize="small" />
					<div>Insurance Inc.</div>
					<div>678</div>
				</div></>}

				<div style={{paddingTop:24, paddingBottom:24}}>
					<Divider />
				</div>

				<div style={{display:'flex', justifyContent:'space-between',  paddingBottom:12}}>
					<div>Recently Used</div>
					<div onClick={()=>setRecently(!recently)}>
						{recently?<ExpandLessIcon />:<ExpandMoreIcon/>}
					</div>

				</div>

				{recently && <><div style={{display:'flex', flex:'start', paddingBottom:9, color:"#5A00E2", alignItems:'center',
				cursor:'pointer'}}>
					<AddCircleOutlineOutlinedIcon color="disabled" style={{fontSize:32,color:"gray",marginRight:24}} />
					<div>Start New Set</div>
				</div>
					<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<FiberManualRecordIcon color="success" fontSize="small" />
					<div>Insurance Inc.</div>
					<div>678</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between',paddingBottom:12 }}>
					<FiberManualRecordIcon color="success" fontSize="small" />
					<div>FDA Drugs </div>
					<div>123</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', paddingBottom:12}}>
					<FiberManualRecordIcon color="success" fontSize="small" />
					<div>FDA Drugs </div>
					<div>123</div>
				</div></>}

				<div
					className={`${styles.items} ${styles.loc}`}
					onClick={() => setLocationModalVisible(true)}
				>
					<Image src='/location.svg' width={20} height={20} />
					<p>Location</p>
				</div>

			</div>

			<section className={styles.accountSection}>
				<div
					onClick={() => {
						redirect('/profile');
						if (width !== null && width <= 800) {
							setmenu(false);
							setLeftAnimation(styles.menuTopClose);
						}
					}}
					className={styles.itemsAcc}
					style={{
						backgroundColor: router.pathname.includes('/profile')
							? '#ecfefc'
							: '',
					}}
				>
					<p style={{ marginRight: '1rem', zIndex: '2' }}>
						<Image src='/account.svg' width={40} height={40} />
					</p>
					<p className={styles.itemlabel}>
						{doctor && doctor.name ? doctor.name : 'Account'}
					</p>
				</div>
				<div
					onClick={signOut}
					className={styles.itemsLogout}
					style={{ marginTop: '0.5em' }}
				>
					<p style={{ marginRight: '1rem', zIndex: '2' }}>
						<Image src='/logout_red.svg' width={40} height={40} />
					</p>
					<p className={styles.itemlabel}>Log out</p>
				</div>
			</section>
		</div>
	);
}
