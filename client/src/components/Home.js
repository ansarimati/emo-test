import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div>
      <div>
        <h1>Welcome {userInfo ? userInfo.user.name : ""}</h1>
      </div>
      <div>Status { userInfo ?  userInfo.user.status : "" }</div>
      <button onClick={handleLogout} >logout</button>
    </div>
  )
}
