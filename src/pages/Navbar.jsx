import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = () => {
  return (
   <nav className="navContainer">
    <aside className="logo">
        <img src="https://tse1.mm.bing.net/th/id/OIP.UTtSQhXGV4AT27EHPEUzVQHaEJ?w=800&h=448&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
    </aside>
    <aside className="menu">
        <NavLink to='/'>HomePage</NavLink>
        <NavLink to='/transcation'>Transaction</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/loans'>Loans</NavLink>
        <NavLink to='/accounts'>Accounts</NavLink>
        <NavLink to='/deposits'>Deposits</NavLink>
    </aside>
   </nav>
  )
}

export default Navbar
