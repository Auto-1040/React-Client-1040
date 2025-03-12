import React, { useContext, useEffect, useState } from 'react';
import { Box, Drawer, Tab, Tabs, IconButton } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import UserContext from './User/UserContext';
import { ModalContext } from './ModalContext';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { openLogin } = useContext(ModalContext);

  useEffect(() => {
    if (!user.id) {
      openLogin();
      navigate('/');
    }
    else
      navigate('dashboard/view-forms');
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      navigate('dashboard/view-forms');
    } else if (newValue === 1) {
      navigate('/dashboard/user-information/personal');
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fafafa', mt: 8 }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerOpen ? 240 : 60,
            boxSizing: 'border-box',
            mt: 8,
            ml: 0,
            overflowX: 'hidden',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', p: 1 }}>
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Box>
        <Tabs
          orientation="vertical"
          value={selectedTab}
          onChange={handleTabChange}
          sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'flex-end' }}
        >
          <Tab
            icon={<ViewListIcon />}
            iconPosition="start"
            label={drawerOpen ? "View Forms" : ""}
            sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
          />
          <Tab
            icon={<PersonIcon />}
            iconPosition="start"
            label={drawerOpen ? "Personal Information" : ""}
            sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
          />
        </Tabs>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;