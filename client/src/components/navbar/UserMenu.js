import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Dropdown, Menu } from 'semantic-ui-react';

const UserMenu = ({ signoutUser }) => [
  <Menu.Item as={NavLink} exact to="/drugstores" key={1}>
    Аптеки
  </Menu.Item>,
  <Menu.Menu position="right" key={2}>
    <Dropdown item simple text="Пользователь">
      <Dropdown.Menu>
        <Dropdown.Item as={NavLink} exact to="/profile">
          Профиль
        </Dropdown.Item>
        <Dropdown.Item onClick={signoutUser}>Выход</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu.Menu>
];

UserMenu.propTypes = {
  signoutUser: PropTypes.func.isRequired
};

export default UserMenu;
