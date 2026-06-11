import React from 'react'

const Card2 = () => {
  return (
    <section className="services-section">
      <div className="services-top">
        <span className="services-badge">BANKING WITH ✦ EASE</span>
        <h2 className="services-heading">Catering to All Your Needs</h2>
        <p className="services-sub">Flexible financial products crafted for every milestone in your life.</p>
      </div>

      <div className="services-grid">

        <div className="service-card featured">
          <div className="service-icon">🏠</div>
          <h3>KBL Insta Cash Loan</h3>
          <p>Fast personal loan with minimal paperwork and competitive rates.</p>
          <ul>
            <li>Up to ₹50 lakh loan amount</li>
            <li>Rate starting at 11.27% p.a.</li>
            <li>24 to 60 months tenure</li>
          </ul>
          <div className="service-btns">
            <button className="s-apply-btn">Apply Now</button>
            <button className="s-know-btn">Know More</button>
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">🧸</div>
          <h3>KBL Gold Loan</h3>
          <p>Unlock the value of your gold with instant approval and safe custody.</p>
          <ul>
            <li>Safe gold custody guaranteed</li>
            <li>High loan-to-value ratio</li>
            <li>No income proof required</li>
          </ul>
          <div className="service-btns">
            <button className="s-apply-btn">Apply Now</button>
            <button className="s-know-btn">Know More</button>
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">💰</div>
          <h3>Savings Account</h3>
          <p>Grow your savings with high interest rates and zero hidden charges.</p>
          <ul>
            <li>Up to 7% interest p.a.</li>
            <li>Free digital banking</li>
            <li>Instant account opening</li>
          </ul>
          <div className="service-btns">
            <button className="s-apply-btn">Open Now</button>
            <button className="s-know-btn">Know More</button>
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">📈</div>
          <h3>Fixed Deposit</h3>
          <p>Secure your future with guaranteed returns on fixed deposits.</p>
          <ul>
            <li>Up to 8.5% returns</li>
            <li>Flexible tenure options</li>
            <li>Auto-renewal available</li>
          </ul>
          <div className="service-btns">
            <button className="s-apply-btn">Invest Now</button>
            <button className="s-know-btn">Know More</button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Card2
