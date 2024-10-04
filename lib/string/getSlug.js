
export const getSlug =(val)=>{
    const str = val.toString();
    const strArr = str.split(" ");
    let result = "";

    strArr.forEach(el => {
        if(el){
            if(result){
                result += "-"+el.toLowerCase();
            }else{
                result += el.toLowerCase();
            }
        }
    });

    return result
}