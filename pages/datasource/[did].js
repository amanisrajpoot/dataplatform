import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal } from '@material-ui/core';
import { Storage } from 'aws-amplify';
import styles from '../../styles/sampleDetails.module.css';


const SampleDetails = ({ token, location, role }) => {
	const router = useRouter();
	const [showImge, setShowImg] = useState('');
	const [keysList, setKeysList] = useState([]);

	const [resync, setResync] = useState(false);

	const { sid } = router.query;
	const [sample, setSample] = useState(null);

	useEffect(async () => {
		if (sample && sample.url) {
			if (sample.url.includes(',')) {
				setKeysList(sample.url.split(','));
			} else {
				setKeysList([sample.url]);
			}
		}
	}, [sample]);
	useEffect(async () => {
		if (keysList && keysList.length > 0) {
			let res = [];
			for (let i = 0; i < keysList.length; i++) {
				res.push(await getImage(keysList[i]));
			}
			console.log('JAI--', res);
			setShowImg(res);
		}
	}, [keysList]);
	async function getImage(keyIm) {
		console.log('GAME-1', keyIm);
		const res = await Storage.get(keyIm, {
			level: 'public', // defaults to `public`
		});
		console.log('GAME', res);
		return res;
	}

	const [addPatientsModalVisible, setAddPatientsModalVisible] = useState(false);
	const [editSample, seteditSample] = useState(false);
	const [addDisposeModalVisible, setAddDisposeModalVisible] = useState(false);
	const [lostSamplesModalVisible, setLostSamplesModalVisible] = useState(false);

	useEffect(async () => {
		const sampl = await getSamplesFromId({ token, id: sid });
		if (sampl) setSample(sampl);
	}, [token, location, sid]);
	// useEffect(async () => {
	//     if (sid && sample && sample.url){
	//         const res = await getImage(sample.url)
	//         setShowImg(res)
	//     }
	// }, [sid, sample])
	function editDetails() {
		seteditSample(true);
	}
	async function dispenseFunc() {
		setAddPatientsModalVisible(true);
	}
	async function disposeFunc() {
		setAddDisposeModalVisible(true);
	}

	return (
		<div className={styles.main}>
			
			<div style={{flex: 1, height: '50%', margin: '1rem', maxWidth: '100%'}}>
				<div onClick={() => router.back()} className={styles.back}>
					<Image src='/left.svg' width={18} height={18} />
					<p>Back</p>
				</div>
				<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center',
                        justifyContent: 'space-between', margin: '1rem 0'}}>
					<div style={{fontFamily: 'Plus Jakarta Sans',fontStyle: 'normal', fontWeight: 'bold',
                            fontSize: '1.5rem', color: '#3f4544',display: 'flex', flexDirection: 'column'}}>
						<span>Data Sources Details</span>
						<span style={{ width: '60px',marginTop: '5px', borderBottom: '4px solid #0db1a1', }} />
					</div>
					{role === 'Doctor' && (
						<div
							onClick={editDetails}
							className={`${styles.editButton} ${styles.underlineLink}`}
						>
							Edit details
						</div>
					)}
				</div>
				<div style={{display:'flex', maxWidth:'80%', maxHeight:'80%', flexDirection:'column', 
                justifyContent:'space-around'}}>
					<div >
						<Image src='/Frame.svg' width={30} height={30} />
						<p>{sample ? sample.medicationName : ''}</p>
					</div>
					<div style={{display: 'flex', flexDirection: 'row',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',alignItems: 'center',
                                margin: "1rem 0",}}>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Lot#</label>
							<p>{sample ? sample.lot : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Expiry date</label>
							<p>{sample ? formateIncomingDate(sample.expiryDate) : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Quantity per unit</label>
							<p>{sample ? sample.quantityPerU : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Unit of measure</label>
							<p>{sample ? sample.unitOfM : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Dosage</label>
							<p>{sample ? sample.dosage : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Received units</label>
							<p>{sample ? sample.receivedQuantity : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Lost units</label>
							<p>{sample ? sample.lostQuantity : ''}</p>
						</div>
						<div style={{display: 'flex',flexDirection: 'column',justifyContent: 'space-around',
                                        alignItems: 'flex-start', minWidth: '40%', margin: '1.2rem 1rem 1.2rem 0'}}>
							<label>Dispensed units</label>
							<p>{sample ? sample.dispensedQuantity : ''}</p>
						</div>
						
					</div>
				</div>
				<div className={styles.buttons} style={{ flexDirection: 'column' }}>
					
					<div
						style={{
							display: 'flex',
							justifyContent: 'end',
							columnGap: '1em',
						}}
					>
						{router.pathname.includes('/dashboard')?<button
							onClick={disposeFunc}
							className={styles.button_up}
							style={{ width: '50%' }}
						>
							Add to Dataset
						</button>:<button
							onClick={disposeFunc}
							className={styles.button_up}
							style={{ width: '50%',  }}
						>
							Add to Dataset
						</button>}
						
					</div>
				</div>
			</div>
		
		</div>
	);
};

export default SampleDetails;
