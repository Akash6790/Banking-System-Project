import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Register = () => {
  let navigate = useNavigate();
  let [userData , setUserData] = useState({
    username :"",
    email :"",
    password :"",
    phNum :""
  })

  let handlechange =(e)=>{
    setUserData({...userData , [e.target.name]:e.target.value})
  }
   let handleSubmit = (e)=>{
    e.preventDefault();
    
    axios.post(`http://localhost:3000/register`,userData)
    .then((res)=>{
        console.log('Registered:', res.data)
        toast.success("User Registered successfully")
        setUserData({username :"", email :"", password :"",phNum :""})
        setTimeout(()=>{
          navigate('/login')
        },3000)
    })
    .catch((err)=>{
      console.log(err)
      toast.error('user Not registered')
    })
   }
  return (
    <form  onSubmit={handleSubmit}>
        <fieldset>
          <legend>Register</legend>
          <label htmlFor="username">Username</label>
          <input type="text" name='username' id='username' onChange={handlechange} placeholder='Enter the username' required/>
          {/* <br /><br /> */}
          <label htmlFor="email">Email</label>
          <input type="email" name='email' id='email' onChange={handlechange} placeholder='Enter the email' required/>
          {/* <br /><br /> */}
          <label htmlFor="password">Password</label>
          <input type="password" name='password' id='password' onChange={handlechange} placeholder='Enter the password' required/>
          {/* <br /><br /> */}
          <label htmlFor="phNum">phNum</label>
          <input type="tel" maxLength={10} minLength={10} onChange={handlechange} name='phNum' id='phNum' placeholder='Enter the phNum' required />
          {/* <br /><br /> */}
          <button type='submit'>Submit</button>
          <button type='button'>Cancle</button>
        </fieldset>
    </form>
  )
}

export default Register
