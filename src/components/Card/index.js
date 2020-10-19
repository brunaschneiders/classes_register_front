import React from 'react';
import { Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

export default function DefaultCard({ children }) {
  const classes = useStyles();

  return <Card className={classes.root}>{children}</Card>;
}

DefaultCard.propTypes = {
  children: PropTypes.element.isRequired,
};
