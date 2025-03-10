import { Button, Container,  IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid  from '@mui/material/Grid2';

const ViewForms = () => {
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
        <Grid  size={12} >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateForm}
            sx={{ mb: 2, textTransform: 'none', backgroundColor: '#2196f3', '&:hover': { backgroundColor: '#1e88e5' } }}
          >
            Create New 1040 Form
          </Button>
        </Grid>
        <Grid  size={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Previous Forms
            </Typography>
            <List>
              {forms.map((form) => (
                <ListItem key={form.id} sx={{ borderBottom: '1px solid #e0e0e0', '&:last-child': { borderBottom: 'none' } }}>
                  <ListItemIcon>
                    <DescriptionIcon sx={{ color: '#2196f3' }} />
                  </ListItemIcon>
                  <ListItemText primary={form.name} secondary={`Created on: ${form.date}`} />
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteForm(form.id)}>
                    <DeleteIcon sx={{ color: '#f44336' }} />
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

export default ViewForms;