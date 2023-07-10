import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:  JSON.stringify({
                email,
                password
            })
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log("data", data);
            if(data.message || data.errors) {
                alert("Invalid credentials.");
            } 
            else {
                localStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/");
            }
            
        })
    }
    
    

  return (
    <div>
        <form onSubmit={handleLogin}>
            <label>email id</label>
            <input type='text' onChange={(e)=> setEmail(e.target.value)} />
            <label>password</label>
            <input type='password' onChange={(e)=> setPassword(e.target.value)} />
            <button>Login</button>
            <br />
            <Link to={"/register"}>Go To Register Page</Link>
        </form>
    </div>
  )
}
