import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = ({ access }) => {
  const [reclamations, setReclamations] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [reclamationMonth,setReclamationMonth] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
        Accept: 'application/json',
      },
    };
    const fetchReclamations = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reclamations/', config);
        setReclamations(response.data)

        const currentMonth = new Date().getMonth() + 1; // JavaScript months are zero-based
        const currentYear = new Date().getFullYear();

        const reclamationThisMonth = reclamations.filter(reclamation => {
          const reclamationDate = new Date(reclamation.date_affectation);
          return reclamationDate.getMonth() + 1 === currentMonth && reclamationDate.getFullYear() === currentYear;
        });

        // Get the number of reclamations for the current month
        const numberOfReclamationsThisMonth = reclamationThisMonth.length;

        console.log("Number of reclamations this month:", numberOfReclamationsThisMonth);
        setReclamationMonth(numberOfReclamationsThisMonth);
      } catch (error) {
        console.error('Error fetching reclamations:', error);
      }
    };
    console.log(reclamationMonth)

    // Fetch technicians data
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/technicians/', config);
        setTechnicians(response.data);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      }
    };

    // Fetch services data
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/services/', config);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    // Fetch data on component mount
    fetchReclamations();
    fetchTechnicians();
    fetchServices();
  }, [access]);

  const handleReclamationClick = (reclamationId) => {
    navigate(`/reclamations/${reclamationId}`);
  };


  // Columns for the data grid of last 5 pending reclamations
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'description', headerName: 'Description', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" align="center">Reclamations of the Month</Typography>
            <Typography variant="h4" align="center">
              {reclamationMonth > 0
                ? reclamationMonth
                : 'Loading...'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" align="center">Number of Technicians</Typography>
            <Typography variant="h4" align="center">
              {technicians.length > 0 ? technicians.length : 'Loading...'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" align="center">Number of Services</Typography>
            <Typography variant="h4" align="center">
              {services.length > 0 ? services.length : 'Loading...'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <div style={{ height: 400, marginTop: '24px', textAlign: 'center' }}>
        <Typography variant="h6">Pending Reclamations</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reclamations.filter((reclamation) => reclamation.status === 'pending').map((reclamation) => (
                <TableRow
                 key={reclamation.id}
                  onClick={() => handleReclamationClick(reclamation.id)} // Add onClick event
                  style={{ cursor: 'pointer' }}
                  >
                  <TableCell>{reclamation.id}</TableCell>
                  <TableCell>{reclamation.description}</TableCell>
                  <TableCell>{reclamation.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
});

export default connect(mapStateToProps)(Home);
