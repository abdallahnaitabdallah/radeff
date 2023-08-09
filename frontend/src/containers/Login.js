import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../actions/auth';
import { Grid, Typography, TextField, Button } from '@mui/material';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(username, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item xs={6}>
        <img
          src="https://onedrive.live.com/embed?resid=ADF4A063A5450601%213682&authkey=%21ALz5a12mA1WFy5c&width=400&height=403"
          alt="Logo"
          style={{ width: '100%', height: 'auto' }}
        />
      </Grid>
      <Grid item xs={6} justifyContent="center" alignItems="center"  sx={{ padding: '0 50px' }}>
        <Typography variant="body1" gutterBottom >
          Sign into your Account
        </Typography>
        <form onSubmit={e => onSubmit(e)}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={username}
            onChange={e => onChange(e)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            required
            margin="normal"
            minLength={6}
          />
          <Button type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
