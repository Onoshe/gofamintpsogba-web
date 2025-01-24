import {create} from "zustand";
import bullentin from '../assets/home/home1.jpg'; //Default backgroundimage before the main is fetched from site
//import bgVideo from '../assets/videos/passionOfChristTrillerConverted.mp4';


const defStmt ={
  name:'',
  data:'',
  activities:[],
  activitiesShort:[],
  Total:'',
  
};
const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.084343144778!2d3.348355449513512!3d6.636447395177593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93e8cca0dd7d%3A0x596e77e2296ced9c!2sGOFAMINT%20PACESETTERS%2C%20OGBA%20LAGOS!5e0!3m2!1sen!2sng!4v1677087742110!5m2!1sen!2sng";
//const mapUrlOld = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.084300262345!2d3.3483661787678654!3d6.6364527237056326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b93e8cca0dd7d%3A0x596e77e2296ced9c!2sGOFAMINT%20PACESETTERS!5e0!3m2!1sen!2sng!4v1650556242977!5m2!1sen!2sng";

const initialState = {
  membersData:{empty:[1,25,5,6,3]},
  backgroundImg: {fetched:false, image: bullentin},
  onlineOffPayers:[],
  onlineOfferings:[],
  tableDataOff:{tableHeaders:[], tableBodyKeys:[], tableBody:[]},
  seltdMemberStmt: defStmt,
  familyIDToFind:'alade.abiodun.ibukun',
  lastStmtDate:'Sun Jan 1, 2023',
  lastStmtDateYYMMDD:'2023-01-01',
  lastStmtDateSet:'2023-01-01',
  refreshCtrl:0,
  mapUrl:mapUrl,
  bgVideo: 'bgVideo',
}

const useAdminStore = create((set) => ({
  ...initialState,

    disMembersData: (action) => set((state) => ({
      membersData :  action
   })),
    disBackgroundImg: (action) => set((state) => ({
      backgroundImg :  action
   })),
    disOnlineOffPayers: (action) => set((state) => ({
      onlineOffPayers :  action
   })),
    disOnlineOfferings: (action) => set((state) => ({
      onlineOfferings :  action
   })),
    disTableDataOff: (action) => set((state) => ({
      tableDataOff :  action
   })),
    disSeltdMemberStmt: (action) => set((state) => ({
      seltdMemberStmt :  action
   })),
    disFamilyIDToFind: (action) => set((state) => ({
      familyIDToFind :  action
   })),
    disLastStmtDate: (action) => set((state) => ({
      lastStmtDate :  action
   })),
    disLastStmtDateYYMMDD: (action) => set((state) => ({
      lastStmtDateYYMMDD :  action
   })),
    disLastStmtDateSet: (action) => set((state) => ({
      lastStmtDateSet :  action
   })),
    disRefreshCtrl: (action) => set((state) => ({
      refreshCtrl: state.refreshCtrl +1
   })),
}))


export default useAdminStore