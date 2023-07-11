import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminRoute = ({Component}) => {
    
    const navigate = useNavigate();

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if(!userInfo) {
            navigate("/login");
        }
        else if (userInfo.user.name !== "admin") {
            navigate("/")
        }
    });
    
  return (
    <div>
        <Component />
    </div>
  )
}