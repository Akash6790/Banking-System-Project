import React, { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const AccountCard = ({ acc }) => {
  console.log(acc.accName)
  let [type, setType] = useState('');

  let [formData, setFromData] = useState({
    amount: "",
    description: "",
    accountNo: "",
    receiverName: ""
  })
  let handlChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value })
  }
  let handleDeposit = (e) => {
    e.preventDefault();
    //update balance
    let updateBalance = Number(acc.InitialBalance)+Number(formData.amount);
    
    //update balance in db
    axios.patch(`http://localhost:3000/Accounts/${acc.id}`,{
      InitialBalance: updateBalance
    })
    //creating an deposite transaction 
    axios.post(`http://localhost:3000/transaction`,{
      accouuntId : acc.id,
      accountName :acc.accName,
      amount:formData.amount,
      description : formData.description,
      type : "Deposit",
      date : new Date().toLocaleString()
    })
    toast.success("Deposit Sucessfully ");
    setTimeout(()=>{
      window.location.reload();
    },2000)
  }
  let handleWithdraw = (e) => {
    e.preventDefault();
    //update balance
    let updateBalance = Number(acc.InitialBalance)-Number(formData.amount);
    
    //update balance in db
    axios.patch(`http://localhost:3000/Accounts/${acc.id}`,{
      InitialBalance: updateBalance
    })
    //creating an deposite transaction 
    axios.post(`http://localhost:3000/transaction`,{
      accouuntId : acc.id,
      accountName :acc.accName,
      amount:formData.amount,
      description : formData.description,
      type : "withdraw",
      date : new Date().toLocaleString()
    })
    toast.success("Withdraw Sucessfully ");
    setTimeout(()=>{
      window.location.reload();
    },2000)
  }
  return (
    <>
      <div className="account-card">
        <h2>Account Name : {acc.accName}</h2>
        <p>Account Type : {acc.accType}</p>
        <h3>Balance : $ {acc.InitialBalance}/-</h3>
        <div className="card-buttons">
          <button onClick={() => { setType('deposit') }}>Deposit</button>
          <button onClick={() => { setType('withdraw') }}>Withdraw</button>
          <button onClick={() => { setType('transfer') }}>Transfer</button>
          <button onClick={() => { setType('delete') }}>Delete Account</button>
        </div>
      </div>
       
      {
        type === 'transfer' && (
          <>
            <input type="number" name='amount' onChange={handlChange} placeholder='Enter amount' />
            <input type="text" name='description' onChange={handlChange} placeholder='Enter description' />
            <input type="number" name='accountNo' onChange={handlChange} placeholder='Enter accountNo' />
            <input type="text" name='receiverName' onChange={handlChange} placeholder='Enter receiverName' />
            <button>Confirm Transfer</button>
          </>
        )
      }
      {
        type === 'deposit' && (
          <>
            <input type="number" name='amount' onChange={handlChange} placeholder='Enter amount' />
            <input type="text" name='description' onChange={handlChange} placeholder='Enter description' />
            <button onClick={handleDeposit}>Confirm Deposit</button>
          </>
        )
      }
      {
        type === 'withdraw' && (
          <>
            <input type="number" name='amount' onChange={handlChange} placeholder='Enter amount' />
            <input type="text" name='description' onChange={handlChange} placeholder='Enter description' />
            <button onClick={handleWithdraw}>Confirm Withdraw</button>
          </>
        )
      }
      {
        type === 'delete' && (
          <>
          <button>Confirm Delete</button>
          </>
        )
      }
    </>
  )
}

export default AccountCard
