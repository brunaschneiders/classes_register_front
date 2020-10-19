import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStyles } from './style';

import { menu, headerMenu } from '../../../config/menu';

export default function DefaultLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <Typography variant="h6" noWrap>
            Aulas da Growdev
          </Typography>
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
            {headerMenu.map((item) => (
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
            {menu.map((item) => (
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
