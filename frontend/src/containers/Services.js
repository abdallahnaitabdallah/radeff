import {
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { DeleteOutline, Edit } from '@mui/icons-material'; // Import icons
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);
  const [nom, setNom] = useState('');
  const access = localStorage.getItem('access');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${access}`,
      Accept: 'application/json',
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/services/', { nom }, config);
      fetchServices(); // Fetch services again after creating a new one
    } catch (error) {
      console.error('Error creating service:', error);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this service?');
    if (shouldDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/services/${id}/`, config);
        setServices(services.filter((service) => service.id !== id));
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/services/', config);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div style={{ marginTop: '100px', marginBottom: '20px' }}>
      <Container>
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <FormControl style={{ marginRight: '8px' ,marginLeft:'20px'}}>
            <InputLabel>Name:</InputLabel>
            <Input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">Create</Button>
        </form>
      </Container>

      <Container>
        <Typography variant="h4" component="h4" gutterBottom>
          Service List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.nom}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(service.id)}
                      variant="contained"
                      color="secondary"
                      startIcon={<DeleteOutline />} // Use Delete icon
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Services;
