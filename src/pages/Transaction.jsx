import React, { useEffect, useState } from 'react'
import axios from 'axios'
import api from '../utils/api'

const Transaction = () => {

  let [transaction, settransactions] = useState([])

  let transcations =async () => {
    let transaction_res = await api.get(`/transaction`)
    console.log(transaction_res)

    settransactions(transaction_res.data)
  }

  useEffect(()=>{
      transcations()
  },[])
  
  
  return (
    <>
      <div className="top-bar">
        <h1>Transaction History</h1>
        <select >
          <option value="All">All</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>
   
    <section className="transactions-container">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Account ID</th>
            <th>Account Name</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {
            transaction.map((item)=>{
              return(
                <tr >
                    <td>{item.id}</td>
                    <td>{item.accountId}</td>
                    <td>{item.accountName}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td>{item.type}</td>
                    <td>{item.date}</td>
                </tr>
              )
            })
          } 
        </tbody>
      </table>
    </section>
     </>
  )
}

export default Transaction
