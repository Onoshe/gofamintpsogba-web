import { BsDatabaseAdd, BsDatabaseFillGear, BsFillGearFill, BsFillPeopleFill } from "react-icons/bs";
import {create} from "zustand";
import { IoMdHome, IoMdKey } from 'react-icons/io';
import { BsPersonGear } from 'react-icons/bs';
import { MdLogout, MdManageAccounts, MdOutgoingMail, MdSettings, MdOutlineDashboard, MdOutlineKeyboardDoubleArrowRight, MdOutlineBackup } from 'react-icons/md';

const tabsArrHome = [
    {id:1, name:'DASHBOARD', title:'Dashboard', icon:<MdOutlineDashboard size={20}/>},
    //{id:2, name:'DBTABLES', title:'Database Tables', icon:<BsDatabaseFillGear  size={20}/>},
    {id:2, name:'CREATEUSER', title:'Create User', icon:<BsFillPeopleFill size={20}/>},
    {id:3, name:'CREATECLIENT', title:'Create Client', icon:<BsFillPeopleFill size={20}/>},
    {id:4, name:'MANAGECLIENTS', title:'Manage Clients', icon:<MdManageAccounts size={20}/>},
    {id:5, name:'CREATEACCOUNT', title:'Create Account', icon:<BsFillPeopleFill size={20}/>},
    {id:6, name:'ACCESS', title:'Access', icon:<MdOutlineKeyboardDoubleArrowRight size={20}/>},
    {id:7, name:'BACKUP', title:'Backup', icon:<MdOutlineBackup size={20}/>},
    {id:8, name:'SQLQUERY', title:'SQL Query', icon:<BsDatabaseFillGear size={20}/>},
    //{id:7, name:'TAB7', title:'Resp Tab 7', icon:<BsFillGearFill size={20}/>},
    //{id:8, name:'TAB8', title:'Resp Tab 8', icon:<BsFillGearFill size={20}/>},
    //{id:9, name:'TAB9', title:'Resp Tab 9', icon:<BsFillGearFill size={20}/>}
  ];

  
  var pages = [
    {id:1, route:"/admin", name:'HOME', title:'Home', icon:<IoMdHome/>},
    {id:2, route:"/admin/create", name:'CREATE', title:'Create Client', icon:<BsPersonGear/>},
    {id:3, route:"/admin/communication", name:'COMMUNICATION', title:'Communication', icon:<MdOutgoingMail/>},
    {id:4, route:"/admin/settings", name:'SETTINGS', title:'Settings', icon:<MdSettings/>},
    {id:5, route:"/admin/logout", name:'LOGOUT', title:'Logout', icon:<MdLogout/>}
  ];

const useStoreHome = create((set) => ({
    form:{email:'', userName:"", password:'', confirmPassword:'', otp:'', firstname:"", lastname:''},
    tabsArrHome:tabsArrHome,
    activeTabHome:{index:0, tab:tabsArrHome[0], hideDropdown:false, selTabIndex:''},
    selectedPage:pages[0],
    pages:pages,
    resetPwdInfo:{msg:'', style:'', title:"Reset Password", id:'', email:'', otp:'', userName:''}, 

    dispatchForm: (act) => set((state) => ({
        form: act,
    })),
    dispatchResetForm: (act) => set((state) => ({
        form: {email:'', userName:"", password:'', confirmPassword:'', otp:'', firstname:"", lastname:''}
    })),
    dispatchActiveTabHome: (act) => set((state) => ({
        activeTabHome: act
    })),
    dispatchSelectedPage: (act) => set((state) => ({
        selectedPage: act
    })),
    dispatchResetPwdInfo: (act) => set((state) => ({
        resetPwdInfo: act
    })),

}));



export default useStoreHome;


