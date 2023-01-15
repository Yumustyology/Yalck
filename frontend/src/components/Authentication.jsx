import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const Authentication = () => {
  const [isSignupTab, setIsSignupTab] = useState(true);
  const cookies = new Cookies();
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profileImageURL: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert('you have successfully submitted')
    const { fullName, username, password, phone, profileImageURL } = form;

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(
      `http://localhost:3000/api/auth/${isSignupTab ? "signup" : "signin"}`,
      {
        fullName,
        username,
        password,
        phone,
        profileImageURL,
      }
    );
    cookies.set("yalck-token", token);
    cookies.set("fullname", fullName);
    cookies.set("username", username);
    cookies.set("userId", userId);
    if (isSignupTab) {
      cookies.set("phone", phone);
      cookies.set("profileImageURL", profileImageURL);
      cookies.set("hashedPassword", hashedPassword);
    }
    window.location.reload();
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignupTab ? "Sign Up" : "Sign In"}</p>
          <form onSubmit={handleSubmit}>
            {isSignupTab && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder="Full  Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                id="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignupTab && (
              <>
                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    name="phone"
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="auth__form-container_fields-content_input">
                  <label htmlFor="profile-img">Profile Image URL</label>
                  <input
                    name="profileImageURL"
                    id="profile-img"
                    type="tel"
                    placeholder="Profile Image URL"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignupTab && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="re-password">Confirm Password</label>
                <input
                  name="re-password"
                  id="re-password"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {/* submit button */}
            <div className="auth__form-container_fields-content_button">
              <button>{isSignupTab ? "Sign Up" : "Sign In"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
            <p>
              {isSignupTab
                ? "Already have an account ?"
                : "Donn't have an account ?"}
              <span
                className="cursor-pointer underline"
                onClick={() => setIsSignupTab(!isSignupTab)}
              >
                {isSignupTab ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
};

export default Authentication;
