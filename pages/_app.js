import '../styles/globals.css'
import Amplify, {Hub, Auth} from "aws-amplify";
import awsExports from "../components/aws-export";
import {useEffect, useState} from "react";
import {nonAuthRoutes, adminUsers, adminRoute} from "../function/constants";
import {useRouter} from "next/router";
import {checkAuth} from "../function/checkAuth";
import { getDatasets, getPublicDatasets } from '../function/users';

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
    // Auth Token: 0-> Loading, null-> Not Auth, "string"-> Auth
    const [token, setToken] = useState(0);
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("");

    useEffect(() => {
      Hub.listen('auth', (data) => {
          const event = data.payload.event;
          console.log('event:', event);
          if (event === "signOut") {
              setToken(null)
          } else if (event === "signIn") {
              checkAuth({token, setToken, setRole, setLocation}).then(r => {
                  console.log("Event Login", token)
              })
          }
      })
  }, [])

  useEffect(()=>{
    console.log("app token",token)
  })

  useEffect(() => {checkAuth({token, setToken, role, setRole, setLocation}).then(r => {console.log("Set first time token")})}, [])

  useEffect(() => {
      if (token !== 0 && !token && !nonAuthRoutes.includes(router.pathname)){
          router.push("/login").then(r => {console.log("Redirected to Login")})
      } else if (token && nonAuthRoutes.includes(router.pathname)){
          router.push("/dashboard").then(r => {console.log("Redirected to Dashboard")})
      }
  }, [token]);

  useEffect(() => {
      if ("serviceWorker" in navigator) {
          navigator.serviceWorker
              .register("/service-worker.js")
              .then(serviceWorker => {
                  console.log("Service Worker registered: ", serviceWorker);
              })
              .catch(error => {
                  console.error("Error registering the Service Worker: ", error);
              });
      }
  }, [])

  const [dataset, setDataset] = useState({
        user_email:'',
        title:'',
        description:'',
        topic:'',
        row_count:0,
        data_points:0,
        data_sources:0,  
        status:'',
        template:false,
        catalog:[]
  });

    const [userdatasets, setUserdatasets] = useState([]);
    useEffect(async () => {
            const data = await getDatasets(
                token
            );
            setUserdatasets(data);
        console.log("fetched datasets",data);
    }, [token]);

    const addDatasetcatalog = (data) => {
            setDataset({...dataset,catalog:[...dataset.catalog,data]});
            console.log("dataset",dataset)
        };
    const removeDatasetcatalog = (data) => {
            const filtered = dataset.catalog.filter(item => item.ID !== data.ID);
            setDataset({...dataset,catalog:filtered});
            console.log("dataset",dataset)
        };

    useEffect( () => {
            setDataset({...dataset,title,description});
            console.log("added details",dataset);
          }, [title, description,token,router]);

    const [dataSources, setDataSources] = useState([]);
    useEffect(async () => {
		if(token!==null){
      const data = await getPublicDatasets(
			token
		);
			setDataSources(data);
      console.log("fetched data",data);
      }
  }, [token]);

  return (
    <>
      {/*<Navbar />*/}
      <Component role={role} setLocation={setLocation} token={token} location={location} 
          setToken={setToken} dataset={dataset} setDataset={setDataset} userdatasets={userdatasets}
          setUserdatasets={setUserdatasets} removeDatasetcatalog={removeDatasetcatalog} 
          addDatasetcatalog={addDatasetcatalog} dataSources={dataSources} setDataSources={setDataSources}
          title={title} description={description} setTitle={setTitle} setDescription={setDescription}
          {...pageProps} name={name} setName={setName} email={email} setEmail={setEmail} company={company} setCompany={setCompany}/>
      {/* <Footer /> */}
    </>
  )
}

export default MyApp
