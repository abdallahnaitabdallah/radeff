import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ReclamationDetail = ({ access, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reclamation, setReclamation] = useState({
    id: '',
    description: '',
    status: '',
    reclameur: null,
    technician: '',
    service: '',
    date_affectation: new Date().toISOString().slice(0, 10),
    date_saisie: '',
  });

  const [technicians, setTechnicians] = useState([]);
  const [services, setServices] = useState([]);
  const [reclameur, setReclameur] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${access}`,
        Accept: 'application/json',
      },
    };

    const fetchReclamation = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://127.0.0.1:8000/api/reclamations/${id}/`, config);
          const reclameurId = response.data.reclameur.id;
          setReclameur(response.data.reclameur)
          setReclamation((prevReclamation) => ({
            ...prevReclamation,
            ...response.data,
            reclameur: reclameurId,
          }));
        }

        const techniciansResponse = await axios.get('http://127.0.0.1:8000/api/technicians/', config);
        setTechnicians(techniciansResponse.data);

        const servicesResponse = await axios.get('http://127.0.0.1:8000/api/services/', config);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Error fetching reclamation and technicians:', error);
      }
    };

    fetchReclamation();
  }, [id, access]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReclamation((prevReclamation) => ({
      ...prevReclamation,
      [name]: value,
    }));
  };

  const handleUpdateReclamation = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${access}`,
        },
      };
      
      // Set status to 'affected'
      setReclamation((prevReclamation) => ({
        ...prevReclamation,
        status: 'affected',
      }));
      
      console.log(reclamation);
      await axios.put(`http://127.0.0.1:8000/api/reclamations/${id}/`, reclamation, config);
      navigate('/reclamation');
    } catch (error) {
      console.error('Error updating reclamation:', error);
    }
  };
  console.log(reclameur)
  return (
    <Box mt={4} mx="auto" width="90%">
      <Typography variant="h4" component="h2" mb={2}>
        Update Reclamation
      </Typography>
      <Box display="flex" flexDirection="column" maxWidth="500px" mx="auto">
        <TextField
          name="prenom"
          value={reclameur.prenom}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled // Disable user input
        />
        <TextField
          name="nom"
          value={reclameur.nom}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled // Disable user input
        />
        <TextField
          name="adresse"
          value={reclameur.adresse}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled // Disable user input
        />
        <TextField
          name="cin"
          value={reclameur.cin}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled // Disable user input
        />
        <TextField
          name="telephone"
          value={reclameur.telephone}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled // Disable user input
        />
        
        <TextField
          name="description"
          label="Description"
          value={reclamation.description}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Select
          name="status"
          label="Status"
          value={reclamation.status}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
          style={{ marginBottom: '16px' }} 
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="affected">Affected</MenuItem>
          <MenuItem value="closed">Closed</MenuItem>
        </Select>
        <Select
          name="technician"
          label="Technician"
          value={reclamation.technician}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
          style={{ marginBottom: '16px' }} 
        >
          {technicians.map((technician) => (
            <MenuItem key={technician.id} value={technician.id}>
              {technician.username}
            </MenuItem>
          ))}
        </Select>
        <Select
          name="service"
          label="Service"
          value={reclamation.service}
          onChange={handleInputChange}
          variant="outlined"
          margin="normal"
          fullWidth
          style={{ marginBottom: '16px' }}
        >
          {services.map((service) => (
            <MenuItem key={service.id} value={service.id}>
              {service.nom}
            </MenuItem>
          ))}
        </Select>

        <Button variant="contained" color="primary" onClick={handleUpdateReclamation}>
          Update Reclamation
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
  user: state.auth.user,
});

export default connect(mapStateToProps)(ReclamationDetail);
