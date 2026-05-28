import React from 'react'

const Card2 = () => {
    return (
        <section className="loan-section">
            <p className="top-text">BANKING WITH ✡ EASE</p>
            <h1 className="main-heading">Catering to all your needs</h1>
            <div className="cards-container">
                {/* Card 1 */}
                <div className="loan-card">
                    <h2> Apply for a <span>KBL Insta Cash Loan</span> online</h2>
                    <ul>
                        <li>Up to ₹50 lakh max loan amount</li>
                        <li>Interest rate starting at 11.27% p.a.</li>
                        <li>24 to 60 months loan tenure</li>
                    </ul>
                    <div className="btn-group">
                        <button className="apply-btn">Apply now</button>
                        <button className="know-btn">Know more</button>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="loan-card">
                    <h2>Apply for a <span>KBL Gold Loan</span> without any hassle</h2>
                    <ul>
                        <li>Safe gold custody</li>
                        <li>High loan-to-value ratio</li>
                        <li>No income proof</li>
                    </ul>
                <div className="btn-group">
                        <button className="apply-btn">Apply now</button>
                        <button className="know-btn">Know more</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Card2
