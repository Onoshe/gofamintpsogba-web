

const bibleStudyUploadsFields =
{
 fields:   [
        {name:'topic', initVal:'', type:'text',required:true, phold:"Topic on Material *"},
        {name:'description', initVal:'',type:'text', required:true, phold:"Give a little description of the material *"},
        {name:'date', initVal:'',type:'date',required:true, phold:"Date of event *"},
        {name:'documenttype', initVal:'',type:'select', required:true, phold:"Format of material *", defItem:'Format -.pdf', arr:['Select file format', 'pdf', 'word- .doc, .docx',]},
        {name:'uploadedby', initVal:'',type:'text', required:true, phold:"Uploaded by: (Your name) *"},
    ],
values:{
    topic:'',
    description:'',
    date:'',
    documenttype:'',
    uploadedby:'',
},
multipleFiles:false,
maxSize:4000000,
};


const photoGal =
{
 fields:   [
        {name:'event', initVal:'', type:'text',required:true, phold:"ImageGroup: eg-upcoming_programs  (For mediaPage- Name of Event, eg, 2022 Children Day) *"},
        {name:'description', initVal:'',type:'text', required:true, phold:"Give a little description of the event *"},
        {name:'imagename', initVal:'',type:'text', required:true, phold:"Image name, eg, Newness2022. Multiple images will be Newness2022-1,Newness2022-2, etc  *"},
        {name:'directory', initVal:'',type:'text', required:true, phold:"Directory, e.g media_page/newness_dec_2022/ *"},
        {name:'date', initVal:'',type:'date',required:true, phold:"Date of event *"},
        {name:'color', initVal:'',type:'text',required:true, phold:"Event text color *"},
       // {name:'uploadedby', initVal:'',type:'text', required:true, phold:"Uploaded by: (Your name) *"},
    ],
values:{
    event:'',
    description:'',
    imagename:'',
    directory:'',
    date:'',
    color:'',
    //uploadedby:'',
},
multipleFiles:true,
maxSize:2000000,
};

const upcomingProgFlyer =
{
 fields:   [
        {name:'event', initVal:'', type:'text',required:true, phold:"Name of Programme, eg, 2022 Children Day Celebration *"},
        {name:'description', initVal:'',type:'text', required:true, phold:"Give a little description of the event *"},
        {name:'date', initVal:'',type:'date',required:true, phold:"Date of event *"},
        {name:'uploadedby', initVal:'',type:'text', required:true, phold:"Uploaded by: (Your name) *"},
    ],
values:{
    event:'',
    description:'',
    date:'',
    uploadedby:'',
},
multipleFiles:false,
maxSize:3000000,
};

const upcomingProgVideo =
{
 fields:   [
        {name:'event', initVal:'', type:'text',required:true, phold:"Name of Programme, eg, 2022 Children Day Celebration *"},
        {name:'description', initVal:'',type:'text', required:true, phold:"Give a little description of the event *"},
        {name:'date', initVal:'',type:'date',required:true, phold:"Date of event *"},
        {name:'uploadedby', initVal:'',type:'text', required:true, phold:"Uploaded by: (Your name) *"},
    ],
values:{
    event:'',
    description:'',
    date:'',
    uploadedby:'',
},
multipleFiles:false,
maxSize:20000000,
};

const fieldsKey = ['biblestudy', 'photoGal', 'upcomingProgFlyer', 'upcomingProgVideo'];
function getFieldsVals(type){
    const types = {
        biblestudy: bibleStudyUploadsFields,
        photoGal, upcomingProgFlyer, upcomingProgVideo,
        fieldsKey,  
    };
    
    return types[type]
}

//event, discription, date, photo, uploadedby
export {getFieldsVals}