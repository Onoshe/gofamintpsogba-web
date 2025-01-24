

export function generateToken(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&|?!abcdefghijklmnopqrstuvwxyz0123456789';
      let password = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
    
      return password;
    }
