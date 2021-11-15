import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Link from 'next/link';

export default function TopicsCard(props){
    const [show, setShow] = React.useState(false);
    const router = useRouter();
    const[added, setAdded] = React.useState(false);
    const handleAdd = () => {
        if(added === false){
          props.addDatasetcatalog(props.data);
          setAdded(true);
        } else {
            props.removeDataset(props.data);
            setAdded(false);
        }
    }

    const handleRemove = () => {
          props.removeDataset(props.data);
  }

    return (

          <div style={{display:"flex", flexDirection:'row', minHeight:'14vh', width:"100%",
              justifyContent:'space-around', alignItems:'center', marginBottom:16,  }}
              href="/topicbrowser">
      
                    <div style={{fontSize:14, width:"17%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:8, marginLeft:8}}>
                        <Link href="/topic/FDA" >
                      <a style={{width:'19%', textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "FDA"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </div>

                    <div style={{fontSize:14, width:"17%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:8, marginLeft:8}}>
                        <Link href="/topic/Physician">
                      <a style={{width:'19%',textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Physician"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </div>

                    <div style={{fontSize:14, width:"17%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:8, marginLeft:8}}>
                        <Link href="/topic/Drugs" >
                      <a style={{width:'19%',textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Drugs"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </div>

                    <div style={{fontSize:14, width:"17%",backgroundColor:'#fff', paddingLeft:8,
                        paddingRight:8, marginLeft:8}}>
                        <Link href="/topic/Insurance Companies" >
                      <a style={{width:'19%', textAlign:'center'}}>
                        <p><b>{props.data.title?props.data.title: "Insurance Companies"}</b><br></br>
                              </p>

                       </a>
                    </Link>
                         </div>


          </div>
    )

}