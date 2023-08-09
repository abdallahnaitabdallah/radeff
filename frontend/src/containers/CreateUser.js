import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    re_password: '',
    role: 'Technicien',
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/', user);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Container maxWidth="sm" mt={4}>
      <Typography variant="h4" component="h2" mb={4}>
        Create User
      </Typography>
      <form>
        <TextField
          label="First Name"
          name="first_name"
          value={user.first_name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={user.last_name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Re-Password"
          name="re_password"
          value={user.re_password}
          onChange={handleChange}
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select name="role" value={user.role} onChange={handleChange} label="Role">
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Technicien">Technicien</MenuItem>
            <MenuItem value="Responsable">Responsable</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create User
        </Button>
      </form>
    </Container>
  );
};

export default CreateUser;
