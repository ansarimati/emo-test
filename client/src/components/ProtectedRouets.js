import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRouets = ({Component}) => {
    
    const navigate = useNavigate();

    useEffect(()=>{
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if(!userInfo) {
            navigate("/login");
        }
    });
    
  return (
    <div>
        <Component />
    </div>
  )
}
