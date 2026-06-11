import React, { useEffect, useState } from 'react'
import api from '../utils/api'

const RATES = { Personal: 12, Home: 7.5, Car: 9, Education: 6, Business: 14 }

const calcEMI = (principal, rate, months) => {
  if (!principal || !rate || !months) return 0
  const r = rate / 12 / 100
  return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1))
}

const statusClass = (s) =>
  s === 'Approved' ? 'badge approved' : s === 'Rejected' ? 'badge rejected' : s === 'Closed' ? 'badge closed' : 'badge pending'

const Loans = () => {
  const [loans, setLoans] = useState([])
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ accountId: '', loanType: 'Personal', amount: '', tenure: '', purpose: '' })
  const [msg, setMsg] = useState({ text: '', type: '' })

  const fetchLoans = async () => {
    try { const res = await api.get('/loans'); setLoans(res.data) }
    catch { setLoans([]) }
  }

  useEffect(() => { fetchLoans() }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const rate = RATES[form.loanType] || 12
  const emi = calcEMI(Number(form.amount), rate, Number(form.tenure))
  const totalPayable = emi * Number(form.tenure)
  const totalInterest = totalPayable - Number(form.amount)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const principal = Number(form.amount)
    const months = Number(form.tenure)
    const monthlyEMI = calcEMI(principal, rate, months)
    await api.post('/loans', {
      ...form, amount: principal, tenure: months,
      interestRate: rate, emi: monthlyEMI,
      remainingBalance: principal, paidEMIs: 0,
      status: 'Pending', date: new Date().toLocaleDateString()
    })
    setMsg({ text: 'Loan application submitted! Awaiting approval.', type: 'success' })
    setForm({ accountId: '', loanType: 'Personal', amount: '', tenure: '', purpose: '' })
    setShowForm(false)
    fetchLoans()
  }

  const handleApprove = async (loan) => {
    await api.patch(`/loans/${loan.id}`, { status: 'Approved' })
    setMsg({ text: `Loan #${loan.id} approved.`, type: 'success' })
    fetchLoans()
  }

  const handleReject = async (loan) => {
    await api.patch(`/loans/${loan.id}`, { status: 'Rejected' })
    setMsg({ text: `Loan #${loan.id} rejected.`, type: 'error' })
    fetchLoans()
  }

  const handleRepay = async (loan) => {
    const newBalance = Math.max(0, loan.remainingBalance - loan.emi)
    const newPaid = (loan.paidEMIs || 0) + 1
    const newStatus = newBalance === 0 ? 'Closed' : 'Approved'
    await api.patch(`/loans/${loan.id}`, { remainingBalance: newBalance, paidEMIs: newPaid, status: newStatus })
    await api.post('/transaction', {
      accountId: loan.accountId, accountName: loan.accountId,
      amount: loan.emi, description: `EMI Repayment - Loan #${loan.id}`,
      type: 'Loan Repayment', date: new Date().toLocaleString()
    })
    setMsg({ text: newBalance === 0 ? `Loan #${loan.id} fully repaid & closed!` : `EMI of $${loan.emi} paid. Remaining: $${newBalance}`, type: 'success' })
    fetchLoans()
  }

  const filtered = filter === 'All' ? loans : loans.filter(l => l.status === filter)

  const totalBorrowed = loans.filter(l => l.status !== 'Rejected').reduce((s, l) => s + l.amount, 0)
  const activeLoans = loans.filter(l => l.status === 'Approved')
  const nextEMI = activeLoans.length > 0 ? activeLoans[0].emi : 0

  return (
    <div className="loans-page">

      {/* Header */}
      <div className="loans-header">
        <div>
          <h1>Loan Management</h1>
          <p>Apply, track and manage all your loans in one place</p>
        </div>
        <button className="loans-apply-btn" onClick={() => { setShowForm(!showForm); setMsg({ text: '', type: '' }) }}>
          {showForm ? '✕ Cancel' : '+ Apply for Loan'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="loan-summary-cards">
        <div className="loan-summary-card blue">
          <span className="summary-icon">📋</span>
          <div>
            <p>Total Applications</p>
            <h3>{loans.length}</h3>
          </div>
        </div>
        <div className="loan-summary-card green">
          <span className="summary-icon">✅</span>
          <div>
            <p>Active Loans</p>
            <h3>{activeLoans.length}</h3>
          </div>
        </div>
        <div className="loan-summary-card purple">
          <span className="summary-icon">💰</span>
          <div>
            <p>Total Borrowed</p>
            <h3>${totalBorrowed.toLocaleString()}</h3>
          </div>
        </div>
        <div className="loan-summary-card orange">
          <span className="summary-icon">📅</span>
          <div>
            <p>Next EMI Due</p>
            <h3>{nextEMI ? `$${nextEMI}` : 'N/A'}</h3>
          </div>
        </div>
      </div>

      {/* Message */}
      {msg.text && (
        <div className={`loan-alert ${msg.type}`}>
          {msg.type === 'success' ? '✅' : '❌'} {msg.text}
          <button onClick={() => setMsg({ text: '', type: '' })}>✕</button>
        </div>
      )}

      {/* Apply Form */}
      {showForm && (
        <div className="loan-form-wrapper">
          <div className="loan-form-card">
            <h2>📝 New Loan Application</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Account ID</label>
                  <input name="accountId" value={form.accountId} onChange={handleChange} placeholder="Enter your account ID" required />
                </div>
                <div className="form-group">
                  <label>Loan Type</label>
                  <select name="loanType" value={form.loanType} onChange={handleChange}>
                    {Object.keys(RATES).map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Loan Amount ($)</label>
                  <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="e.g. 50000" min="1" required />
                </div>
                <div className="form-group">
                  <label>Tenure (Months)</label>
                  <input name="tenure" type="number" value={form.tenure} onChange={handleChange} placeholder="e.g. 24" min="1" required />
                </div>
              </div>
              <div className="form-group">
                <label>Purpose</label>
                <input name="purpose" value={form.purpose} onChange={handleChange} placeholder="Brief purpose of this loan" required />
              </div>

              {/* EMI Preview */}
              {form.amount && form.tenure && (
                <div className="emi-preview">
                  <h4>📊 EMI Breakdown</h4>
                  <div className="emi-grid">
                    <div><span>Interest Rate</span><strong>{rate}% p.a.</strong></div>
                    <div><span>Monthly EMI</span><strong>${emi.toLocaleString()}</strong></div>
                    <div><span>Total Interest</span><strong>${totalInterest.toLocaleString()}</strong></div>
                    <div><span>Total Payable</span><strong>${totalPayable.toLocaleString()}</strong></div>
                  </div>
                </div>
              )}

              <button type="submit" className="submit-loan-btn">Submit Application</button>
            </form>
          </div>
        </div>
      )}

      {/* Filter + Table */}
      <div className="loans-table-section">
        <div className="loans-table-header">
          <h2>Loan Applications</h2>
          <div className="filter-tabs">
            {['All', 'Pending', 'Approved', 'Rejected', 'Closed'].map(f => (
              <button key={f} className={`filter-tab ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
        </div>

        <div className="loans-table-wrapper">
          <table className="loans-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Account ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Rate</th>
                <th>EMI/mo</th>
                <th>Tenure</th>
                <th>Remaining</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="12" className="no-data">No loan records found.</td></tr>
              ) : (
                filtered.map((loan, i) => (
                  <tr key={loan.id}>
                    <td>{i + 1}</td>
                    <td>{loan.accountId}</td>
                    <td><span className="loan-type-badge">{loan.loanType}</span></td>
                    <td>${loan.amount?.toLocaleString()}</td>
                    <td>{loan.interestRate ? `${loan.interestRate}%` : 'N/A'}</td>
                    <td>{loan.emi ? `$${loan.emi.toLocaleString()}` : 'N/A'}</td>
                    <td>{loan.tenure ? `${loan.tenure} mo` : 'N/A'}</td>
                    <td>
                      <div className="repay-progress">
                        <span>{loan.remainingBalance != null ? `$${loan.remainingBalance.toLocaleString()}` : 'N/A'}</span>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: loan.remainingBalance != null ? `${Math.max(0, 100 - (loan.remainingBalance / loan.amount) * 100)}%` : '0%' }} />
                        </div>
                      </div>
                    </td>
                    <td>{loan.purpose}</td>
                    <td><span className={statusClass(loan.status)}>{loan.status}</span></td>
                    <td>{loan.date}</td>
                    <td>
                      <div className="action-btns">
                        {loan.status === 'Pending' && (
                          <>
                            <button className="act-btn approve" onClick={() => handleApprove(loan)}>Approve</button>
                            <button className="act-btn reject" onClick={() => handleReject(loan)}>Reject</button>
                          </>
                        )}
                        {loan.status === 'Approved' && (
                          <button className="act-btn repay" onClick={() => handleRepay(loan)}>Pay EMI</button>
                        )}
                        {(loan.status === 'Closed' || loan.status === 'Rejected') && (
                          <span style={{ color: '#aaa', fontSize: '13px' }}>—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Loans
