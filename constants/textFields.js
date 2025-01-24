
const txtFields = {
   title:{name:"title", title:'Title', optArr:["Select", "Pastor", "Elder", "Deacon", "Deaconess", "Brother", "Sister"], type:'opts'},
   surname:{name:"surname", title:'Surname', pholder:"Enter surname", type:"text"},
   firstname:{name:"firstname", title:'Firstname', pholder:"Enter firstname", type:"text"},
   othernames:{name:"othernames", title:'Othernames', pholder:"Enter othernames", type:"text"},
   residentialAddress:{name:"residentialAddress", title:'Residential Address', pholder:"Enter residential address", type:"text"},
   officeAddress:{name:"officeAddress", title:'Office Address', pholder:"Enter office address", type:"text"},
   dob:{name:"dob", title:'Birthday: ', type:"date", subTitle:"Set year (yyyy) as 1900 if no year is provided. Eg. 24-June would be 24/06/1900"},
   gender:{name:"gender", title:'Gender', opt1:"Male", opt2: "Female", type:'radio', optArr:['Select','Male', "Female"]},
   ageGroup:{name:"ageGroup", title:'Age bracket', optArr:["Select", "Baby (0-2yrs)","Child/Teens (3-16yrs)", "Young Adult (17-30yrs)", "Middle-aged Adult (31-45yrs)", "Old Adult (above 45yrs)"], type:'opts', subTitle:"Select approximate bracket if you don't have full info"},
   email:{name:"email", title:'Email', pholder:"Enter email", type:"email"},
   phoneNo:{name:"phoneNo", title:'Phone Number', pholder:"Enter phone number", type:"number"},
   occupation:{name:"occupation", title:'Occupation', pholder:"Enter your occupation or profession", type:"text"},
   addressOf:{name:"addressOff", title:'Office Address', pholder:"Enter office address", type:"text"},
   school:{name:"school", title:'School', pholder:"Enter your school", type:"text"},
   qualification:{name:"qualification", title:'Qualification', pholder:"Enter your qualification", type:"text"},

   membershipStatus:{name:"membershipStatus", title:"Membership Status", optArr:["Select", "Present", "Former", "Transferred", "Relocated",  "None", "Deceased"], type:'opts'},
   comment:{name:"comment", title:'Any comment or prayer request?', pholder:"Your comment or prayer request", type:"textarea"},
   instiStat:{name:"instiStat", title:'Select your highest qualification', type:"opts",
        optArr:["Select", "Professor", "Phd", "Masters", "BSc", "HND", "OND", "NCE", "SSCE", "Primary School", "Others"]
    },
    memberCat: {name:"memberCat", title:"Member Category", optArr:["Select", "Minister", "Worker", "Member", "Non-member (Not a PS Ogba member)"], type:'opts'},
    maritalStatus:{name:"maritalStatus", title:'Marital Status', type:"radio",opt1:"Single", opt2:"Married", optArr:['Single', "Married"]},
    invited:{name:"invited", title:'Were you invited?', type:"radio",opt1:"Yes", opt2:"No", optArr:['Yes', "No"]},
    byWho:{name:"byWho", title:'If invited, by who?', pholder:"By who where you invited", type:"text"},


    weddingAnn:{name:"weddingAnn", title:'Wedding Anniversary: ', type:"date", subTitle:"Set year (yyyy) as 1900 if no year is provided. Eg. 05-Oct would be 05/10/1900"},
    baptismalStatus:{name:"baptismalStatus", title:'Baptismal Status', type:"radio",opt1:"Baptised", opt2:"Not baptised", optArr:['Select','Baptised', "Not baptised"]},
    photo:{name:"photo", title:'Photo upload', subTitle:"Max size-100kb", pholder:"Upload your photo: ", type:"file"},

    sundaySchoolClassOld:{name:"sundaySchoolClass", title:'Select your Sunday School Class', type:"opts",
      optArr:["Select", "English Adult A", "English Adult B", "English Adult C", "Yoruba Adult", 
            "Youth A", "Youth B", "Youth C", "Junior Youth", "Intermediate", "Cradle", "Beginner", ],},
   sundaySchoolClass:{name:"sundaySchoolClass", title:'Sunday School Class', type:"opts",
       optArr:["Select", "ADULT-A", "ADULT-B", "ADULT-C", "YORUBA", 
         "YOUTH-A", "YOUTH-B", "JUNIOR-YOUTH", "INTERMEDIATE", "PRIMARY", "BEGINNER", "CRADLE","BOARD", "NO-CLASS"],},
   class99:{name:"class", title:'Sunday School Class', type:"opts",
      optArr:["Select", "ADULT-A", "ADULT-B", "ADULT-C", "YORUBA", 
         "YOUTH-A", "YOUTH-B", "JUNIOR-YOUTH", "INTERMEDIATE", "PRIMARY", "BEGINNER", "CRADLE","BOARD", "NO-CLASS"],},
   sundaySchoolPost:{name:"sundaySchoolPost", title:'Select your Sun Sch Post', type:"opts",
      optArr:["Select", "Director", "Suprintendent","General Secretary", "Asst. Gen Secretary", "Evang. Superintendent", "Teacher", "Asst. Teacher", 
         "Secretary", "Asst. Secretary", "Evangelism", "Usher", "Student",],},
   memberStatus:{name:"memberStatus", title:'Member Status', disc:'Sunday Sch member status', type:"radio",opt1:"Worker", opt2:"Student", optArr:['Worker', "Student"]},
   regularMember:{name:"regularMember", title:'Regular Member?', type:"radio",opt1:"Yes", opt2:"No", optArr:['Yes', "No"]},
   dateOfVisit:{name:"dateOfVisit", title:'Visitor date of Visit', type:"date", subTitle:"mm/dd/yyy"},
   visitor:{name:"visitor", title:'Visitor?', opt1:"No", opt2: "Yes", type:'radio', optArr:['Select','No', "Yes"]},
   sunSchVisitor:{name:"sunSchVisitor", title:'Visitor?', opt1:"No", opt2: "Yes", type:'radio', optArr:['Select','No', "Yes"]},
   sunSchVisitorDate:{name:"sunSchVisitorDate", title:'Date of Visit', type:"date", subTitle:"mm/dd/yyy"},

   discipline:{name:"discipline", title:'Discipline/Course of Study', pholder:"Enter your discipline", type:"text"},      
   profession:{name:"profession", title:'Profession', pholder:"Enter your profession", type:"text"},        
   church:{name:"church", title:'Your Church', pholder:"Your church", type:"text"},
   attending:{name:"attending", title:'Will you be attending the Program?', type:"opts",
         optArr:["Select", "I will be attending", "I am not sure", "I will not be attending",],},
   amInvited:{name:"amInvited", title:'Invited?', type:"radio",opt1:"No, I'm a member of PS Ogba", opt2:"Yes, I'm invited", optArr:["No, I'm a member of Gofamint PS Ogba", "Yes, I'm invited"]},
   sendInfo:{name:"contactlist", title:'Add you to our contact list?', type:"radio",opt1:"Yes", opt2:"No", optArr:["Yes", "No"]},
   howInfo:{name:"howInfo", title:'How did you get to know about this program?', pholder:"How did you get to know abou this program?", type:"text"},
   familySlug:{name:"familySlug", title:'Family Slug', pholder:"Family Slug", type:"text", subTitle:"Please, don't touch this field. It is used to set the same family members"},
   
};


const titlesAbbrev = {
   "District Pastor": 'Pst.', 
   "Resident Pastor": 'Pst.', 
   "Asst. Resident Pastor": 'Pst.', 
   "Pastor": 'Pst', 
   "Elder": 'Eld.', 
   "Deacon":'Dn.', 
   "Deaconess":'Dcn.', 
   "Brother":'Bro.', 
   "Sister":'Sis.',
};

const getTxtFields =()=>{
   return txtFields
}


export {titlesAbbrev, getTxtFields};