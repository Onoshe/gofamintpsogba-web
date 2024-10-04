
const getFileDetails = ({file, maxSize, validExt}) => {
    //const validExt = ['jpg', 'JPG'];
    let res = {valid:false, validFormat:false, validSize:false, msg:'No file selected!'};
    const filename = file?.name;
    const size = file?.size;

    if(!filename) res;
    const ext = filename?.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    const validExtUpperCase = validExt?.map((e)=> e.toLowerCase());
    if(validExtUpperCase.includes(ext?.toLowerCase())){
      res=  {...res, validFormat:true}
    }else{res=  {...res, msg:'Expected file formats - '+(validExt?.toString())+"!"}}
    
    if(size <= maxSize){
        res = {...res, validSize:true}
    }else{res = {...res, msg:"Maximum file size is "+maxSize/1000+"kb!"}}

    if(res.validFormat && res.validSize){
        res =  {...res, valid:true}
    }else{
        res =  {...res, valid:false}
    }
    return res
  };

export {getFileDetails}