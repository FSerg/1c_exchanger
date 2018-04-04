import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header, Table } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { getInvoises } from '../../actions/drugstoresActions';

class InvoisesList extends Component {
  componentWillMount() {
    this.props.getInvoises();
  }

  renderRows(invoises) {
    return invoises.map(invoise => {
      return (
        <Table.Row key={invoise._id}>
          <Table.Cell>{invoise.number}</Table.Cell>
          <Table.Cell>{invoise.date}</Table.Cell>
          <Table.Cell>{invoise.head.summa_doc_purchase}</Table.Cell>
          <Table.Cell>{invoise.head.summa_doc_retail}</Table.Cell>
          <Table.Cell>{invoise.head.shop}</Table.Cell>
          <Table.Cell>{invoise.head.partner}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <Header as="h2">Список приходных</Header>

        <Table compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Номер</Table.HeaderCell>
              <Table.HeaderCell>Дата</Table.HeaderCell>
              <Table.HeaderCell>Сумма закупочная</Table.HeaderCell>
              <Table.HeaderCell>Сумма розничная</Table.HeaderCell>
              <Table.HeaderCell>Аптека</Table.HeaderCell>
              <Table.HeaderCell>Поставщик</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderRows(this.props.invoises)}</Table.Body>
        </Table>
      </div>
    );
  }
}

InvoisesList.propTypes = {
  getInvoises: PropTypes.func.isRequired,
  invoises: PropTypes.arrayOf(PropTypes.object)
};

InvoisesList.defaultProps = {
  invoises: []
};

const mapStateToProps = state => {
  return { invoises: state.drugstores.invoises };
};

export default connect(mapStateToProps, { getInvoises })(InvoisesList);
