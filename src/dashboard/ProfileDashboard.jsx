import React from 'react'
import { Container, Row, Col, Card, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { addTodoTaskToBackend, deleteAuthDataAsCookies, deleteUser, fetchUserDetails, isAuthenticated, updateFullname } from '../scripts/Auth';
import InputLabelComponent from '../signup-signin/InputLabelComponent'
import FormButtonComponent from '../signup-signin/FormButtonComponent'
import { useState, useEffect } from 'react';
import { UpdateProfileValidator } from '../scripts/Validator';
import NavBar from '../comps/NavBar';

const ProfileDashboard = () => {
  const navigate = useNavigate();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const onLogoutButtonClicked = () => {
    deleteAuthDataAsCookies();
    navigate("/signin");
  }

  const onUpdateProfileButtonClicked = () => {
    setButtonDisabled(true);
    const fullName = document.getElementById('idUpdateNewName').value;
    const validator = new UpdateProfileValidator(fullName);
    const validateObj = validator.validate();
    if (!validateObj.status) {
      alert(validateObj.msg);
    } else {
      updateFullname(fullName);
    }
    setButtonDisabled(false);
  }

  const onDeleteProfileButtonClicked = async () => {
    setButtonDisabled(true);
    console.log("onDeleteProfileButtonClicked");
    await deleteUser();
    onLogoutButtonClicked();
    setButtonDisabled(false);
  }

  return (
    <>
      <NavBar/>
      <br/>
      {
        isAuthenticated() ?
        (
          <UpdateProfile
          onUpdateProfileButtonClicked={onUpdateProfileButtonClicked}
          isButtonDisabled={isButtonDisabled}
          onDeleteProfileButtonClicked={onDeleteProfileButtonClicked}
          />
        ) :
        (<></>)
      }
    </>
  )
}

const UpdateProfile = ({onUpdateProfileButtonClicked, onDeleteProfileButtonClicked, isButtonDisabled}) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    async function fetchData() {
      const userDetails = await fetchUserDetails();
      setUsername(userDetails['username']);
      setName(userDetails['fullname']);
      setEmail(userDetails['email']);
      setPassword(userDetails['password']);

      // document.getElementById('idUpdateNewName').disabled = document.getElementById('idUpdateNewName').disabled;
    }
    fetchData();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-3 border-primary bg-dark rounded p-4">
          <h2 className="text-center mt-5 text-white">Update Profile</h2>
          <form>
            <InputLabelComponent 
            label = "Full Name"
            type = "text"
            id="idUpdateNewName"
            value={name}
            onChangeHandler={handleNameChange}
            />
            <InputLabelComponent 
            label = "Username"
            type = "text"
            id="idUpdateUsername"
            value={username}
            />
            <InputLabelComponent 
            label = "Email"
            type = "email"
            id="idUpdateEmail"
            value={email}
            />
            <InputLabelComponent 
            label = "Password"
            type = "password"
            id="idUpdatePassword"
            value={password}
            />
            <FormButtonComponent
              type="button"
              classes="btn btn-primary btn-block text-white"
              displayText='Update'
              onClickCallback={onUpdateProfileButtonClicked}
              isDisabled={isButtonDisabled}
            />
            <FormButtonComponent
              type="button"
              classes="m-2 btn btn-danger btn-block text-white"
              displayText='Delete'
              onClickCallback={onDeleteProfileButtonClicked}
              isDisabled={isButtonDisabled}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileDashboard
