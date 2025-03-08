import React from 'react'
import InputLabelComponent from './InputLabelComponent';
import FormButtonComponent from './FormButtonComponent';
import AlreadyOptionComponent from './AlreadyOptionComponent';
import {SignUpSignInValidator} from '../scripts/Validator.js';

const onSignInButtonClicked = () => {
  const email = document.getElementById('idSignInEmail').value;
  const password = document.getElementById('idSignInPassword').value;
  // alert(document.getElementById('idSignInEmail').value);
  const validator = new SignUpSignInValidator("", email, password, "");
  const validateObj = validator.validateSignIn();
  if (!validateObj.status) {
    alert(validateObj.msg);
  } else {

  }
}

const SignIn = () => {
  return (
      <div className="container">

    <div className="row justify-content-center">
      <div className="col-md-3 border-primary bg-dark rounded p-4">
        <h2 className="text-center mt-5 text-white">Sign In</h2>
        <form>
          <InputLabelComponent
            label = "Email address"
            type = "email"
            id="idSignInEmail"
          />
          <InputLabelComponent
            label = "Password"
            type = "password"
            id="idSignInPassword"
          />
          <br/>
          <FormButtonComponent
            type="button"
            classes="btn btn-primary btn-block text-white"
            displayText='Sign In'
            onClickCallback={onSignInButtonClicked}
          />
        </form>
        <br/>
        <AlreadyOptionComponent
          classes="text-center mt-3 text-white"
          displayText1="Don't have an account?"
          displayText2="Sign Up"
          toPage="/signup"
        />
      </div>
    </div>
</div>
  )
}

export default SignIn