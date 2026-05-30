import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Layout from './Layout';
import HomePage from './pages/HomePage'
import Accounts from './pages/Accounts';
import Transaction from './pages/Transaction';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Deposit from './pages/Deposit';
import Loans from './pages/Loans'
import CreateAccount from './AccountFolder/CreateAccount';
import PrivateRouter from './utils/PrivateRouter';

const App = () => {
    let router = createBrowserRouter([
        {
            path :'/',
            element :<Layout/>,
            children : [
                {
                    path :'/',
                    element : <HomePage/>,
                },
                {
                    path : '/accounts',
                    element : (
                        <PrivateRouter>
                            <Accounts/>
                        </PrivateRouter>
                    ),
                    children :[{
                            path:'/accounts/CreateAccount',
                            element:<CreateAccount/>
                    }
                        
                    ]
                },
                {
                    path :'/deposits',
                    element :(
                        <PrivateRouter>
                            <Deposit/>
                        </PrivateRouter>
                    )
                },
                {
                    path : '/register',
                    element : <Register/>
                },
                {
                    path : '/login',
                    element :<Login/>
                },
                {
                    path :'/transcation',
                    element :(
                        <PrivateRouter>
                            <Transaction/>
                        </PrivateRouter>
                    )
                },
                {
                    path : '/loans',
                    element : <PrivateRouter>
                        <Loans/>
                    </PrivateRouter>
                }
            ]
        }
    ])
  return (
    <>
        {/* <ToastContainer position="top-right" autoClose={3000} /> */}
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer/>
    </>
   
  )
}

export default App
