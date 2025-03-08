export class SignUpSignInValidator {
    constructor(fullname, email, password, confirmPassword, isSignUp = false) {
      if (!isSignUp) {
        this.email = email;
        this.password = password;
      } else {
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
      }
    }

    validateSignIn() {
      let obj = this.validateEmail();
      if (!obj.status) return obj;
      obj = this.validatePassword();
      return obj;
    }

    validateSignUp() {
      let obj = this.validateFullname();
      if (!obj.status) return obj;
      obj = this.validateEmail();
      if (!obj.status) return obj;
      obj = this.validatePassword();
      if (!obj.status) return obj;
      obj = this.validateConfirmPassword();
      return obj;
    }
  
    validateFullname() {
      if (this.fullname === '') {
        return {
          status: false,
          msg: "Fullname is required"
        };
      } else if (this.fullname.length > 25) {
        return {
          status: false,
          msg: "Fullname must be between 3 and 25 characters."
        };
      } else if (!(/^[a-zA-Z]+$/.test(this.fullname))) {
        return {
          status: false,
          msg: "Fullname must be contain only alphabets"
        };
      }
      else {
        return {
          status: true,
          msg: ""
        };
      }
    }
  
    validateEmail() {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (this.email === '') {
        return {
          status: false,
          msg: "Email is required."
        };
      } else if (!emailPattern.test(this.email)) {
        return {
          status: false,
          msg: "Please enter a valid email address."
        };
      } else {
        return {
          status: true,
          msg: ""
        };
      }
    }
  
    validatePassword() {
      if (this.password === '') {
        return {
          status: false,
          msg: "Password is required."
        };
      } else if (this.password.length < 4) {
        return {
          status: false,
          msg: "Password must be at least 4 characters."
        };
      } else {
        return {
          status: true,
          msg: ""
        };
      }
    }
  
    validateConfirmPassword() {
      if (this.confirmPassword === '') {
        return {
          status: false,
          msg: "Please confirm your password."
        };
      } else if (this.confirmPassword !== this.password) {
        return {
          status: false,
          msg: "Passwords do not match."
        };
      } else {
        return {
          status: true,
          msg: ""
        };
      }
    }
  }
  
  