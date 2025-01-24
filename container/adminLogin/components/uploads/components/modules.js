

function fileValidator(rawFile, critrial){
    //const singleFile = rawFile.target.files[0];
    const {maxSize, tab} = critrial;
    let msg = "";
    let errors= [];
    
    const multiFiles = rawFile.target.files;
    let fileLst = [];
    for (let i=0; i < multiFiles.length; i++){
        const file = multiFiles[i];
        const {name, size} = file;
        let type = name.split('.');
        type = type[type.length-1];

     if(size > maxSize){
        msg = `File Error! ${name} size exceeds maximum size of ${maxSize/1000}kb`;
        errors.push({error:msg});
      }else{
        if(tab===0){
            if (type === 'doc' || 
            type === 'docx' || 
            type === 'pdf'){
                msg = "OKAY"; errors.push({error:msg});
            }else{
                msg =  `File Error! ${name} file format is not surported`;
                errors.push({error:msg});
            }
        }
        if(tab===1 || tab === 2){
            if (type === 'jpg' || 
            type === 'jpeg' || 
            type === 'png'){
                msg = "OKAY"; errors.push({error:msg});
            }else{
                msg = `File Error! ${name} file format is not surported`;
                errors.push({error:msg});
            }
        }
        if(tab===3){
            if (type === 'mp4'){
                msg = "OKAY"; errors.push({error:msg});
            }else{
                msg = `File Error! ${name} file format is not surported`;
                errors.push({error:msg});
            }
        }
        const imgSrc = URL.createObjectURL(file);
        const fileset = {...file, imgSrc: imgSrc}
        //fileLst.push({...file, imgSrc: imgSrc});
        fileLst.push(fileset);
      };
    }
    
    const findError = errors.find((item, i)=> item.error !== "OKAY");
    const res = {files:fileLst, error: findError? findError.error : "OKAY"};
    
    return res
}


function validateUploads(formVals, seltdTab){
    return [formVals, seltdTab]
}



const validateInputs=(form, tab)=>{
    let errorMsgs = {msg:'', error:false};

    //for(let i=0; i<forms.length; i++){
      //  const form = forms[i];
        
        if(tab===0){
            const {topic, description, documenttype, uploadedby, date, } = form;
            if(topic === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Topic of the material!"}
            }
            if(description === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Description of the material!"}
            }
            if(documenttype === ""){
                return   errorMsgs = {error:true, msg:"Please, select the file format!"}
            }
            if(uploadedby === ""){
                //return   errorMsgs = {error:true, msg:"Please, fill your name!"}
            }
            if(date === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Date of the material!"}
            }

        }else{
            const {event, description, date, imagename, directory, color,image_table,  uploadedby } = form;
            if(event === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the name of the Event!"}
            }
            if(description === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Description of the material!"}
            }
            if(imagename === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Image name!"}
            }
            if(directory === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Directory name!"}
            }
            if(color === ""){
                return   errorMsgs = {error:true, msg:"Please, enter the event text color!"}
            }
            if(uploadedby === ""){
               // return   errorMsgs = {error:true, msg:"Please, fill your name!"}
            }
            if(date === ""){
                return   errorMsgs = {error:true, msg:"Please, fill the Date of the material!"}
            }
            if(image_table === ""){
                return   errorMsgs = {error:true, msg:"Please, select the Image table!"}
            }
        }

    return errorMsgs
}


export {fileValidator, validateUploads, validateInputs}

const tab0 = {topic: '', description: '', date: '', documenttype: '', uploadedby: ''};
const tab123 = {event: '', description: '', date: '', uploadedby: ''};