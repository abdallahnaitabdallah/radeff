import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { checkAuthenticated, load_user } from '../actions/auth';
import { connect } from 'react-redux';
import { Routes } from 'react-router-dom';

const Layout = ({ children, checkAuthenticated, load_user }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, [checkAuthenticated, load_user]);

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
