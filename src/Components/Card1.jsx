import React from 'react'

const Card1 = () => {
  return (
    <section className="goal-section">
      <div className="goal-container">
        <div className="goal-left">
          <p className="small-heading">BANKING WITH ✡ PURPOSE</p>
          <h1 className="main-heading">Your goals, our priority</h1>
          <div className="card">
             <h2>Select your goal</h2>
             <div className="select-box">
                <label>I want to</label>
              <select>
                <option>- Any -</option>
                <option>Buy a Home</option>
                <option>Save Money</option>
                <option>Invest</option>
                <option>Travel</option>
              </select>
            </div>
            <div className="bottom-section">
              <button>Show solutions</button>
              <div className="users">
                <div className="avatars">
                  <img src="https://randomuser.me/api/portraits/men/32.jpgv"alt=""/>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt=""/>
                  <img src="https://randomuser.me/api/portraits/men/55.jpg" alt=""/>
                  <img src="https://randomuser.me/api/portraits/men/12.jpg" alt=""/>
                </div>
                <p>
                  <span>2.5k+ people</span>
                  <br />
                  found it useful
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="goal-right">
          <img src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop" alt="family" />
        </div>
      </div>
    </section>
  );
};


export default Card1
