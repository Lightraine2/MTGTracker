import React from 'react'

const Landing = () => {
    return (
<section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Tournament Tracker</h1>
          <p className="lead">
            Remember that time you kept a 5 lander and drew nothing but lands? This app remembers.
          </p>
          <div className="buttons">
            <a href="register.html" className="btn btn-primary">Sign Up</a>
            <a href="login.html" className="btn btn-light">Login</a>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Landing;