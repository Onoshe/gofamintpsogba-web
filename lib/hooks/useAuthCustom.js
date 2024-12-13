'use client'
import { useState, useEffect } from "react";
import { postRequest } from "../apiRequest/postRequest";
import { getRequest } from "../apiRequest/getRequest";
import { usePathname, useRouter } from "next/navigation";
import useStoreHeader from "@/context/storeHeader";
import { activities, postActivity } from "../apiRequest/postActivity";
import { getLinkFetchTableWithConds } from "../apiRequest/urlLinks";



/****************** USER RENDERING ***************************
 getUserSession()  function returns Siderside user (ssUser). It is a server side props rendering and works only on the server.
 Hence, it is supplied as prop in the root page component. Upon refresh of page, the prop (user) will always be available as long as the session is still active.
 But the issue is that once the prop is provided at the root page, it will not update upon logout or login except when page is refreshed (then it renders null if session is not available);
Therefore, we should be able to switch between Server side (SS) and Client Side (CS) for user props
As such, SS is set as default till when a user login or logout.
___________________________________________________*/

export function useAuthCustom(ssUser) {
  const [user, setUser] = useState(ssUser);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('unauthenticated');
  const [userRendering, setUserRendering] = useState('SS');
  const [sessionExp, setSessionExp] = useState(false);
  //const {dispatchActivePage, dispatchCoy, settings, activityLog, dispatchRefreshSettingsCount } = useStoreHeader((state) => state);
  const router = useRouter();
  const pathname = usePathname();
  


  useEffect(() => {
    const checkUserSession = async () => {
      setStatus("loading");
      try {
        const response = await getRequest("/api/auth/session");
        if (response.ok) {
          setUser(response.user);
          setStatus("authenticated");
          setUserRendering("CS");
          postLoginActivity(user, activities.LOGIN);
          validateSessionExp(response?.user);
        } else {
          setUser(null);
          setStatus("unauthenticated");
          setUserRendering("CS");
          const allowedPaths = ["/register", "/forgot-password", "/change-password", "/reset-password", "login-new=user"];
          if(!allowedPaths.includes(pathname)){
            router.push("/")
          }
        }
      } catch (error) {
       // console.error("Error checking session:", error);
        setUser(null);
        setStatus("unauthenticated");
        setUserRendering("CS");
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);


  const signIn = async (loginType, loginCred) => {
    const {userName, password} = loginCred;
    setLoading(true);
    setStatus("sign_in_attempt");
    try {
      const response = await postRequest("/api/auth/login", {userName, password});
      //console.log(response)
      if(response.ok) {
        setUser(response.user);
        setStatus("authenticated");
        setUserRendering("CS");
        postActivity(user, activities.LOGIN);
        return { success: true, ok:true, user:response.user };
      } else {
        setStatus("sign_in_error");
        postActivity({userId:userName, email:'', firstname:'', lastname:'', companyId:userName?.split("@")[0]?.toUpperCase()}, activities.LOGIN_ATTEMPT);
        return { success: false, msg:response.msg, ok:false, user:null};
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setStatus("sign_in_error");
      return { success: false, msg: "Authentication failed", ok:false };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async ({dispatchCoy, user}) => {
    setLoading(true);
    setStatus("logout");
    try {
      await postRequest("/api/auth/logout", {email:''});
      setUser(null);
      setUserRendering("CS");
      postActivity(user, activities.LOGOUT);
    } catch (error) {
      console.error("Error during sign-out:", error);
    } finally {
      setLoading(false);
      router.push("/");
      dispatchCoy("");
    }
  };

  const validateSessionExp =(user)=>{
      const td = new Date(user.ckAt).getTime();
      const exp = new Date(user.ckExp).getTime();
      if(td > exp){
        setSessionExp(true);
      }else{setSessionExp(false)}
  };

  return {
    user,
    session:{user},
    loading,
    status,
    sessionExp,
    userRendering,
    signIn,
    signOut,
  };
}


const postLoginActivity = async (user, act)=>{
  //Post LOGIN activity once in a day. If not, activity will be posted repeatedly even upon page refresh
  if(user?.companyId && user?.companyId?.toLowerCase() !== "admin"){
      const domain = user?.companyId.toLowerCase();

      const todayDate = new Date().toISOString().split("T")[0];
      const url = getLinkFetchTableWithConds({table:domain+'_activitylog', conds:'activity,activityDate', values:'LOGIN,'+todayDate});
      const activitiesRes = await getRequest(url);
      if(activitiesRes?.ok){
        if(!activitiesRes?.data?.length){
          postActivity(user, act);  
        } 
      }else{
        console.log('ActivityPost-Error!')
      }
    }  
 
}