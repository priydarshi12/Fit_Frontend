import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { registerRoute } from "../../Utils/ApiRoutes";
const Register = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };
  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    height:0,
    weight:0
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    const regExp =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    e.preventDefault();
  
    if (info.fname === "")
      toast.error("Please enter your first name", toastOptions);
    else if (!regExp.test(info.password))
      toast.error("Please create a strong password", toastOptions);
    else if (info.password !== info.confirmPassword)
      toast.error("Password and confirm password does not match", toastOptions);
    else if(info.height<=0)
    toast.error("Please enter correct height", toastOptions);
    else if(info.weight<=0)
    toast.error("Please enter correct weight", toastOptions);
    else {
      toast.info("Please wait for a while", toastOptions);
      try {
        const { data } = await axios.post(
          registerRoute,
          info
        );
        if (data.status === true) {
          setTimeout(() => {
            toast.success(data.msg, toastOptions);
          }, 2000);
          setTimeout(() => {
            navigate("/");
          }, 5000);
        }
        else{
          toast.error(data.msg, toastOptions);
        }
      } catch (e) {
        toast.error(e.msg, toastOptions);
      }
    }
  };
  return (
    <div className="register">
      <ToastContainer />
      <div className="header-l">
        <img src={logo} alt="" className="logo" />
      </div>
      <form className="form " onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <div className="flex ">
          <div className="border">
            <input
              type="text"
              name="fname"
              className="input"
              placeholder="First Name"
              value={info.fname.toLowerCase()}
              onChange={handleChange}
            />
          </div>
          <div className="border">
            <input
              type="text"
              name="lname"
              className="input"
              placeholder="Last Name"
              value={info.lname.toLowerCase()}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border">
          <input
            type="email"
            name="email"
            className="input1"
            placeholder="E-Mail"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex ">
          <div className="border">
            <input
              type="number"
              name="height"
              className="input"
              placeholder="Height *(in cm)"
              value={info.height}
              onChange={handleChange}
            />
          </div>
          <div className="border">
            <input
              type="number"
              name="weight"
              className="input"
              placeholder="Weight *(in kg)"
              value={info.weight}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border">
          <input
            type="password"
            name="password"
            className="input1"
            placeholder="Password"
            value={info.password}
            onChange={handleChange}
          />
        </div>
        <div className="border">
          <input
            type="password"
            name="confirmPassword"
            className="input1"
            placeholder="Confirm Password"
            value={info.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="border">
          <button className="submit">Submit</button>
        </div>
        <p className="signin">
          {" "}
          Already have an account ?{" "}
          <Link to="/login">
            <span className="link">Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
