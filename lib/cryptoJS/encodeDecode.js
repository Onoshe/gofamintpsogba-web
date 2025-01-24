//'use client'

const decryptSimple = (textValue) => {
    let data = "";
    if (typeof window !== "undefined")  
    try {
        data = atob(textValue);
      } catch (e) {
        console.error(e.message);
        // Expected output: Error: Parameter is not a number!
      }
    return data
};

export const encodeDecode = (textValue, type) => {
  let data = "";  
  if (typeof window !== "undefined")
  if(type === 'DECODE'){
    try {
      data = btoa(textValue);
    } catch (e) {
      console.error(e.message);
      // Expected output: Error: Parameter is not a number!
    }
  }else{
    try {
      data = atob(textValue);
    } catch (e) {
      console.error(e.message);
      // Expected output: Error: Parameter is not a number!
    }
  }
  return data
};
