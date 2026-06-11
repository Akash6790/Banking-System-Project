import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../utils/api';
import '../pages/Accounts.css'

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
    api.patch(`/Accounts/${acc.id}`,{
      InitialBalance: updateBalance
    })
    //creating an deposite transaction 
    api.post(`/transaction`,{
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
    api.patch(`/Accounts/${acc.id}`,{
      InitialBalance: updateBalance
    })
    //creating an deposite transaction 
    api.post(`/transaction`,{
      accountId : acc.id,
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
  let handleTransfer =async(e)=>{
      let senderBalance = Number(acc.InitialBalance)-Number(formData.amount);

      await api.patch(`/Accounts/${acc.id}`,{
        InitialBalance : senderBalance 
      })

      let receiverAccount = await api.get(`/Accounts/${formData.accountNo}`)

      let receiverBalance = Number(receiverAccount.data.InitialBalance)+ Number(formData.amount)

      await api.patch(`/Accounts/${formData.accountNo}`,{
        InitialBalance : receiverBalance
      })

      await api.post(`/transaction`,{
        fromAccountNo : acc.id ,
        fromAccountName : acc.accName,

        toAccountNo : formData.accountNo,
        toAccountName : formData.receiverName,
        amount : formData.amount,
        type : "Transfer",
        date : new Date().toLocaleString(),

      })
      toast.success("Transfer Sucessfully")

      setTimeout(()=>{
          window.location.reload()
      },2000)

     
  }
  let handleDelete = async ()=>{
    // let  accDelete = window.confirm("Are you sure want to delete account")

    let transactions = await api.get(`/transaction`)
    console.log(transactions)

    let relatedTransactions = transactions.data.filter((items)=>{
      return items.accountId === acc.id || items.fromAccountNo ===acc.id
    })
    console.log(relatedTransactions)

    for(let item of relatedTransactions){
        await api.delete(`/transaction/${item.id}`)
    }

    await api.delete(`/Accounts/${acc.id}`)

    toast.success('Account delete successfully ')

    setTimeout(()=>{
      window.location.reload();
    },3000)
  }
  return (
    <>
      <div className="account-card">
        <h2>Account Name : {acc.accName}</h2>
        <h3>Account Number : {acc.id}</h3>
        <p>Account Type : {acc.accType}</p>
        <h3>Balance : $ {acc.InitialBalance}/-</h3>
        <div className="card-buttons">
          <button onClick={() => { setType('deposit') }}>↓ Deposit</button>
          <button onClick={() => { setType('withdraw') }}>↑ Withdraw</button>
          <button onClick={() => { setType('transfer') }}>⇄ Transfer</button>
          <button onClick={() => { setType('delete') }}>✕ Delete</button>
        </div>
        {
        type === 'transfer' && (
          <>
            <input type="number" name='amount' onChange={handlChange} placeholder='Enter amount' />
            <input type="text" name='description' onChange={handlChange} placeholder='Enter description' />
            <input type="text" name='accountNo' onChange={handlChange} placeholder='Enter accountNo' />
            <input type="text" name='receiverName' onChange={handlChange} placeholder='Enter receiverName' />
            <button onClick={handleTransfer}>Confirm Transfer</button>
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
            <br />
            <button onClick={handleWithdraw}>Confirm Withdraw</button>
          </>
        )
      }
      {
        type === 'delete' && (
          <>
          <button onClick={handleDelete}>Confirm Delete</button>
          </>
        )
      }
      </div>
       
      
    </>
  )
}

export default AccountCard
