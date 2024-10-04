
const basicTextFields = {
    
    type:{name:"type", title:'Type', opt1:"Individual", opt2: "Company", type:'radio', optArr:['--Select--','Individual', "Company"]},
    title:{name:"title", title:'Title', type:'opts', optArr:["--Select--", "Mr", "Mrs", "Miss"]},
    accountNo:{name:"accountNo", title:'Account number', pholder:"Enter account number", type:"number"},
    accountCode:{name:"accountCode", title:'Account code', pholder:"Enter account code", type:"number"},
    //group:{name:"group", title:'Group', pholder:"Enter group", type:"text"},
    firstname:{name:"firstname", title:'Firstname', pholder:"Enter firstname", type:"text"},
    lastname:{name:"lastname", title:'Lastname', pholder:"Enter lastname", type:"text"},
    othernames:{name:"othernames", title:'Othernames', pholder:"Enter othernames", type:"text"},
    dob:{name:"dob", title:'Birthday: ', type:"date", subTitle:"mm/dd/yyy"},
    gender:{name:"gender", title:'Gender', opt1:"Male", opt2: "Female", type:'radio', optArr:['--Select--','Male', "Female"]},
    email:{name:"email", title:'Email', pholder:"Enter email", type:"email"},
    phoneNo:{name:"phoneNo", title:'Phone Number', pholder:"Enter phone number", type:"tel"},
    residentialAddress:{name:"residentialAddress", title:'Residential Address', pholder:"Enter address", type:"text"},
    formNo:{name:"formNo", title:'Form number', pholder:"Enter form number", type:"text"},
    position:{name:"position", title:'position', pholder:"Enter position", type:"text"},
    nextContactPersonName: {name:"nextContactPersonName", pholder:"Next contact person name", title:'Next contact person name', type: 'text',},
    nextContactPersonPhoneNo: {name:"nextContactPersonPhoneNo", pholder:"Next contact person phone number", title:'Next contact person phone number', type: 'text',},
    nextContactPersonEmail: {name:"nextContactPersonEmail", pholder:"Next contact person email", title:'Next contact person email', type: 'text',},

    companyName:{name:"companyName", title:'Company Name', pholder:"Enter company name", type:"text"},
    companyEmail:{name:"companyEmail", title:'Company Email', pholder:"Enter company email", type:"text"},
    companyPhoneNo:{name:"companyPhoneNo", title:'Company Phone number', pholder:"Enter Company phone number", type:"tel"},
    companyAddress:{name:"companyAddress", title:'Company Address', pholder:"Enter company address", type:"text"},
    businessType:{name:"businessType", title:'Business Type', pholder:"Enter your business type", type:"text"},
    region:{name:"region", title:'Region', pholder:"Enter your region", type:"text"},
    country:{name:"country", title:'Country', pholder:"Enter your country", type:"text"},
    state:{name:"state", title:'State', pholder:"Enter your state", type:"text"},
    zip:{name:"zip", title:'Zip', pholder:"Enter your zip code", type:"tel"},
    registeredDate:{name:"registeredDate", title:'Registered date', type:"date", subTitle:"mm/dd/yyy"},
    info:{name:"info", title:'Additional Info', pholder:"Additional info?", type:"text"},
 };
 const otherTextFields = {
    title:{name:"title", title:'Title', optArr:["--Select--", "Pastor", "Elder", "Deacon", "Deaconess", "Brother", "Sister"], type:'opts'},
    nextOfKin: {name:"nextOfKin", pholder:"Next of kin name", title:'Next of Kin', type: 'text',},
    nextOfKin: {name:"nextOfKinPhoneNo", pholder:"Next of kin phone no", title:'Next of Kin phone no', type: 'text',},
 };
 
 
 
 export { basicTextFields, otherTextFields};