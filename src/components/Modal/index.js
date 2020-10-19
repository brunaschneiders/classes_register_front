import React from 'react';
import { Modal, Backdrop, Fade } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './styles';

export default function TransitionsModal({ showModal, children, ...props }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        {...props}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showModal}>
          <div className={classes.paper}>{children}</div>
        </Fade>
      </Modal>
    </div>
  );
}

TransitionsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};
