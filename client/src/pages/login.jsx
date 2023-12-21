import "./style.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const backend_url = "http://localhost:3000/";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [successMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/login`,
        { ...inputValue },
        { withCredentials: true }
      );
      const { status, data } = response;

      if (status === 200) {
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("role", data.user.role);
        setSucessMessage(data.message);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
      <div className="dashboard-login">
        <div className="overlap-wrapper">
          <div className="overlap">
            <div className="BG">
              <div className="overlap-group">
                <div className="ellipse" />
                <div className="div" />
                <div className="ellipse-2" />
              </div>
              <div className="vector" alt="Vector" src="vector.svg" />
            </div>
            <div className="form">
              <div className="username">
                <div className="overlap-group-2">
                  <div className="text-wrapper">USERNAME</div>
                  <img className="img" alt="User" src="user.svg" />
                </div>
              </div>
              <div className="password">
                <div className="overlap-group-2">
                  <div className="text-wrapper">PASSWORD</div>
                  <img className="img" alt="Lock" src="lock.svg" />
                </div>
              </div>
              <button className="login-btn">
                <div className="login-wrapper">
                  <div className="login">LOGIN</div>
                </div>
              </button>
            </div>
    
          </div>
        </div>
      </div>
    );
  };

export default Login;
