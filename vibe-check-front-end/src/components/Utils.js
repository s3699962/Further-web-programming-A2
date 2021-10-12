
/** Common constants like wording and date formats used in other components */

export const formattedDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options)
};

//regex for validation
export const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const namePattern = /^([a-zA-Z ]){2,30}$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})/;

export const userInfoErrorMessages = {
  nameFormatInvalid     : "Invalid name. It should contain letters only.",
  emailFormatInvalid    : "The email format is incorrect",
  emailDuplicated       : "Email is already registered.",
  passwordFormatInvalid : "Invalid Password. It should be a mix of uppercase, lowercase characters, numbers and punctuation",
  loginErrorMessage     : "Email and / or password invalid, please try again."
};

export const serverErrorMessage = "This service is unavailable. Please try again later.";
