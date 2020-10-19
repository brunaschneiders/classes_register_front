import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import PropTypes from 'prop-types';

import './styles.css';

function Table({ tableColumns, tableData, messageNoData }) {
  return (
    <BootstrapTable
      keyField="uid"
      condensed
      bordered={false}
      responsive
      bootstrap4
      columns={tableColumns}
      data={tableData}
      classes="bootstrapTableStyle"
      noDataIndication={messageNoData}
    />
  );
}

export default Table;

Table.propTypes = {
  // eslint-disable-next-line
  tableColumns: PropTypes.array.isRequired,
  // eslint-disable-next-line
  tableData: PropTypes.array.isRequired,
  messageNoData: PropTypes.string,
};

Table.defaultProps = {
  messageNoData: 'Sem itens...',
};
