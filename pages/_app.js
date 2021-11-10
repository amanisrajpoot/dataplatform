import '../styles/globals.css'
import Amplify, {Hub, Auth} from "aws-amplify";
import awsExports from "../components/aws-export";
import {useEffect, useState} from "react";
import {nonAuthRoutes, adminUsers, adminRoute} from "../function/constants";
import {useRouter} from "next/router";
import {checkAuth} from "../function/checkAuth";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
  const router = useRouter();
    // Auth Token: 0-> Loading, null-> Not Auth, "string"-> Auth
    const [token, setToken] = useState(0);
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("")

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

  // useEffect(() => {checkAuth({token, setToken, role, setRole, setLocation}).then(r => {console.log("Set first time token")})}, [])

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

  return (
    <>
      {/*<Navbar />*/}
      <Component role={role} setLocation={setLocation} token={token} location={location} setToken={setToken} {...pageProps} />
      {/* <Footer /> */}
    </>
  )
}

export default MyApp
