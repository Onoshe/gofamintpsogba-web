'use client'

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

const encryptSimple = (textValue) => {
  let data = "";  
  if (typeof window !== "undefined")
  try {
      data = btoa(textValue);
    } catch (e) {
      console.error(e.message);
      // Expected output: Error: Parameter is not a number!
    }
  return data
};


  export {encryptSimple, decryptSimple}
  
