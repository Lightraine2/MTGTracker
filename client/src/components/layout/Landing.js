import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// so this is because we want to avoid the landing page for an authenticated user. To do this we need to interact with the state
// state interaction = need connect and prop types. Proptypes are what part of the state you are interested in
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {

  if(isAuthenticated){
   return <Redirect to='/dashboard' />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Open Dojo</h1>
          <p className="lead">
            Martial Arts Club Management | Contact Tracing | Media and More
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// check if user is authd. If so, redirect to dashboard

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);