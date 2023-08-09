import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const UpdateUser = ({ access ,_user}) => {
  const { id } = useParams();
  const [user, setUser] = useState({
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    role: '',
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
      Accept: 'application/json',
    },
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`,config);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/users/${id}/`, user,config);
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <h2>Edit User</h2>
      <form>
        <TextField
          label="Username"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="First Name"
          name="first_name"
          value={user.first_name}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={user.last_name}
          onChange={handleInputChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {
        _user && _user['role']==='Admin'&& 
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="role">Role</InputLabel>
          <Select
            label="Role"
            name="role"
            value={user.role}
            onChange={handleInputChange}
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="Technicien">Technicien</MenuItem>
            <MenuItem value="Responsable">Responsable</MenuItem>
          </Select>
        </FormControl>
        }
        <Button variant="contained" color="primary" onClick={handleUpdateUser}>
          Update User
        </Button>
      </form>
    </Container>
  );
};
const mapStateToProps = (state) => ({
    access: state.auth.access,
    _user: state.auth.user
  });
  
export default connect(mapStateToProps)(UpdateUser);
