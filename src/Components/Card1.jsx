import React from 'react'

const Card1 = () => {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <span className="hero-badge">BANKING WITH ✦ PURPOSE</span>
        <h1 className="hero-heading">Your Goals,<br /><span>Our Priority</span></h1>
        <p className="hero-sub">Smart banking solutions designed around your life — savings, loans, investments and more.</p>
        <div className="hero-goal-card">
          <h3>What's your goal today?</h3>
          <div className="hero-select-box">
            <label>I want to</label>
            <select>
              <option>— Select a goal —</option>
              <option>Buy a Home</option>
              <option>Save Money</option>
              <option>Get a Loan</option>
              <option>Invest</option>
              <option>Travel</option>
            </select>
          </div>
          <div className="hero-bottom">
            <button className="hero-btn">Show Solutions →</button>
            <div className="hero-users">
              <div className="hero-avatars">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="" />
                <img src="https://randomuser.me/api/portraits/men/12.jpg" alt="" />
              </div>
              <p><span>2.5k+ people</span><br />found it useful</p>
            </div>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" alt="family" />
        <div className="hero-stat-card">
          <span>🏦</span>
          <div>
            <strong>₹2.5 Cr+</strong>
            <p>Deposits managed</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Card1
