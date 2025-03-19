import React, { useState } from 'react';
import { Box, Drawer, Tab, Tabs, Button, useTheme } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const sections = [
  'Personal Information',
  'Spouse Information',
  'Dependents Information',
  'Address Information'
];

const UserInfo = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();
  const theme = useTheme();

  const nextTab = () => {
    if (currentSection < 4) {
      setCurrentSection(currentSection + 1);
      handleSectionChange(null, currentSection + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleSectionChange = (_: React.SyntheticEvent | null, newValue: number) => {
    setCurrentSection(newValue);
    switch (newValue) {
      case 0:
        navigate('personal');
        break;
      case 1:
        navigate('spouse');
        break;
      case 2:
        navigate('dependents');
        break;
      case 3:
        navigate('address');
        break;
      
      default:
        navigate('personal');
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.background.default }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            mt: 8
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/dashboard')}
            sx={{ textTransform: 'none' }}
          >
            Dashboard
          </Button>
        </Box>
        <Tabs
          orientation="vertical"
          value={currentSection}
          onChange={handleSectionChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {sections.map((section, index) => (
            <Tab key={index} label={section} sx={{ textTransform: 'none' }} />
          ))}
        </Tabs>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, mt: 8, ml: 0 }}>
        <Outlet context={{ nextTab }} />
      </Box>
    </Box>
  );
};

export default UserInfo;