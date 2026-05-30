import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {
    let navigate = useNavigate();
    let UserData = JSON.parse(localStorage.getItem('userData'))
    console.log(UserData)

    let handlelogout = ()=>{
        localStorage.removeItem('userData')
        setTimeout(()=>{
            navigate('/')
        },3000)
    }
    return (
        <nav className="navContainer">
            <aside className="logo">
                <img src="https://tse1.mm.bing.net/th/id/OIP.UTtSQhXGV4AT27EHPEUzVQHaEJ?w=800&h=448&rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </aside>
            <aside className="menu">
                <NavLink to='/'>HomePage</NavLink>
                <NavLink to='/transcation'>Transaction</NavLink>
                <NavLink to='/loans'>Loans</NavLink>
                <NavLink to='/accounts'>Accounts</NavLink>
                <NavLink to='/deposits'>Deposits</NavLink>
                {
                    UserData ? (
                        <div className="userData">
                            <span><b><a style={{color :"yellow"}}> Hai, {UserData.username}</a></b></span>
                            <button onClick={handlelogout}>Logout</button>
                        </div>
                    ) : (
                        <>
                            <NavLink to='/login'>Login</NavLink>
                            <NavLink to='/register'>Register</NavLink>
                        </>

                    )

                }
            </aside>
        </nav>
    )
}

export default Navbar
