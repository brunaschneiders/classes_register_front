import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { useStyles } from './styles';

export default function Input({ label, ...props }) {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      label={label}
      variant="filled"
      color="secondary"
      fullWidth
      InputProps={{ className: classes.root }}
    />
  );
}

Input.propTypes = {
  label: PropTypes.string,
};

Input.defaultProps = {
  label: '',
};
