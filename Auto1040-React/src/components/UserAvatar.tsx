import React, { useContext, useState } from "react";
import { Avatar, Typography, IconButton, Menu, MenuItem, } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from "./UserContext";
import { stringAvatar } from "./Styles";

const UserAvatar = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    userDispatch({
      type: "DELETE_USER",
    });
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <Avatar {...stringAvatar(`${user.username}`)} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem
          onClick={() => {
            handleMenuClose();
          }}
        >
          <SettingsIcon sx={{ mr: 1 }} /> Settings
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />Logout
        </MenuItem>
      </Menu>
      <Typography variant="h6" component="div" sx={{ m: 1 }}>
        {user.username}
      </Typography>
    </>
  );
};

export default UserAvatar;
