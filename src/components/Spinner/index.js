import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './styles';

export default function SimpleBackdrop({ visible }) {
  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={visible}
      style={{ zIndex: 10000 }}
    >
      <CircularProgress color="inherit" style={{ zIndex: 10000 }} />
    </Backdrop>
  );
}
