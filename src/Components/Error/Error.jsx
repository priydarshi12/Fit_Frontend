import React, { useEffect } from "react";
import "./Error.css";
import { Link } from "react-router-dom";

const Error = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const eyes = document.querySelectorAll('.eye');
      eyes.forEach((eye) => {
        const x = eye.offsetLeft + eye.offsetWidth / 2;
        const y = eye.offsetTop + eye.offsetHeight / 2;
        const rad = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = (rad * (180 / Math.PI) * -1) + 180;
        eye.style.transform = `rotate(${rot}deg)`;
      });
    };

    document.body.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="error">
      <div>
        <span className='error-num'>4</span>
        <span className='eye'></span>
        <span className='eye'></span>
      </div>
      <p className='sub-text'>
        Oh eyeballs! Something went wrong. We're <i>looking</i> to see what happened.
      </p>
      <Link to='/'>Go back</Link>
    </div>
  );
};

export default Error;
