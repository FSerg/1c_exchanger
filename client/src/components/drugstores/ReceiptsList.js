import React, { Component } from 'react';

import { Header } from 'semantic-ui-react';

class ReceiptsList extends Component {
  render() {
    return (
      <div>
        <Header as="h2">Список документов розничных продаж</Header>
        <p>Какая-то информация о выручках продажах</p>
      </div>
    );
  }
}

export default ReceiptsList;
