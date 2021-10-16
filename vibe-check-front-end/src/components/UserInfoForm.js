import React, {useState} from "react";
import {emailPattern, namePattern, passwordPattern, sanitize, userInfoErrorMessages} from "./Utils";
import {FormInputSection} from "./InputSections";
import {LargeMaxWidthButton} from "./Buttons";
import {findUser} from "../data/repository";

/** The user info form used when signing up and editing.
 * This is a component that is used in 2 different places- SignUp and EditUserForm
 * */

export const UserInfoForm = ({userInfo, handleInputChange, onSubmit, isEdit, onCancel, isDirtied}) => {

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [emailError, setEmailErrors] = useState(null);
  const [nameError, setNameErrors] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const validateEmail = async () => {

    const sanitisedValue = sanitize(userInfo.email);

    const emailIsValid = !userInfo.email || emailPattern.test(sanitisedValue);

    setIsValidEmail(emailIsValid);
    setEmailErrors(emailIsValid ? null : userInfoErrorMessages.emailFormatInvalid);

    //check if the email is duplicated
    if (emailIsValid && await findUser(sanitisedValue) !== null) {
      setIsValidEmail(false);
      setEmailErrors(userInfoErrorMessages.emailDuplicated)
    }
  };

  const validateName = () => {
    const nameIsValid = !userInfo.name || namePattern.test(sanitize(userInfo.name));

    setIsValidName(nameIsValid);
    setNameErrors(nameIsValid ? null : userInfoErrorMessages.nameFormatInvalid);
  };

  const validatePassword = () => {
    const passwordIsValid = !userInfo.password || passwordPattern.test(sanitize(userInfo.password));

    setIsValidPassword(passwordIsValid);
    setPasswordError(passwordIsValid ? null : userInfoErrorMessages.passwordFormatInvalid);
  };

  // disable button until valid info entered
  const submitDisabled = isEdit
      ? !isDirtied || !(isValidEmail && isValidName && isValidPassword)
      : !isDirtied || !(userInfo.name && userInfo.email && userInfo.password && isValidEmail && isValidName && isValidPassword);

  return (
      <div className="form">
        <div>
          <FormInputSection name={"name"} value={userInfo.name} handleInputChange={handleInputChange}
                            validate={validateName} placeHolderText={"Enter your name"} label={"Name"}
                            isValid={isValidName} errorMessage={nameError}
          />

          <FormInputSection name={"email"} value={userInfo.email} handleInputChange={handleInputChange}
                            validate={validateEmail} placeHolderText={"Enter your email address"} label={"Email"}
                            isValid={isValidEmail} errorMessage={emailError}
          />

          <FormInputSection name={"password"} value={userInfo.password} handleInputChange={handleInputChange}
                            validate={validatePassword} placeHolderText={"Enter your password"} label={"Password"}
                            isValid={isValidPassword} errorMessage={passwordError}
          />

          <div className={isEdit ? "formButtons" : "form-group"}>
            {/* Cancel button is only displayed on edit form */}
            {isEdit && <LargeMaxWidthButton name={"cancelButton"} onSubmit={onCancel} disabled={false} value="Cancel"/>}
            <LargeMaxWidthButton
                name={submitDisabled ? "disabledSubmit" : "submitButton"}
                onSubmit={onSubmit}
                disabled={submitDisabled}
                value="Submit"
            />
          </div>
        </div>
      </div>
  )
};
