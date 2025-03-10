import React from 'react';
import { Box, Button, Container,  Paper, Typography, List, ListItem, ListItemText, ListItemIcon, IconButton } from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard = () => {
  const forms = [
    { id: 1, name: 'Form 1040 - 2022', date: '2023-01-15' },
    { id: 2, name: 'Form 1040 - 2021', date: '2022-01-15' },
    // Add more forms as needed
  ];

  const handleCreateForm = () => {
    // Logic to create a new form
    console.log('Create new form');
  };

  const handleDeleteForm = (id: number) => {
    // Logic to delete a form
    console.log(`Delete form with id: ${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateForm}
            sx={{ mb: 2, textTransform: 'none', backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1e88e5' } }}
          >
            Create Form 1040
          </Button>
        </Grid>
        <Grid size={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Previous Forms
            </Typography>
            <List>
              {forms.map((form) => (
                <ListItem key={form.id} sx={{ borderBottom: '1px solid #e0e0e0' }}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={form.name} secondary={`Created on: ${form.date}`} />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteForm(form.id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;