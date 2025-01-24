const pstcornfields =
{
 fields:   [
        {name:'topic', title:"Message Topic", initVal:'', type:'text',required:'required', 
            autoComplete:'autoComplete', pholder:"Topic of the Message *"},
        {name:'bibleRef', title:'Bible reference', initVal:'',type:'text', required:'', 
            autoComplete:'autoComplete', pholder:"Bible passage "},
        {name:'date', title:"Date: ", subTitle: "The Sunday when the message was released", initVal:'',type:'date',
            autoComplete:'autoComplete', required:'required', pholder:"Date of event *"},
        {name:'prayer', title:'Prayer', initVal:'',type:'text', required:'', 
            autoComplete:'autoComplete', pholder:"Prayer... *"},
        
    ],
values:{
    topic:'',
    bibleRef:'',
    date:'',
    messagebody:'',
    prayer:'',
},
textarea:{
    fields:{name:'messagebody', title: "Message body", initVal:'',type:'select', required:true, 
            autoComplete:'autoComplete', pholder:"Message body .... *"},
},
};


const getPastorCornerFields=( el)=>{
    const type = {
        pstcornerflds: pstcornfields,
    };

    return type[el]
}

export {getPastorCornerFields}