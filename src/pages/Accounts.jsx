import React, { useEffect, useState } from 'react'
import {NavLink, Outlet, useLocation} from 'react-router-dom'
import AccountCard from '../AccountFolder/AccountCard'
import api from '../utils/api'
import '../pages/Accounts.css'

const Accounts = () => {

  let [accounts, setaccounts]= useState([])

  let location = useLocation();

  useEffect(()=>{
    api.get(`/Accounts`)
    .then((res)=>{
      // console.log(res.data)
      setaccounts(res.data);
    })
  }, [])
  return (
    <div className="accounts-page">
      <section className="container">
        {
          location.pathname != "/accounts/CreateAccount" && (
            <>
              <div className="accounts-hero">
                <div className="accounts-hero-content">
                  <div>
                    <h1>My Accounts</h1>
                    <p>Manage all your bank accounts in one place</p>
                  </div>
                  <aside className="create-acc-btn">
                    <button><NavLink to='/accounts/CreateAccount'>+ Create Account</NavLink></button>
                  </aside>
                </div>
              </div>
              <aside className="account-cards">
                {
                  accounts.map((acc) => (
                    <AccountCard key={acc.id} acc={acc} />
                  ))
                }
              </aside>
            </>
          )
        }
        <Outlet />
      </section>
    </div>
  )
}

export default Accounts
