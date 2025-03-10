import React, { useState } from 'react';
import { Box, Drawer, Tab, Tabs } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      navigate('/dashboard/view-forms');
    } else if (newValue === 1) {
      navigate('/dashboard/user-information');
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
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          <Tab label="View Forms" sx={{ textTransform: 'none' }} />
          <Tab label="Personal Information" sx={{ textTransform: 'none' }} />
        </Tabs>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#fafafa', mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;