import tabsSchema from "./headerSchema";


const tabList = [
    //{name:'Record', tabs:getTabs(tabsSchema.record)},
    {name:'ADMIN', tabs:getTabs(tabsSchema.admin)},
    {name:'CONTROL', tabs:getTabs(tabsSchema.control)},
    //{name:'GUEST', tabs:getTabs(tabsSchema.guest)},
];

const tabListBasic = [
    {name:'Record', tabs:getTabs(tabsSchema.record)},
];

const tabListGuest = [
    {name:'GUEST', tabs:getTabs(tabsSchema.guest)},
];
const tabListNoneMember = [
    {name:'', tabs:[]},];

const tabListAdmin = [
    {name:'Record', tabs:getTabs(tabsSchema.record)},
    {name:'ADMIN', tabs:getTabs(tabsSchema.admin)},
];
export { tabList, tabListBasic, tabListAdmin, tabListGuest, tabListNoneMember}




function getTabs(header){
    const arr = [];
    for(let i= 0; i < header.tabs.length; i++){
        const name = header.tabs[i];
        const title = header.titles[i];
        arr.push({name, title})
    }
    return arr
}



/*

const tabLists = [
    {name:'Record', tabs:[{name:'About',title:'RECORDABOUT'}, {name:'Register',title:'RECORDREGISTER',}, {name:'View',title:'RECORDVIEW'},]},
    {name:'ADMIN', tabs:[{name:'DASHBOARD',title:'ADMINDASHBOARD',}, {name:'Members Data',title:'ADMINMEMBERSDATA'},{name:'PastorCorner',title:'ADMINPASTORCORNER'},{name:'Uploads',title:'ADMINUPLOADS'}]},
    {name:"CONTROL", tabs:[{name:'Developer',title:'CONTROLDEVELOPER'}, {name:'Register',title:'CONTROLREGISTER',}]},
  ];

  */