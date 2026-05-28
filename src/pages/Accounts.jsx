import React, { useEffect, useState } from 'react'
import {NavLink, Outlet, useLocation} from 'react-router-dom'
import axios from 'axios'
import AccountCard from '../AccountFolder/AccountCard'

const Accounts = () => {

  let [accounts, setaccounts]= useState([])

  let location = useLocation();

  useEffect(()=>{
    axios.get(`http://localhost:3000/Accounts`)
    .then((res)=>{
      // console.log(res.data)
      setaccounts(res.data);
    })
  }, [])
  return (
    <div>
      <section className="container">
        {
          location.pathname != "/accounts/CreateAccount"&&(
            <>
            <aside className="create-acc-btn">
          <button> <NavLink to='/accounts/CreateAccount'>Create Account</NavLink></button> 
         </aside>
         <aside className="account-cards">
          {
            accounts.map((acc)=>{
              // console.log(acc)
              return(
                <AccountCard  acc={acc}/>
              )
            })
          }
         </aside></>
          )
        }
         
         <Outlet/>
      </section>
    </div>
  )
}

export default Accounts
