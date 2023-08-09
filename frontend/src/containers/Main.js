import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Button, Container, Grid, TextField, Typography ,Alert} from '@mui/material';

const Main = () => {
  const [formData, setFormData] = useState({
    adresse: '',
    cin: '',
    nom: '',
    prenom: '',
    telephone: '',
    description: '',
  });

  const { adresse, cin, nom, prenom, telephone, description } = formData;
  const [alertOpen, setAlertOpen] = useState(false);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const body = JSON.stringify({
        adresse,
        cin,
        nom,
        prenom,
        telephone
      });

      const res1 = await axios.post('http://127.0.0.1:8000/api/reclameurs/', body, config);
      const reclameur = res1.data.id;
      console.log('reclameur created:', res1.data)

      const body2 = JSON.stringify({
        description,
        reclameur
      });
      await axios.post('http://127.0.0.1:8000/api/reclamations/', body2, config);

      setAlertOpen(true); // Open the success alert

    } catch (err) {
      console.log('Error:', err);
    }
  };

  useEffect(() => {
    if (alertOpen) {
      window.location.reload();
    }
  }, [alertOpen]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Container component="form" onSubmit={onSubmit} maxWidth="md" style={{ padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px' }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <img src="https://onedrive.live.com/embed?resid=ADF4A063A5450601%213683&authkey=%21AO4ken-oujkrdO8&width=400&height=403" width="200" height="202" alt="Logo" style={{ margin: '0 auto', borderRadius: '10px' }} />
            <Typography variant="h4" align="center" gutterBottom>
              La Radeef Reclamation
            </Typography>
            <TextField
              fullWidth
              label="CIN"
              variant="outlined"
              name="cin"
              value={cin}
              onChange={onChange}
              placeholder="Enter your CIN"
              required
              margin="normal"
            />
              <TextField
                fullWidth
                label="Nom"
                variant="outlined"
                name="nom"
                value={nom}
                onChange={onChange}
                placeholder="Enter your last name"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Prénom"
                variant="outlined"
                name="prenom"
                value={prenom}
                onChange={onChange}
                placeholder="Enter your first name"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="adresse"
                value={adresse}
                onChange={onChange}
                placeholder="Enter your address"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                name="telephone"
                value={telephone}
                onChange={onChange}
                placeholder="Enter your phone number"
                required
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                onChange={onChange}
                placeholder="Enter your description"
                multiline
                rows={4}
                margin="normal"
              />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            Submit
          </Button>
          {alertOpen && (
              <Alert severity="success" style={{ marginTop: '20px' }}>
                Reclamation created successfully!
              </Alert>
            )}
        </Grid>
      </Grid>
      </Container>
    </div>
  );
};

export default Main;


