function validatePassword(password) {
    // Minimum length of 7 characters
    const minLength = 7;
  
    // At least one uppercase letter, one lowercase letter, one digit, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  
    // Check the length
    if (password.length < minLength) {
      return false;
    }
  
    // Check for at least one uppercase letter
    if (!uppercaseRegex.test(password)) {
      return false;
    }
  
    // Check for at least one lowercase letter
    if (!lowercaseRegex.test(password)) {
      return false;
    }
  
    // Check for at least one digit
    if (!digitRegex.test(password)) {
      return false;
    }
  
    // Check for at least one special character
    if (!specialCharRegex.test(password)) {
      return false;
    }
  
    // If all conditions are met, the password is valid
    return true;
  }
  

  export {validatePassword}