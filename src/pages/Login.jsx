import React from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Uselogged } from "../context/LoginContext";
import "../assets/boxicons-2.0.7/css/Login.css";

const Login = () => {
  const history = useHistory();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const loginContext = Uselogged();
  if (loginContext.state.logged != 0) {
    loginContext.dispatch({ type: "logout" });
  }
  console.log(loginContext);

  const signUpUser = () => {
    if (
      emailRef.current.value.length > 2 &&
      passwordRef.current.value.length > 2
    ) {
      const user = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      };
      loginContext.dispatch({ type: "login" });
      console.log(loginContext.state.logged);
      history.push("/");
    } else {
      alert("Username and Password should be greater than 2");
    }
  };
  return (
    <div className="loginPage">
      {/* <div className="loginLogo__Navbar">
        <img
          className="loginLogo"
          src="https://keirjohnson.tv/wp-content/uploads/2021/03/Netflix-Logo.png"
          alt="Netflix Logo"
        />
      </div> */}
      <div className="netflix__login">
        <div className="netflix__loginContainer">
          <h1>Sign In</h1>
          <input
            ref={emailRef}
            placeholder="Email or phone number"
            type="email"
          />
          <input ref={passwordRef} placeholder="Password" type="password" />

          <button onClick={signUpUser}>Sign In</button>
          <div className="rememberMe">
            <p>
              <input type="radio" /> Remember Me
            </p>
            <p>Need Help?</p>
          </div>
          <div className="login__extra">
            <p className="facebook_login">
              {" "}
              <img
                className="facebook__logo"
                src="https://firebasestorage.googleapis.com/v0/b/netflix-clone-basic.appspot.com/o/facebook.png?alt=media&token=b7a349eb-35f5-4712-bfbb-8b369e716da7"
                alt="Facebook Logo"
              />{" "}
              Login with Facebook
            </p>
            <p className="signUp">
              New to Netflix?{" "}
              <a
                href="https://www.netflix.com/in/"
                style={{
                  color: "white",
                  marginLeft: "5px",
                  textDecoration: "none"
                }}
              >
                {" "}
                Sign up now
              </a>
            </p>
            <p className="facebook_login">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a
                href=""
                style={{
                  color: "#3F8BDC",
                  marginLeft: "5px",
                  textDecoration: "none"
                }}
              >
                Learn More
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
