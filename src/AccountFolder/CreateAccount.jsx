import React, { useState } from 'react'
import axios from 'axios';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    let navigate = useNavigate();
    let [formdata, setformData] = useState({
        accName: "",
        accType: "Savings",
        InitialBalance: ""
    });

    let handleChange = (e) => {
        setformData({ ...formdata, [e.target.name]: e.target.value })
    }
    let handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3000/Accounts`, { ...formdata, InitialBalance: parseFloat(formdata.InitialBalance) })
            .then((res) => {
                console.log(res.data);
                toast.success("Account Created sucessfully ")
                setformData({
                    accName: "",
                    accType: "Savings",
                    InitialBalance: ""
                })
                setTimeout(()=>{
                    navigate('/accounts')
                },3000)
            }).catch((err) => {
                toast.error("Something went Wrong")
            })
    }
    return (
        <section className="create-account">
            <section className="account-header">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="accName">Enter the Account Name :</label>
                    <input type="text" id='accName' onChange={handleChange} name='accName' placeholder='Enter the Account Name' />
                    {/* <br /><br /> */}
                    <label htmlFor="accType">Select Account Type  :</label>
                    <select onChange={handleChange} name="accType" id="accType">
                        <option value="Savings">Savings</option>
                        <option value="Credit">Credit</option>
                        <option value="Current">Current</option>
                    </select>
                    {/* <br /><br /> */}
                    <label htmlFor="InitialBalance">Intial Balance :</label>
                    <input type="number" onChange={handleChange} id='InitialBalance' name='InitialBalance' placeholder='Enter the Initial Balance' />
                    {/* <br /><br /> */}
                    <button type='submit'>Create Account</button>
                    <button type='button'>Cancle</button>
                </form>
            </section>
        </section>
    )
}

export default CreateAccount
