'use client'
import React, {useState, useEffect, Suspense} from 'react'
import HomeHeader from './header/Header'
import Login from './login/Login';
import CardTopText from './components/CardTopText';
import RegisterDemoAccount from './registerDemoAccount/RegisterDemoAccount';
import ForgotPassword from './forgotpassword/ForgotPassword';
import ResetPassword from './resetpassword/ResetPassword';
import { usePathname, useRouter} from 'next/navigation';
import ToastAlert from '@/components/toast/ToastAlert';
import useStoreHome from '@/context/storeHome';
import { registerHandler } from './utils/registerHandler';
import ModalAlert from '@/components/modal/ModalAlert';
import LoginNewUser from './loginNewUser/LoginNewUser';
import LoadingModal from '@/components/modal/LoadingModal';
import { forgotPasswordHandler } from './utils/forgotPasswordHandler';
import { resetPasswordHandler } from './utils/resetPasswordHandler';
import useStoreHeader from '@/context/storeHeader';
import PageLoading from '@/loadingPage/PageLoading';
import {runDispatchClientData } from '@/navigation/header/dataManager/getClientData';
import useStoreTransactions from '@/context/storeTransactions';
import { activities, postActivity } from '@/lib/apiRequest/postActivity';
import { loginHandler } from './utils/loginHandler';
import ChangePassword from './changepassword/ChangePassword';
import { useAuthCustom } from "@/lib/hooks/useAuthCustom";
import useOnline from '@/lib/hooks/useOnline';
import { resetPwdOTPQuery } from './utils/requests';
import IndexDisplaySessions, { appHighlights } from './components/display-sessions/IndexDisplaySessions';
import ContactUs from './components/contactUs/ContactUs';
import Footer from './components/Footer';
import { getRequest } from '@/lib/apiRequest/getRequest';

const IndexHome = ({ssUser}) => {
    const pathname = usePathname();
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
    const isOnline = useOnline();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false);


    //const { data: session, status } = useSession(); //{status:'', data:{seeeion:''}}; //useSession();
    const { signIn, signOut, session, user, status} = useAuthCustom(ssUser);

    const handleForgotPassword = async ()=>{
        forgotPasswordHandler(form, setAlert, setModalAlert, setModalAlertCall);
    }
    const handleResendOpt = async (userId)=>{
        //console.log(userId)
        await resetPwdOTPQuery({userId,setResendOpt, form, dispatchForm, setAlert});
        //setResendOpt(true);
        //dispatchForm({...form, password:'', otp:''});
    };


    
    
    const handleViewPwd =()=>{
        setViewPwd(!viewPwd);
    };

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
   const handelRegister=(e)=>{
    e.preventDefault();
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

   //console.log(user, form);

   const handleLogin = async(e)=>{
    e.preventDefault();
    //First logout the user in session if any
    if(user?.userId){
        //console.log(user, form)
        signOut({dispatchCoy, user})
        .then(()=>{
            loginHandler({loadingBtn, setLoadingBtn, signIn, form, dispatchCoy, dispatchActivePage,
            runDispatchClientData, setAlert, goToPage, postActivity,dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts,
            dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, activities,
            dispatchResetPwdInfo})
        })
    }else{
        loginHandler({loadingBtn, setLoadingBtn, signIn, form, dispatchCoy, dispatchActivePage,
        runDispatchClientData, setAlert, goToPage, postActivity,dispatchCOAStructure, dispatchProducts, dispatchChartOfAccounts,
        dispatchCustomers, dispatchVendors, dispatchTransReady, dispatchTransactions, dispatchTransactionsDetails, activities,
        dispatchResetPwdInfo})
    }

    }

  
  if(!isOnline){
    //return <NetworkError/>
  }

  //getRequest();


  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Start slide-out animation
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % appHighlights.length);
        setIsSliding(false); // Start slide-in animation
      }, 700); // Duration of slide-out animation
    }, 20000); //20-secs interval
    return () => clearInterval(interval);
  }, [appHighlights.length]);


  return (
    <>
        <div data-theme="light" className='bg-white'>
                <HomeHeader session={session} signOut={signOut}/>
                <PageLoading/>
                
                <div className="lg:mt-[60px] relative flex flex-1 overflow-y-auto p-5 pb-8 lg:py-16 flex-col lg:flex-row gap-16"
                    style={{
                        backgroundImage: `url('/bigCity.jpg')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "100%",
                        width: "100%",
                      }}>
                     <br/>
                     <div className='absolute h-full w-full bg-sky-100/80 left-0 right-0 top-0'></div>
                    <section className='flex flex-1 items-center flex-col z-10'>
                        <CardTopText/>
                    </section>
                    <section className='flex-1 lg:max-w-[650px] z-10'>
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
                            <Suspense>
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
                                    resetPwdInfo={resetPwdInfo}
                                    resetPasswordHandler={resetPasswordHandler}
                                    
                                    setModalAlert={setModalAlert}
                                    setModalAlertCall={setModalAlertCall}
                                    setAlert={setAlert}
                            />
                            </Suspense>
                        }
                        {pathname === "/change-password" && 
                            <Suspense>
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
                                //handleResetPassword={handleResetPassword}
                                resetPasswordHandler={resetPasswordHandler}
                                setModalAlert={setModalAlert}
                                setModalAlertCall={setModalAlertCall}
                                setAlert={setAlert}
                            />
                            </Suspense>
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
                <IndexDisplaySessions
                    currentIndex={currentIndex}
                    isSliding={isSliding}
                />
                <ContactUs
                    alert={alert}
                    setAlert={setAlert}
                />
            <ToastAlert
                alert={alert}
                setAlert={setAlert}
            />
            <ModalAlert alert={modalAlert} 
                handleClose={()=>handleModalAlert('CLOSE')}
            />
            <LoadingModal showBlind={showBlind.show} loadingMsg={showBlind.loadingMsg}/>
            <Footer/>
        </div>
    </>
  )
}

export default IndexHome;