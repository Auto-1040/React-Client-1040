import React, { useState } from 'react';
import { Box, Drawer, Tab, Tabs } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const sections = [
  'Personal Information',
  'Spouse Information',
  'Address Information',
  'Filing Information',
  'Dependents Information'
];

const UserInfo = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const navigate = useNavigate();

  const handleSectionChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentSection(newValue);
    switch (newValue) {
      case 0:
        navigate('personal-information');
        break;
      case 1:
        navigate('spouse-information');
        break;
      case 2:
        navigate('address-information');
        break;
      case 3:
        navigate('filing-information');
        break;
      case 4:
        navigate('dependents-information');
        break;
      default:
        navigate('personal-information');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', backgroundColor: '#f5f5f5', mt: 8 },
        }}
      >
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
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#fafafa', mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default UserInfo;