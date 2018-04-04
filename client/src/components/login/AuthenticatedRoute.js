import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

class AuthenticatedRoute extends Component {
  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/login" />;
    }
    return <Route {...this.props} />;
  }
}

AuthenticatedRoute.propTypes = {
  authenticated: PropTypes.bool
};

AuthenticatedRoute.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default connect(mapStateToProps)(AuthenticatedRoute);
