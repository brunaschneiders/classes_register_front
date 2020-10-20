import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ExitToApp } from '@material-ui/icons';
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@material-ui/core';
import {
  adminMenu,
  headerAdminMenu,
  growdeverMenu,
  headerGrowdeverMenu,
} from '../../../config/menu';
import * as userActions from '../../../store/user/actions';

import { useStyles } from './style';

export default function DefaultLayout({ children }) {
  const userData = useSelector((state) => state.user);
  const userType = userData?.user?.type;

  const classes = useStyles();

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(userActions.logout());
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" noWrap>
            Aulas da Growdev
          </Typography>
          <div>
            <Button
              color="inherit"
              endIcon={<ExitToApp />}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {userType === 'Admin' &&
              headerAdminMenu.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={item.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={item.icon} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            {userType === 'Growdever' &&
              headerGrowdeverMenu.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={item.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={item.icon} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
            {userType === 'Admin' &&
              adminMenu.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={item.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={item.icon} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
            {userType === 'Growdever' &&
              growdeverMenu.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  style={{ textDecoration: 'none' }}
                >
                  <ListItem button key={item.link}>
                    <ListItemIcon>
                      <FontAwesomeIcon icon={item.icon} size="lg" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
