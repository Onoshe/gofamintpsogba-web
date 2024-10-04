import {create} from "zustand";


const users = [
    {firstname:'Alabi', lastname:'Alfred', gender:'Male', email:'alfred@gmail.com', role:'Admin', phoneNo:'080646646464',userName:'DEMO@alfred.alabi', nonActive:'0', deleted:'0'},
    {firstname:'James', lastname:'Bola', gender:'Female', email:'bola@gmail.com', role:'Accountant', phoneNo:'080646646464',userName:'DEMO@james.bola', nonActive:'1', deleted:'0'}
];


const useStoreCompany = create((set) => ({
    users:users,
    user:users[0],
    
    dispatchUsers: (act) => set((state) => ({
        users: act,
    })),
    dispatchUser: (act) => set((state) => ({
        user: act,
    }))
    
}));


//export default useStoreCompany;



