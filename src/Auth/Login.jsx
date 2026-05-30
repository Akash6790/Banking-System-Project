import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {
  let navigate = useNavigate();
  let [email, setemail] = useState('');
  let [password, setpassword] = useState('')

  let handleEmail = (e) => {
    setemail(e.target.value)
  }
  let handlePassword = (e) => {
    setpassword(e.target.value)
  }
  let handlesubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:3000/register`)
    .then((res)=>{
      console.log(res.data)

      let user = res.data.find((val)=>{
        return val.email === email && val.password === password;
      })
      if(user){
        toast.success("Login sucessfull")
        localStorage.setItem('userData',JSON.stringify(user))
        setTimeout(()=>{
          navigate('/')
        }, 3000)
      }
      else {
        toast.error("invalid Credential") 
      }

    })
  }
  return (
    <form onSubmit={handlesubmit}>
      <fieldset>
        <legend>Login</legend>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleEmail} name='email' id='email' placeholder='Enter the email' required />
        {/* <br /><br /> */}
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handlePassword} name='password' id='password' placeholder='Enter the password' required />
        {/* <br /><br /> */}
        <button type='submit'>Submit</button>
        <button type='button'>Cancle</button>
      </fieldset>
    </form>
  )
}

export default Login
