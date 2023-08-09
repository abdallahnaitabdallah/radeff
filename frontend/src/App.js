import React from 'react';
import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import CreateUser from './containers/CreateUser';
import Home from './containers/Home';
import Login from './containers/Login';
import Main from './containers/Main';
import Reclamation from './containers/Reclamation';
import ReclamationDetails from './containers/ReclamationDetails';
import Services from './containers/Services';
import UpdateUser from './containers/UpdateUser';
import Users from './containers/Users';
import './app.css'

const App = ({ isAuthenticated, user }) => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      {isAuthenticated && (
        <React.Fragment>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/reclamation" element={<Reclamation />} />
          <Route path="/reclamations/:id" element={<ReclamationDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user/:id" element={<UpdateUser />} />
          <Route path="/create-user" element={<CreateUser />} />
          { user && user['role'] === 'Admin' && <Route path="/services" element={<Services />} />}
        </React.Fragment>
      )}
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
