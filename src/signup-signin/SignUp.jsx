import React from 'react'
import "./SignUp.css";
import InputLabelComponent from './InputLabelComponent';
import FormButtonComponent from './FormButtonComponent';
import AlreadyOptionComponent from './AlreadyOptionComponent';
import {SignUpSignInValidator} from '../scripts/Validator.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated } from '../scripts/Auth.js';

const SignUp = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  
  const onSignUpButtonClicked = async () => {
    setButtonDisabled(true);
    const fullName = document.getElementById('idSignUpFullName').value;
    const email = document.getElementById('idSignUpEmail').value;
    const password = document.getElementById('idSignUpPassword').value;
    const confirmPassword = document.getElementById('idSignUpConfirmPassword').value;
    // alert(document.getElementById('idSignUpPassword').value);
    const validator = new SignUpSignInValidator(fullName, email, password, confirmPassword, true);
    const validateObj = validator.validateSignUp();
    if (!validateObj.status) {
      alert(validateObj.msg);
      setButtonDisabled(false);
    } else {
      const url = "http://localhost:5110/api/User/";
      const username = email.split('@')[0];
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add other headers as needed
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            name: fullName
            // Include other data as needed
          }),
        });
        const json = await response.json();
        console.log(json);
        // if (!response.ok) {
        //   alert(json['message']);
        // } else {

        // }
        alert(json['message']);
      } catch (error) {
        console.error(error.message);
      }
    }
    setButtonDisabled(false);
  }

  return (
    <>
    {
      !isAuthenticated() ?
      (<SignUpForm
        onSignUpButtonClicked={onSignUpButtonClicked}
        isButtonDisabled={isButtonDisabled}
        />) :
      (<></>)
    }
    </>
  );
}

const SignUpForm = ({onSignUpButtonClicked, isButtonDisabled}) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-3 border-primary bg-dark rounded p-4">
          <h2 className="text-center mt-5 text-white">Sign Up</h2>
          <form>
            <InputLabelComponent 
              label = "Full Name"
              type = "text"
              id="idSignUpFullName"
            />
            <InputLabelComponent
              label = "Email address"
              type = "email"
              id="idSignUpEmail"
            />
            <InputLabelComponent
              label = "Password"
              type = "password"
              id="idSignUpPassword"
            />
            <InputLabelComponent
              label = "Confirm password"
              type = "password"
              id="idSignUpConfirmPassword"
            />
            <br/>
            <FormButtonComponent
              type="button"
              classes="btn btn-primary btn-block text-white"
              displayText='Sign Up'
              onClickCallback={onSignUpButtonClicked}
              isDisabled={isButtonDisabled}
            />
          </form>
          <br/>
          <AlreadyOptionComponent
            classes="text-center mt-3 text-white"
            displayText1="Already have an account?"
            displayText2="Sign In"
            toPage="/signin"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUp
