import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, Select, MenuItem, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AllUsers = ({ access, _user }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [UserFilter, setUserFilter] = useState('all');
  const rowsPerPage = 10;
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
      Accept: 'application/json'
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/all-users/', config);

      let filteredUsers = response.data;

      if (_user['role'] === 'Admin') {
        filteredUsers = response.data;
      } else {
        filteredUsers = response.data.filter(user => user.role === 'Technicien');
      }

      if (UserFilter !== 'all') {
        filteredUsers = filteredUsers.filter(user => user.role === UserFilter);
      }

      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${userId}/`, config);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleUserFilterChange = (event) => {
    setUserFilter(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetchUsers();
  }, [UserFilter]);

  return (
    <div className="container" style={{ padding: '0 50px' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={5}>
        <Typography variant="h4" component="h2">
          All Users
        </Typography>
        <Link to="/create-user" variant="contained" color="primary">
          <Button variant="contained">Create user</Button>

        </Link>

      </Box>
      <Select
        value={UserFilter}
        onChange={handleUserFilterChange}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="Admin">Admin</MenuItem>
        <MenuItem value="Responsable">Responsable</MenuItem>
        <MenuItem value="Technicien">Technicien</MenuItem>
      </Select>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user.id} onClick={() => handleUserClick(user.id)}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  access: state.auth.access,
  _user: state.auth.user
});

export default connect(mapStateToProps)(AllUsers);
