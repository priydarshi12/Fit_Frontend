import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

const User = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem('Fitness'));
    if (!tokenData || tokenData.expiration < new Date().getTime()) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      User details
    </div>
  );
};

export default User;
