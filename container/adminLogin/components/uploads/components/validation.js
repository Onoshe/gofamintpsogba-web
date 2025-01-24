

function fileValidator(rawFile, criterial){
    //const singleFile = rawFile.target.files[0];
    const {maxSize, tab} = criterial;
    let msg = "";
    let errors= [];
    var isError = {error: false, details:''};

    const multiFiles = rawFile.target.files;
    let fileLst = [];
    for (let i=0; i < multiFiles.length; i++){
        const file = multiFiles[i];
        const {name, size} = file;
        let type = name.split('.');
        type = type[type.length-1];

     if(size > maxSize){
        msg = `File Error! ${name} size exceeds maximum size of ${maxSize/1000}kb`;
        isError = {error:true, details: msg};
        return
      }else{
        const docFmts = ['doc', 'pdf', 'docx'];
        const imgFmts = ['jpg', 'jpeg', 'png'];

        if(tab===0 && !docFmts.includes(type)){
            msg =  `File Error! ${name} file format is not surported`;
            isError = {error:true, details: msg};
            return
        }
        if((tab===1 || tab === 2) && !imgFmts.includes(type)){
            msg = `File Error! ${name} file format is not surported`;
            isError = {error:true, details: msg};
            return
        }
        if(tab===3 && type !== 'mp4'){
            msg = `File Error! ${name} file format is not surported`;
            isError = {error:true, details: msg};
            return    
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




export {fileValidator, validateUploads}