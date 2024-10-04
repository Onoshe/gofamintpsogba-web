'use client'
import React, {useState, useEffect} from 'react'
import HomeHeader from './header/Header'
import Login from './login/Login';
import CardTopText from './components/CardTopText';
import RegisterDemoAccount from './registerDemoAccount/RegisterDemoAccount';
import ForgotPassword from './forgotpassword/ForgotPassword';
import ResetPassword from './resetpassword/ResetPassword';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ToastAlert from '@/components/toast/ToastAlert';
import useStoreHome from '@/context/storeHome';
import { registerHandler } from './utils/registerHandler';
import ModalAlert from '@/components/modal/ModalAlert';
import LoginNewUser from './loginNewUser/LoginNewUser';
import LoadingModal from '@/components/modal/LoadingModal';
import { forgotPasswordHandler } from './utils/forgotPasswordHandler';
import { resetPasswordHandler } from './utils/resetPasswordHandler';
//import { signIn } from 'next-auth/client';
//import { useSession, signIn, signOut } from "next-auth/react"
import useStoreHeader from '@/context/storeHeader';
import PageLoading from '@/loadingPage/PageLoading';
import {runDispatchClientData } from '@/navigation/header/dataManager/getClientData';
import useStoreTransactions from '@/context/storeTransactions';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { loginHandler } from './utils/loginHandler';
import ChangePassword from './changepassword/ChangePassword';
import { useAuthCustom } from "@/lib/hooks/useAuthCustom";

const IndexHome = ({ssUser}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const {form, dispatchForm, dispatchResetForm, resetPwdInfo, dispatchResetPwdInfo} = useStoreHome((state) => state);
    const {dispatchActivePage, dispatchCoy, dispatchPageLoading } = useStoreHeader((state) => state);
    const {transReady, dispatchTransReady, dispatchCOAStructure,  dispatchProducts, dispatchChartOfAccounts, dispatchCustomers, dispatchVendors, dispatchTransactions, dispatchTransactionsDetails} = useStoreTransactions((state) => state);
    const [viewPwd, setViewPwd] = useState(false);
    const [resendOpt, setResendOpt] = useState(false);
    const [showBlind, setShowBlind] = useState({show:false, loadingMsg:''});
    const [alert, setAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    const [enterBtn, setEnterBtn] = useState({'login':false, register:false, forgotPassword:false, resetPassword:false});
    const [modalAlert, setModalAlert] = useState({msgTitle:'', msg:'',type:'', show:false});
    const [modalAlertCall, setModalAlertCall] = useState({showModal:false, act:''});
    const [loadingBtn, setLoadingBtn] = useState({btn:false, loading:false});
    
    //const { data: session, status } = useSession(); //{status:'', data:{seeeion:''}}; //useSession();
    const { signIn, signOut, session, user, userRendering, status} = useAuthCustom(ssUser);

    console.log(session)
    const handleForgotPassword = async ()=>{
        forgotPasswordHandler(form, setAlert, setModalAlert, setModalAlertCall);
    }
    const handleResendOpt =()=>{
        setResendOpt(true);
        dispatchForm({...form, password:'', otp:''})
    };


    
    
    const handleViewPwd =()=>{
        setViewPwd(!viewPwd);
    };

    const handleResetPassword =()=>{
        const userId = searchParams.get('u');
        if(userId){
            resetPasswordHandler({...form, userName:userId}, setAlert, setModalAlert, setModalAlertCall);
        }else{setAlert({msgTitle:'Username retrieval failed!', msg:'Go back and try again!', type:'error', show:true})}
    }
    const handleOnChange =(e)=>{
        const {value, name} = e.target;
        dispatchForm({...form, [name]: value});
        setAlert({msg:'',msgTitle:'', type:'', show:false});
        setResendOpt(false);
    }
    const goToPage =(page)=>{
        router.push(page)
    }


   const handleModalAlert =(act)=>{
    if(act ==="CLOSEREG"){
        setModalAlert({msgTitle:'', msg:'',type:'', show:false, loadingMsg:'', showLoading:false});
        setModalAlertCall({showModal:false, act:''});
        setShowBlind({show:true});
        router.push('/');
    }else if(act ==="CLOSEFORGOT"){
        setModalAlert({msgTitle:'', msg:'',type:'', show:false, loadingMsg:'', showLoading:false});
        setModalAlertCall({showModal:false, act:''});
        setShowBlind({show:true});
        router.push('/reset-password?u='+form.userName);
    }else if(act ==="CLOSERESET"){
        setModalAlert({msgTitle:'', msg:'',type:'', show:false, loadingMsg:'', showLoading:false});
        setModalAlertCall({showModal:false, act:''});
        setShowBlind({show:true});
        router.push('/');
    }else if(act === "CLOSE"){
        setModalAlert({msgTitle:'', msg:'',type:'', show:false, loadingMsg:'', showLoading:false});
        setModalAlertCall({showModal:false, act:''})
    }
   }
   const handelRegister=()=>{
    //router.push('/');
    //setModalAlertCall({showModal:false, act:'GOTOLOGIN'})
     registerHandler(form, dispatchResetForm, alert, setAlert, setModalAlert, setModalAlertCall);
   }
   
   useEffect(()=>{
    if(modalAlertCall?.act === "REGISTER"){
        router.prefetch('/');
        const timeoutId = setTimeout(() => {
            handleModalAlert('CLOSEREG');
          }, 7000);
          return () => clearTimeout(timeoutId);
    }else if(modalAlertCall?.act === "FORGOTPWD"){
        router.prefetch('/reset-password');
        const timeoutId = setTimeout(() => {
            handleModalAlert('CLOSEFORGOT');
          }, 7000);
          return () => clearTimeout(timeoutId);
    }else if(modalAlertCall?.act === "RESETPWD"){
        router.prefetch('/');
        const timeoutId = setTimeout(() => {
            handleModalAlert('CLOSERESET');
          }, 7000);
          return () => clearTimeout(timeoutId);
    }
   },[modalAlertCall]);

   useEffect(()=>{
    dispatchResetForm(); //Reset form on page change
   },[pathname]);

   
  

   const handleLogin = async(e)=>{
    e.preventDefault();
    loginHandler({loadingBtn, setLoadingBtn, signIn, form, dispatchCoy, dispatchActivePage,
        runDispatchClientData, setAlert, goToPage, postActivity,dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts,
        dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, activities,
        dispatchResetPwdInfo})
    }

  React.useEffect(()=>{
    if(status === "authenticated"){
        postActivity(session.user, activities.LOGIN, "User login");
    }
  },[status]);

  if (!session) {
    console.log("You are not authenticated")
    //return <p>You are not authenticated.</p>;
  }
  if (status === "authenticated") {
   // goToPage("/"+domain+"/dashboard")
    console.log("You are now authenticated")
  }

  return (
    <>
        <div data-theme="light" className='bg-white'>
                <HomeHeader session={session}/>
                <PageLoading/>
                <br/>
                <div className="mt-[60px] flex flex-1 overflow-y-auto p-5 flex-col lg:flex-row gap-16">
                    <section className='flex flex-1 items-center flex-col'>
                        <CardTopText/>
                    </section>
                    <section className='flex-1 lg:max-w-[650px]'>
                        {pathname === "/" &&
                            <Login
                                viewPwd={viewPwd}
                                handleViewPwd={handleViewPwd}
                                form={form}
                                handleOnChange={handleOnChange}
                                handleLogin={ handleLogin}
                                enterBtn={enterBtn}
                                showBlind={showBlind.show} 
                                setShowBlind={setShowBlind}
                                loading={loadingBtn.loading}
                            />
                        }
                        {pathname === "/register" &&
                             <>
                                <RegisterDemoAccount
                                    viewPwd={viewPwd}
                                    handleViewPwd={handleViewPwd}
                                    form={form}
                                    handleOnChange={handleOnChange}
                                    handelRegister={handelRegister}
                                    enterBtn={enterBtn}
                                    showBlind={showBlind.show} 
                                    setShowBlind={setShowBlind}
                                    />
                            </>
                        } 
                        {pathname === "/forgot-password" && 
                            <>
                                <ForgotPassword
                                viewPwd={viewPwd}
                                handleViewPwd={handleViewPwd}
                                form={form}
                                handleOnChange={handleOnChange}
                                goToPage={goToPage}
                                handleForgotPassword={handleForgotPassword}
                                enterBtn={enterBtn}
                                goBack={()=>router.back()}
                                showBlind={showBlind.show} 
                                setShowBlind={setShowBlind}
                            />
                            </>
                        }
                        {pathname === "/reset-password" && 
                            <>
                                <ResetPassword
                                viewPwd={viewPwd}
                                handleViewPwd={handleViewPwd}
                                form={form}
                                handleOnChange={handleOnChange}
                                goToPage={goToPage}
                                enterBtn={enterBtn}
                                resendOpt={resendOpt}
                                handleResendOpt={handleResendOpt}
                                goBack={()=>router.back()}
                                showBlind={showBlind.show} 
                                setShowBlind={setShowBlind}
                                handleResetPassword={handleResetPassword}
                                resetPwdInfo={resetPwdInfo}
                            />
                            </>
                        }
                        {pathname === "/change-password" && 
                            <>
                                <ChangePassword
                                viewPwd={viewPwd}
                                handleViewPwd={handleViewPwd}
                                form={form}
                                handleOnChange={handleOnChange}
                                goToPage={goToPage}
                                enterBtn={enterBtn}
                                resendOpt={resendOpt}
                                handleResendOpt={handleResendOpt}
                                goBack={()=>router.back()}
                                showBlind={showBlind.show} 
                                setShowBlind={setShowBlind}
                                handleResetPassword={handleResetPassword}
                            />
                            </>
                        }
                        {pathname === "/login-new-user" && 
                             <>
                                <LoginNewUser
                                    viewPwd={viewPwd}
                                    handleViewPwd={handleViewPwd}
                                    form={form}
                                    handleOnChange={handleOnChange}
                                    goToPage={goToPage}
                                    handleForgotPassword={handleForgotPassword}
                                    enterBtn={enterBtn}
                                    goBack={()=>router.back()}
                                    showBlind={showBlind.show} 
                                    setShowBlind={setShowBlind}
                                />
                            </>
                            }
                    </section>
                </div>
                <div className="flex flex-1 overflow-y-auto p-5 flex-col lg:flex-row gap-16 h-96 bg-sky-100">
                    <section className='flex flex-1 items-center flex-col'>
                        <CardTopText/>
                        
                    </section>
                    <section className='flex-1 lg:max-w-[650px]'>
                        <CardTopText/>
                    </section>
                </div>
            <ToastAlert
                alert={alert}
                setAlert={setAlert}
            />
            <ModalAlert alert={modalAlert} 
                handleClose={()=>handleModalAlert('CLOSE')}
            />
            <LoadingModal showBlind={showBlind.show} loadingMsg={showBlind.loadingMsg}/>
            <footer className="py-5 bg-gray-700 text-center text-white">
            Tailwind is Awesome 😎
            </footer>
        </div>
    </>
  )
}

export default IndexHome;