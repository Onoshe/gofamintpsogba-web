
function pairKeyValue(arr, pair){
	
    const pairRes = arr?.reduce((accum,item, i) => {
      const key = item[pair[0]];
      const value = item[pair[1]];
      
      return {
     ...accum,
        [key]: value,
      };
    }, {});
     return pairRes
}
    
export default pairKeyValue;