
const getFileExtension = (file) => {
    const filename = file?.name;
    const size = file?.size;
    if(!filename) return
    const ext = filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
    const validExt = ['jpg', 'JPG'];
    if(validExt.includes(ext) && size <= 2000000){
      return {valid:true, ext, size}
    }else{return {valid:false, ext, size}}  
  };

export {getFileExtension}