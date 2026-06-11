import React, { useEffect, useState } from 'react'
import api from '../utils/api'
import { toast } from 'react-toastify'

const Deposit = () => {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [activeTab, setActiveTab] = useState('deposit')
  const [selectedAccId, setSelectedAccId] = useState('')
  const [form, setForm] = useState({ amount: '', description: '', accountNo: '', receiverName: '' })
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const [accRes, txRes] = await Promise.all([api.get('/Accounts'), api.get('/transaction')])
    setAccounts(accRes.data)
    setTransactions(txRes.data)
    if (!selectedAccId && accRes.data.length > 0) setSelectedAccId(accRes.data[0].id)
  }

  useEffect(() => { fetchData() }, [])

  const selectedAcc = accounts.find(a => a.id === selectedAccId)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const reset = () => setForm({ amount: '', description: '', accountNo: '', receiverName: '' })

  const handleDeposit = async (e) => {
    e.preventDefault()
    if (!selectedAcc) return
    if (Number(form.amount) <= 0) return toast.error('Enter a valid amount')
    setLoading(true)
    await api.patch(`/Accounts/${selectedAcc.id}`, { InitialBalance: Number(selectedAcc.InitialBalance) + Number(form.amount) })
    await api.post('/transaction', { accountId: selectedAcc.id, accountName: selectedAcc.accName, amount: Number(form.amount), description: form.description, type: 'Deposit', date: new Date().toLocaleString() })
    toast.success('Deposit successful!')
    reset(); setLoading(false); fetchData()
  }

  const handleWithdraw = async (e) => {
    e.preventDefault()
    if (!selectedAcc) return
    if (Number(form.amount) <= 0) return toast.error('Enter a valid amount')
    if (Number(form.amount) > Number(selectedAcc.InitialBalance)) return toast.error('Insufficient balance!')
    setLoading(true)
    await api.patch(`/Accounts/${selectedAcc.id}`, { InitialBalance: Number(selectedAcc.InitialBalance) - Number(form.amount) })
    await api.post('/transaction', { accountId: selectedAcc.id, accountName: selectedAcc.accName, amount: Number(form.amount), description: form.description, type: 'Withdraw', date: new Date().toLocaleString() })
    toast.success('Withdrawal successful!')
    reset(); setLoading(false); fetchData()
  }

  const handleTransfer = async (e) => {
    e.preventDefault()
    if (!selectedAcc) return
    if (Number(form.amount) <= 0) return toast.error('Enter a valid amount')
    if (Number(form.amount) > Number(selectedAcc.InitialBalance)) return toast.error('Insufficient balance!')
    if (form.accountNo === selectedAcc.id) return toast.error('Cannot transfer to the same account!')
    setLoading(true)
    try {
      const receiverRes = await api.get(`/Accounts/${form.accountNo}`)
      const receiver = receiverRes.data
      await api.patch(`/Accounts/${selectedAcc.id}`, { InitialBalance: Number(selectedAcc.InitialBalance) - Number(form.amount) })
      await api.patch(`/Accounts/${receiver.id}`, { InitialBalance: Number(receiver.InitialBalance) + Number(form.amount) })
      await api.post('/transaction', { fromAccountNo: selectedAcc.id, fromAccountName: selectedAcc.accName, toAccountNo: receiver.id, toAccountName: receiver.accName, amount: Number(form.amount), description: form.description, type: 'Transfer', date: new Date().toLocaleString() })
      toast.success(`Transferred $${Number(form.amount).toLocaleString()} to ${receiver.accName}!`)
      reset(); fetchData()
    } catch { toast.error('Receiver account not found!') }
    setLoading(false)
  }

  // Summary stats
  const totalDeposited = transactions.filter(t => t.type === 'Deposit').reduce((s, t) => s + Number(t.amount), 0)
  const totalWithdrawn = transactions.filter(t => t.type === 'Withdraw' || t.type === 'withdraw').reduce((s, t) => s + Number(t.amount), 0)
  const totalTransferred = transactions.filter(t => t.type === 'Transfer').reduce((s, t) => s + Number(t.amount), 0)
  const netBalance = accounts.reduce((s, a) => s + Number(a.InitialBalance), 0)

  // Recent transactions for selected account
  const recentTx = transactions
    .filter(t => t.accountId === selectedAccId || t.fromAccountNo === selectedAccId)
    .slice(-5).reverse()

  const typeColor = (type) => {
    if (type === 'Deposit') return 'tx-deposit'
    if (type === 'Withdraw' || type === 'withdraw') return 'tx-withdraw'
    return 'tx-transfer'
  }
  const typeIcon = (type) => {
    if (type === 'Deposit') return '↓'
    if (type === 'Withdraw' || type === 'withdraw') return '↑'
    return '⇄'
  }

  return (
    <div className="deposit-page">

      {/* Header */}
      <div className="deposit-header">
        <div>
          <h1>Deposits & Transfers</h1>
          <p>Manage deposits, withdrawals and transfers across all accounts</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="deposit-summary-cards">
        <div className="dep-summary-card green">
          <div className="dep-card-icon">↓</div>
          <div>
            <p>Total Deposited</p>
            <h3>${totalDeposited.toLocaleString()}</h3>
          </div>
        </div>
        <div className="dep-summary-card red">
          <div className="dep-card-icon">↑</div>
          <div>
            <p>Total Withdrawn</p>
            <h3>${totalWithdrawn.toLocaleString()}</h3>
          </div>
        </div>
        <div className="dep-summary-card blue">
          <div className="dep-card-icon">⇄</div>
          <div>
            <p>Total Transferred</p>
            <h3>${totalTransferred.toLocaleString()}</h3>
          </div>
        </div>
        <div className="dep-summary-card purple">
          <div className="dep-card-icon">◈</div>
          <div>
            <p>Net Balance (All Accounts)</p>
            <h3>${netBalance.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="deposit-main">

        {/* Left — Action Panel */}
        <div className="deposit-action-panel">

          {/* Account Selector */}
          <div className="account-selector">
            <label>Select Account</label>
            <select value={selectedAccId} onChange={e => setSelectedAccId(e.target.value)}>
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.accName} — {a.accType}</option>
              ))}
            </select>
            {selectedAcc && (
              <div className="selected-acc-balance">
                <span>Available Balance</span>
                <strong>${Number(selectedAcc.InitialBalance).toLocaleString()}</strong>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="dep-tabs">
            {['deposit', 'withdraw', 'transfer'].map(tab => (
              <button key={tab} className={`dep-tab ${activeTab === tab ? 'active' : ''} ${tab}`}
                onClick={() => { setActiveTab(tab); reset() }}>
                {tab === 'deposit' ? '↓ Deposit' : tab === 'withdraw' ? '↑ Withdraw' : '⇄ Transfer'}
              </button>
            ))}
          </div>

          {/* Deposit Form */}
          {activeTab === 'deposit' && (
            <form className="dep-form" onSubmit={handleDeposit}>
              <div className="dep-form-group">
                <label>Amount ($)</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter deposit amount" min="1" required />
              </div>
              <div className="dep-form-group">
                <label>Description (optional)</label>
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="e.g. Salary, Savings" />
              </div>
              <div className="dep-amount-shortcuts">
                {[1000, 5000, 10000, 50000].map(v => (
                  <button type="button" key={v} className="shortcut-btn" onClick={() => setForm({ ...form, amount: v })}>+${v.toLocaleString()}</button>
                ))}
              </div>
              <button type="submit" className="dep-submit-btn deposit" disabled={loading}>
                {loading ? 'Processing...' : '↓ Confirm Deposit'}
              </button>
            </form>
          )}

          {/* Withdraw Form */}
          {activeTab === 'withdraw' && (
            <form className="dep-form" onSubmit={handleWithdraw}>
              <div className="dep-form-group">
                <label>Amount ($)</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter withdrawal amount" min="1" required />
              </div>
              <div className="dep-form-group">
                <label>Description (optional)</label>
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="e.g. Rent, Bills" />
              </div>
              <div className="dep-amount-shortcuts">
                {[1000, 5000, 10000, 50000].map(v => (
                  <button type="button" key={v} className="shortcut-btn" onClick={() => setForm({ ...form, amount: v })}>-${v.toLocaleString()}</button>
                ))}
              </div>
              {selectedAcc && form.amount && (
                <div className="balance-after">
                  Balance after withdrawal: <strong>${Math.max(0, Number(selectedAcc.InitialBalance) - Number(form.amount)).toLocaleString()}</strong>
                </div>
              )}
              <button type="submit" className="dep-submit-btn withdraw" disabled={loading}>
                {loading ? 'Processing...' : '↑ Confirm Withdraw'}
              </button>
            </form>
          )}

          {/* Transfer Form */}
          {activeTab === 'transfer' && (
            <form className="dep-form" onSubmit={handleTransfer}>
              <div className="dep-form-group">
                <label>Amount ($)</label>
                <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter transfer amount" min="1" required />
              </div>
              <div className="dep-form-group">
                <label>Receiver Account ID</label>
                <input type="text" name="accountNo" value={form.accountNo} onChange={handleChange} placeholder="Enter receiver account ID" required />
              </div>
              <div className="dep-form-group">
                <label>Description (optional)</label>
                <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="e.g. Rent payment" />
              </div>
              {selectedAcc && form.amount && (
                <div className="balance-after">
                  Balance after transfer: <strong>${Math.max(0, Number(selectedAcc.InitialBalance) - Number(form.amount)).toLocaleString()}</strong>
                </div>
              )}
              <button type="submit" className="dep-submit-btn transfer" disabled={loading}>
                {loading ? 'Processing...' : '⇄ Confirm Transfer'}
              </button>
            </form>
          )}
        </div>

        {/* Right — Account Cards + Recent Transactions */}
        <div className="deposit-right-panel">

          {/* All Account Cards */}
          <div className="all-accounts-section">
            <h3>All Accounts</h3>
            <div className="mini-account-cards">
              {accounts.map(a => (
                <div key={a.id} className={`mini-account-card ${selectedAccId === a.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAccId(a.id)}>
                  <div className="mini-acc-icon">{a.accType === 'Savings' ? '🏦' : '🏢'}</div>
                  <div className="mini-acc-info">
                    <strong>{a.accName}</strong>
                    <span>{a.accType}</span>
                    <p>${Number(a.InitialBalance).toLocaleString()}</p>
                  </div>
                  {selectedAccId === a.id && <span className="selected-tick">✓</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="recent-tx-section">
            <h3>Recent Transactions {selectedAcc ? `— ${selectedAcc.accName}` : ''}</h3>
            {recentTx.length === 0 ? (
              <p className="no-tx">No transactions yet for this account.</p>
            ) : (
              <div className="recent-tx-list">
                {recentTx.map((tx, i) => (
                  <div key={i} className={`recent-tx-item ${typeColor(tx.type)}`}>
                    <div className="tx-icon-circle">{typeIcon(tx.type)}</div>
                    <div className="tx-info">
                      <strong>{tx.type}</strong>
                      <span>{tx.description || tx.type}</span>
                      <small>{tx.date}</small>
                    </div>
                    <div className="tx-amount">${Number(tx.amount).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Deposit
