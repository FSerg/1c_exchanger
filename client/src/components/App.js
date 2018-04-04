import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-bootstrap';

import PrivateRoute from './login/AuthenticatedRoute';
import NavigationBar from './navbar/NavigationBar';
import Footer from './footer/Footer';
import Landing from './Landing';
import LoginPage from './login/LoginPage';
import SignupPage from './login/SignupPage';
import DrugstoresHome from './drugstores/DrugstoresHome';

class App extends Component {
  render() {
    return (
      <div
        style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}
      >
        <NavigationBar />
        <NotificationsSystem theme={theme} />

        <div style={{ flex: 1 }}>
          <Container style={{ marginTop: '7em', marginBottom: '7em' }}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <PrivateRoute path="/drugstores" component={DrugstoresHome} />
            </Switch>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
