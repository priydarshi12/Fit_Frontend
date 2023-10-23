import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";
import axios from "axios";
import { loginRoute } from "../../Utils/ApiRoutes";
const Login = () => {
  const navigate = useNavigate();
  const toastOptions = {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };
  const tokenData = JSON.parse(localStorage.getItem("Fitness"));


  useEffect(() => {
    if (tokenData && tokenData.expiration > new Date().getTime()) {
      // User is already logged in; redirect to the home page
      navigate("/");
    }
  }, []);
  const [info, setInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (info.fname === "")
      toast.error("Please enter your first name", toastOptions);
    else {
      toast.info("Please wait for a while", toastOptions);
      try {
        const { data } = await axios.post(
          loginRoute,
          info
        );
        if (data.status === true) {
          setTimeout(() => {
            toast.success(data.msg, toastOptions);
          }, 2500);
          const expirationTime = new Date().getTime() + 15 * 24 * 60 * 60 * 1000;
          const itemToStore = {
            data: data.toSend,
            expiration: expirationTime,
          };
           localStorage.setItem("Fitness", JSON.stringify(itemToStore));
          setTimeout(() => {
            navigate("/");
          }, 5000);
        } else {
          toast.error(data.msg, toastOptions);
        }
      } catch (e) {
        toast.error(e.msg, toastOptions);
      }
    }
  };
  return (
    <div className="login">
    <ToastContainer/>
      <div className="header-l">
        <img src={logo} alt="" className="logo" />
      </div>
      <form className="form " onSubmit={handleSubmit}>
        <p className="title">Member Login</p>
        <div className="flex ">
          <div className="border">
            <input
              type="text"
              name="fname"
              className="input"
              placeholder="First Name"
              value={info.fname}
              onChange={handleChange}
            />
          </div>
          <div className="border">
            <input
              type="text"
              name="lname"
              className="input"
              placeholder="Last Name"
              value={info.lname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="border">
          <input
            type="email"
            name="email"
            className="input1"
            placeholder="email"
            value={info.email}
            onChange={handleChange}
          />
        </div>
        <div className="border">
          <input
            type="password"
            name="password"
            className="input1"
            placeholder="password"
            value={info.password}
            onChange={handleChange}
          />
        </div>

        <div className="border">
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
        <p className="signin">
          {" "}
          Do not have an account ?{" "}
          <Link to="/register">
            <span className="link">Sign Up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
