
  //'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+[]{}|;:,<>?abcdefghijklmnopqrstuvwxyz0123456789';

 export function generatePassword(length){
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
  
    return password;
  }


 function generatePasswordMean(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&abcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
    
      return password;
    }
  
  // Example usage
  //const password = generatePasswordMean(96);
  //console.log(password);