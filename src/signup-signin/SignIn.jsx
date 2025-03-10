import React from 'react'
import InputLabelComponent from './InputLabelComponent';
import FormButtonComponent from './FormButtonComponent';
import AlreadyOptionComponent from './AlreadyOptionComponent';
import {SignUpSignInValidator} from '../scripts/Validator.js';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, storeAuthDataAsCookies } from '../scripts/Auth.js';
import { useState, useEffect } from 'react';
import NavBar from '../comps/NavBar.jsx';

const SignIn = () => {
  const navigate = useNavigate();

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const onSignInButtonClicked = async () => {
    setButtonDisabled(true);
    const email = document.getElementById('idSignInEmail').value;
    const password = document.getElementById('idSignInPassword').value;
    // alert(document.getElementById('idSignInEmail').value);
    const validator = new SignUpSignInValidator("", email, password, "");
    const validateObj = validator.validateSignIn();
    if (!validateObj.status) {
      alert(validateObj.msg);
      setButtonDisabled(false);
    } else {
      const url = "http://localhost:5110/api/User/login";
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
            // Include other data as needed
          }),
        });
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          storeAuthDataAsCookies(json);
          navigate('/todo');
        } else {
          alert("Auth failed");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    setButtonDisabled(false);
  }
  return (
    <>
    <NavBar/>
    <br/>
    {
      !isAuthenticated() ?
      (<SignInForm
        onSignInButtonClicked={onSignInButtonClicked}
        isButtonDisabled={isButtonDisabled}
        />) :
        (<></>)
    }
    </>
  )
}

const SignInForm = ({onSignInButtonClicked, isButtonDisabled}) => {
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
              isDisabled={isButtonDisabled}
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