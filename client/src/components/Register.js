import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export const Register = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone:"",
    password:"",
    confirm_password:"",
  
  });

  const [profile_pic, setProfile_pic] = useState(null);

  const handleUpload = (e) => {
    setProfile_pic(e.target.files[0]);
  }

  const { name, email, gender, phone, password, confirm_password } = formData;

  const handleChange = (e) => {
    setFormData( { ...formData, [e.target.name]: e.target.value } );
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("prof_pic", profile_pic);
    if(password !== confirm_password) {
      return alert("Password does not match")
    }
    else {
      registerUser() ;
    }
  }

  const registerUser = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("profile_pic", profile_pic);
    formData.append("password", password);
    

    fetch("http://localhost:3001/auth/register", {
      method: "POST",
      body: formData
    })
      .then((res)=> res.json())
      .then((data)=> {
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
    <>
      <div>Register</div>
      <Link to={"/login"}>Go To Login</Link>

      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <label htmlFor='name'>Name </label>
          <input
            type='text'
            name='name'
            id="name"
            placeholder='Name'
            value={ name }
            onChange={ handleChange }
            required
          />

        </div>

        <div>
          <label htmlFor='email'>Email </label>
          <input
            type='email'
            name='email'
            id="email"
            placeholder='Email'
            value={ email }
            onChange={ handleChange }
            required
          />

        </div>

        <div>
          <p>Gender</p>
          <input
            type='radio'
            id="male"
            name="gender"
            value={ "male" }
            onChange={ handleChange }
          />
          <label htmlFor="male">Male </label>

          <input
            type='radio'
            id="female"
            name="gender"
            value={ "female" }
            onChange={ handleChange }
          />
          <label htmlFor="female">Female </label>


        </div>

        <div>
          <label htmlFor='phone'>Phone Number </label>

          <input
            type='number'
            name='phone'
            id="phone"
            placeholder='Phone Number'
            value={ phone }
            onChange={ handleChange }
          />
        </div>

        <div>
          <label htmlFor='profile_pic'>Profile Picture</label>

          <input
            type='file'
            name='profile_pic'
            id="profile_pic"
            onChange={ handleUpload }
          />

        </div>

        <div>
          <label htmlFor='password'>Password </label>

          <input
            type='text'
            name='password'
            id="password"
            placeholder='Password'
            value={ password }
            onChange={ handleChange }
            required
          />
        </div>

        <div>
          <label htmlFor='confirm_password'>Confirm Password </label>

          <input
            type='text'
            name='confirm_password'
            id="confirm_password"
            placeholder='Confirm Password'
            value={ confirm_password }
            onChange={ handleChange }
            required
          />
        </div>

        <button type='submit'>Register</button>
      </form>

    </>
  )
}

