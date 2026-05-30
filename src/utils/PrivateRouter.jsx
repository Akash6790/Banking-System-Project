import React from "react"
import { Navigate } from "react-router-dom"

const PrivateRouter = ({children})=>{
    let userData = JSON.parse(localStorage.getItem('userData'))
    return(
        userData ? children :<Navigate to='/login' />
    )
}

export default PrivateRouter;