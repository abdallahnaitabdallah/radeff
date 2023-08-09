import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated, user }) => {
  const [redirect, setRedirect] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const isMobile = useMediaQuery('(max-width:800px)');

  const handleDrawerToggle = () => {
    setOpenDrawer(!openDrawer);
  };

  const logout_user = () => {
    logout();
    setRedirect(true);
  };

  const guestLinks = () => (
    <Fragment>
      <Button color='inherit' component={RouterLink} to='/login'>
        Login
      </Button>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <Button color='inherit' component={RouterLink} to='/dashboard'>
        Dashboard
      </Button>
      <Button color='inherit' component={RouterLink} to='/users'>
        Users
      </Button>
      <Button color='inherit' component={RouterLink} to='/reclamation'>
        Reclamation
      </Button>
      {user && user['role'] === 'Admin' && (
        <Button color='inherit' component={RouterLink} to='/services'>
          Services
        </Button>
      )}
      <Button color='inherit' onClick={logout_user}>
        Logout
      </Button>
    </Fragment>
  );

  const responsiveMenu = (
    <Drawer anchor='right' open={openDrawer} onClose={handleDrawerToggle}>
      <List>
        {isAuthenticated ? (
          <React.Fragment>
            <ListItem button component={RouterLink} to='/dashboard' onClick={handleDrawerToggle}>
              <ListItemText primary='Dashboard' />
            </ListItem>
            <ListItem button component={RouterLink} to='/users' onClick={handleDrawerToggle}>
              <ListItemText primary='Users' />
            </ListItem>
            <ListItem button component={RouterLink} to='/reclamation' onClick={handleDrawerToggle}>
              <ListItemText primary='Reclamation' />
            </ListItem>
            {user && user['role'] === 'Admin' && (
              <ListItem button component={RouterLink} to='/services' onClick={handleDrawerToggle}>
                <ListItemText primary='Services' />
              </ListItem>
            )}
            <ListItem
              button
              onClick={() => {
                logout_user();
                handleDrawerToggle();
              }}
            >
              <ListItemText primary='Logout' />
            </ListItem>
          </React.Fragment>
        ) : (
          <ListItem button component={RouterLink} to='/login' onClick={handleDrawerToggle}>
            <ListItemText primary='Login' />
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  return (
    <Fragment>
      <AppBar position='static' color='default'>
        <Toolbar>
          {isAuthenticated && user && (
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, textDecoration: 'none' }}>
            {`Welcome ${user.first_name}`}
            </Typography>
          )}
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <IconButton color='inherit' edge='end' onClick={handleDrawerToggle} sx={{ display: 'block' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            isAuthenticated ? authLinks() : guestLinks()
          )}
        </Toolbar>
      </AppBar>
      {redirect ? <Navigate to='/' /> : null}
      {isMobile && responsiveMenu}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
