import React, { useContext, useEffect, useState } from 'react';
import { Box, Drawer, Tab, Tabs, IconButton } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import ViewListIcon from '@mui/icons-material/ViewList';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import UserContext from '../user/UserContext';
import { ModalContext } from '../ModalContext';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const { openLogin } = useContext(ModalContext);
  const location = useLocation();

  const tabsConfig = [
    {
      label: "Generate 1040 Form",
      icon: <AddIcon />,
      path: "create-1040",
    },
    {
      label: "Personal Information",
      icon: <PersonIcon />,
      path: "/dashboard/user-information/personal",
    },
    {
      label: "Archived Tax Forms",
      icon: <ViewListIcon />,
      path: "view-forms",
    },
  ];

  useEffect(() => {
    if (!user.id) {
      openLogin();
      navigate('/');
    }
  }, [user, navigate, openLogin]);

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate(tabsConfig[selectedTab].path);
    } else {
      navigate(`/dashboard/${tabsConfig[selectedTab].path}`);
    }
    console.log(selectedTab);
  }, []);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    navigate(tabsConfig[newValue].path);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fafafa', zIndex: theme.zIndex.appBar }}>
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
          {tabsConfig.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              iconPosition="start"
              label={drawerOpen ? tab.label : ""}
              sx={{ textTransform: 'none', justifyContent: 'flex-start' }}
              onClick={(event) => handleTabChange(event, index)}
            />
          ))}
        </Tabs>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: theme.palette.background.default, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;