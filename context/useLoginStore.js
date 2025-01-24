import {create} from "zustand";


const defUser = {surname:'',firstname:'',fullName:'', title:'', email:'',loginID:'',famID:"",userID:'', imageUrl:""};
const defLoginForm = {show:false, isOnline:false, picture:'', checkedAdmin:false, checkedMember:'nonmember', checkedPin:false};


const initialState = {
  online:false,
  admin: {checked:false, pin:''},
  user:{surname:'',firstname:'',fullName:'', title:'',  email:'',loginID:'',famID:"",userID:'', imageUrl:""},
  loginForm:{show:false, isOnline:false, picture:'', adminPass:false, checkedAdmin:false, checkedMember:'nonmember', checkedPin:false,},
  userType:'', loginUser:{ user:'', guest:false, code:0, },
  showAnnouncement:false,
}

const useLoginStore = create((set) => ({
  ...initialState,

    disOnline: (action) => set((state) => ({
      online :  action
    })),
    disAdmin: (action) => set((state) => ({
        admin :  action
      })),
    disUser: (action) => set((state) => ({
    user :  action
    })),
    disLoginForm: (action) => set((state) => ({
        loginForm :  action
        })),
    disLogout: (action) => set((state) => ({
      loginForm: defLoginForm,
      user: defUser,
      online: false,
      userType:'',
      admin: {checked:false, pin:''},
      userType:"",
      loginUser: { user:'', guest:false, code:0, },
      })),
    disUserType:(action) => set((state) => ({
      userType :  action
    })),
    disLoginUser:(action) => set((state) => ({
      loginUser :  action
    })),
    disShowAnnouncement:(action) => set((state) => ({
      showAnnouncement :  action
    })),
}))


export default useLoginStore