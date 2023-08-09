import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Select, MenuItem, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReclamationsGrid = ({ access }) => {
  const [reclamations, setReclamations] = useState([]);
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredReclamations, setFilteredReclamations] = useState([]); // Add this line

  const rowsPerPage = 15;

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
        setReclamations(response.data);
      } catch (error) {
        console.error('Error fetching reclamations:', error);
      }
    };
    fetchReclamations();
  }, [access]);

  useEffect(() => {
    
    const _filteredReclamation = statusFilter === 'all'
      ? reclamations
      : reclamations.filter(reclamation => reclamation.status === statusFilter);

    setFilteredReclamations(_filteredReclamation);
  }, [ reclamations, statusFilter]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const navigate = useNavigate();

  const handleReclamationClick = (reclamationId) => {
    navigate(`/reclamations/${reclamationId}`);
  };

  return (
    <Box mt={4} mx="auto" width="90%">
      <InputLabel htmlFor="status-filter">Status Filter</InputLabel>
      <Select
        value={statusFilter}
        onChange={handleStatusFilterChange}
        variant="outlined"
        sx={{ marginBottom: 2 }}
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="affected">Affected</MenuItem>
        <MenuItem value="closed">Closed</MenuItem>
      </Select>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reclameur</TableCell>
              <TableCell>Technician</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Date Affectation</TableCell>
              <TableCell>Date Saisie</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReclamations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((reclamation) => (
              <TableRow
                key={reclamation.id}
                onClick={() => handleReclamationClick(reclamation.id)} // Add onClick event
                style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
              >
                <TableCell>{reclamation.id}</TableCell>
                <TableCell>{reclamation.description}</TableCell>
                <TableCell>{reclamation.status}</TableCell>
                <TableCell>{reclamation.reclameur ? `${reclamation.reclameur.nom}` : 'N/A'}</TableCell>
                <TableCell>{reclamation.technician ? reclamation.technician.username : 'Not Assigned'}</TableCell>
                <TableCell>{reclamation.service ? `${reclamation.service.nom}` : 'Not Assigned'}</TableCell>
                <TableCell>{reclamation.date_affectation}</TableCell>
                <TableCell>{reclamation.date_saisie}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredReclamations.length}
        rowsPerPage={rowsPerPage}s
        page={page}
        onPageChange={handleChangePage}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  access: state.auth.access,
});

export default connect(mapStateToProps)(ReclamationsGrid);
