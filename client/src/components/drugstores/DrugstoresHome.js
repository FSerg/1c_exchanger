import React, { Component } from 'react';
import { Switch, Route, NavLink, withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import DrugstoresStats from './DrugstoresStats';
import InvoisesList from './InvoisesList';
import ReceiptsList from './ReceiptsList';
import SalesList from './SalesList';

class DrugstoresHome extends Component {
  render() {
    return (
      <div>
        <Menu size="tiny">
          <Menu.Item as={NavLink} to="/drugstores/invoises">
            Приходные
          </Menu.Item>
          <Menu.Item as={NavLink} to="/drugstores/receipts">
            Розничные продажи (Выручки)
          </Menu.Item>
          <Menu.Item as={NavLink} to="/drugstores/sales">
            Расходные / Перемещения
          </Menu.Item>
        </Menu>

        <Switch>
          <Route exact path="/drugstores" component={DrugstoresStats} />
          <Route path="/drugstores/invoises" component={InvoisesList} />
          <Route path="/drugstores/receipts" component={ReceiptsList} />
          <Route path="/drugstores/sales" component={SalesList} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(DrugstoresHome);
