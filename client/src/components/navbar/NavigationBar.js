import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';

import { signoutUser } from '../../actions/authActions';
import UserMenu from './UserMenu';

class NavigationBar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header as={NavLink} to="/">
            1С Документы
          </Menu.Item>

          {!authenticated ? (
            <Menu.Menu position="right">
              <Menu.Item as={NavLink} to="/login">
                Авторизация
              </Menu.Item>
              <Menu.Item as={NavLink} to="/signup">
                Регистрация
              </Menu.Item>
            </Menu.Menu>
          ) : (
            <UserMenu signoutUser={this.props.signoutUser} />
          )}
        </Container>
      </Menu>
    );
  }
}

NavigationBar.propTypes = {
  signoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool
};

NavigationBar.defaultProps = {
  authenticated: false
};

const mapStateToProps = state => {
  return { authenticated: state.auth.authenticated };
};

export default withRouter(
  connect(mapStateToProps, { signoutUser })(NavigationBar)
);
