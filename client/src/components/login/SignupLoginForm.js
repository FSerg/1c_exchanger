import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Header, Message } from 'semantic-ui-react';
import isEmail from 'validator/lib/isEmail';
import InputField from './inputField';
import FormInlineMessage from '../FormInlineMessage';

class SignupLoginForm extends Component {
  state = {
    data: {
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  validate = data => {
    const errors = {};
    if (!isEmail(data.email)) {
      errors.email = 'Некорректный адрес эл.почты';
    }

    if (!data.email) {
      errors.email = 'Адрес эл.почты обязателен для заполнения';
    }

    if (!data.password) {
      errors.password = 'Пароль не может быть пустым';
    }

    if (!this.props.isLogin && data.password !== data.passwordConfirmation) {
      errors.password = 'Пароли не совпадают!';
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  handleStringChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, isValid } = this.validate(this.state.data);
    this.setState({ errors });
    if (isValid) {
      this.props.submit(this.state.data);
    }
  };

  showError = errorMessage => {
    if (errorMessage) {
      return <Message color="red">{errorMessage}</Message>;
    }
    return <div />;
  };

  showAdditionalLinks = () => {
    if (this.props.isLogin) {
      return (
        <Message className="small">
          Первый раз здесь? Требуется{' '}
          <NavLink to="/signup">регистрация</NavLink>
        </Message>
      );
    }
    return (
      <Message className="small">
        Уже регистрировались? Требуется{' '}
        <NavLink to="/login">авторизация</NavLink>
      </Message>
    );
  };

  render() {
    const { errors, data } = this.state;
    const formClassNames = this.props.authLoading
      ? 'ui form loading'
      : 'ui form';

    return (
      <div className="ui centered grid">
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui fluid card">
            <div className="content">
              <Header as="h3" block textAlign="center">
                {this.props.isLogin
                  ? 'Вход в систему'
                  : 'Регистрация нового пользователя'}
              </Header>
              <form className={formClassNames} onSubmit={this.handleSubmit}>
                <div className={errors.email ? 'field error' : 'field'}>
                  <InputField
                    type="text"
                    name="email"
                    label="E-mail"
                    value={data.email}
                    change={this.handleStringChange}
                  />
                  <FormInlineMessage content={errors.email} type="error" />
                </div>

                <div className={errors.password ? 'field error' : 'field'}>
                  <InputField
                    type="password"
                    name="password"
                    label="Пароль"
                    value={data.password}
                    change={this.handleStringChange}
                  />
                  <FormInlineMessage content={errors.password} type="error" />
                </div>

                {!this.props.isLogin && (
                  <InputField
                    type="password"
                    name="passwordConfirmation"
                    label="Подтверждение пароля"
                    value={data.passwordConfirmation}
                    change={this.handleStringChange}
                  />
                )}

                {this.showError(this.props.authError)}

                <div className="fluid ui buttons">
                  <button className="ui primary button" type="submit">
                    {this.props.isLogin ? 'Войти' : 'Зарегистрироваться'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {this.showAdditionalLinks()}
        </div>
      </div>
    );
  }
}

SignupLoginForm.propTypes = {
  isLogin: PropTypes.bool,
  submit: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authLoading: PropTypes.bool
};

SignupLoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

SignupLoginForm.defaultProps = {
  isLogin: false,
  authError: '',
  authLoading: false
};

export default SignupLoginForm;
