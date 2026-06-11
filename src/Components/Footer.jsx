import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>🏦 KBL Bank</h2>
          <p>Your trusted banking partner for savings, loans, and investments. Building financial futures since 2001.</p>
          <div className="footer-socials">
            <a href="#">𝕏</a>
            <a href="#">in</a>
            <a href="#">f</a>
            <a href="#">▶</a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/accounts">Accounts</a></li>
            <li><a href="/deposits">Deposits</a></li>
            <li><a href="/loans">Loans</a></li>
            <li><a href="/transcation">Transactions</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Products</h4>
          <ul>
            <li><a href="#">Savings Account</a></li>
            <li><a href="#">Fixed Deposit</a></li>
            <li><a href="#">Personal Loan</a></li>
            <li><a href="#">Gold Loan</a></li>
            <li><a href="#">Home Loan</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Security</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact Us</h4>
          <p>📍 123 Finance Street, Mumbai, India</p>
          <p>📞 1800-123-4567 (Toll Free)</p>
          <p>📧 support@kblbank.com</p>
          <p>🕐 Mon – Sat: 9AM – 6PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} KBL Bank. All rights reserved.</p>
        <p>Licensed by RBI | DICGC Insured | ISO 27001 Certified</p>
      </div>
    </footer>
  )
}

export default Footer
