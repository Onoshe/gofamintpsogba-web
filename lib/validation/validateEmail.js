
//By chatgpt
function validateEmail(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}



function validateEmailByBard(email) {
    // Convert the email to lowercase.
    email = email.toLowerCase();
  
    // Check if the email contains the @ symbol.
    if (!email.includes('@')) {
      return false;
    }
  
    // Split the email into two parts: the local part and the domain part.
    const [localPart, domainPart] = email.split('@');
  
    // Check if the local part is valid.
    const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!localPartRegex.test(localPart)) {
      return false;
    }
  
    // Check if the domain part is valid.
    const domainPartRegex = /^[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!domainPartRegex.test(domainPart)) {
      return false;
    }
  
     // Regular expression for a basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(domainPart)) {
        return false;
      }

    // The email is valid.
    return true;
  }
  

  export {validateEmail}