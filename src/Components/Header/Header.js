// import React, { useState } from "react";
// import "./Header.css";
// import Bars from "../../assets/bars.png";
// import logo from "../../assets/logo.png";
// import {Link} from "react-scroll"
// import { useNavigate } from "react-router-dom";
// const Header = () => {
//   const mobile = window.innerWidth <= 768 ? true : false;
//   const [menuOpened, setMenuOpened] = useState(false);

//   // const token = JSON.parse(localStorage.getItem("Fitness"));

//   // const { data} = token;
//   const navigate=useNavigate()
//   // const fullName = data?`${data.fname} ${data.lname}`:"Login Please";
//   const fullName="priydarshi"
//   return (
//     <div className="header">
//       <img src={logo} alt="" className="logo" />

//       {menuOpened === false && mobile === true ? (
//         <div
//           style={{
//             backgroundColor: "var(--appColor",
//             padding: "0.5rem",
//             borderRadius: "5px",
//           }}
//           onClick={()=>setMenuOpened(true)}
//         >
//           <img
//             src={Bars}
//             alt=""
//             style={{ width: "1.5rem", height: "1.5rem" }}
//           />
//         </div>
//       ) : (
//         <ul className="header-menu">
//          <li> <Link to="home" activeClass='active' spy={true} smooth={true}  onClick={()=>setMenuOpened(false)}>Home</Link></li>
//          <li> <Link to="programs" spy={true} smooth={true}  onClick={()=>setMenuOpened(false)}>Programs</Link></li>
//          <li> <Link to="reasons" spy={true} smooth={true}  onClick={()=>setMenuOpened(false)}>Why us</Link></li>
//          <li> <Link to="plans" spy={true} smooth={true}  onClick={()=>setMenuOpened(false)}>Plans</Link></li>
//          <li> <Link to="testimonials" spy={true} smooth={true}  onClick={()=>setMenuOpened(false)}>Testimonials</Link></li>
//          <li> <Link to="/user_details"   onClick={()=>{setMenuOpened(false); navigate('/user_details')}}>{fullName}</Link></li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import "./Header.css";
import Bars from "../../assets/bars.png";
import logo from "../../assets/logo.png";
import { Link } from "react-scroll";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpened, setMenuOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState("Login"); // Default value

  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("Fitness"));
    if (tokenData && tokenData.expiration > new Date().getTime()) {
      

        const { data} = tokenData;
       
        const fullName = `${data.fname} ${data.lname}`;
      setIsLoggedIn(true);
      setFullName(fullName); 
    }
  }, []);

  return (
    <div className="header">
      <img src={logo} alt="" className="logo" />

      {menuOpened === false && mobile === true ? (
        <div
          style={{
            backgroundColor: "var(--appColor",
            padding: "0.5rem",
            borderRadius: "5px",
          }}
          onClick={() => setMenuOpened(true)}
        >
          <img
            src={Bars}
            alt=""
            style={{ width: "1.5rem", height: "1.5rem" }}
          />
        </div>
      ) : (
        <ul className="header-menu">
          <li>
            <Link
              to="home"
              activeClass="active"
              spy={true}
              smooth={true}
              onClick={() => setMenuOpened(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="programs"
              spy={true}
              smooth={true}
              onClick={() => setMenuOpened(false)}
            >
              Programs
            </Link>
          </li>
          <li>
            <Link
              to="reasons"
              spy={true}
              smooth={true}
              onClick={() => setMenuOpened(false)}
            >
              Why us
            </Link>
          </li>
          <li>
            <Link
              to="plans"
              spy={true}
              smooth={true}
              onClick={() => setMenuOpened(false)}
            >
              Plans
            </Link>
          </li>
          <li>
            <Link
              to="testimonials"
              spy={true}
              smooth={true}
              onClick={() => setMenuOpened(false)}
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              to="/user_details"
              onClick={() => {
                setMenuOpened(false);
                isLoggedIn ? navigate("/user_details") : navigate("/login");
              }}
            >
              {isLoggedIn ? fullName : "Login"}
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
