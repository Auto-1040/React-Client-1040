"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  Container,
  Tooltip,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Fade,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  PersonAdd as PersonAddIcon,
  Login as LoginIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  CloudUpload as CloudUploadIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import UserContext from "../user/UserContext"
import { ColorModeContext } from "../../App"
import { ModalContext } from "../ModalContext"
import { isTokenExpired } from "../../services/AuthUtils"
import UserSignUp from "../user/UserSignUp"
import UserLogin from "../user/UserLogin"
import { useNavigate } from "react-router"



const Navbar = () => {
  const { user, userDispatch } = useContext(UserContext)
  const theme = useTheme()
  const colorMode = useContext(ColorModeContext)
  const { isLoginOpen, isRegisterOpen, openLogin, closeLogin, openRegister, closeRegister } = useContext(ModalContext)
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const navigate = useNavigate();


  const switchToSignUp = () => {
    closeLogin()
    openRegister()
  }

  const switchToLogin = () => {
    closeRegister()
    openLogin()
  }

  const handleDashboardOpen = () => {
    if (user.id) navigate("dashboard/create-1040")
    else openLogin()
  }

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget)
  }

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null)
  }

  const handleLogout = () => {
    userDispatch({ type: "DELETE_USER" })
    handleUserMenuClose()
    navigate("/")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (savedUser && token && !isTokenExpired(token)) {
      userDispatch({
        type: "CREATE_USER",
        data: JSON.parse(savedUser),
      })
    }
  }, [])

  return (
    <Fade in={true} timeout={800}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.background.default,
          zIndex: theme.zIndex.drawer + 1,
          boxShadow: theme.shadows[2],
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {isMobile && (
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleMobileMenu}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src="/logo2.png?height=40&width=40"
                  alt="EZ1040 Logo"
                  style={{ height: "40px", objectFit: "contain" }}
                />
                {!isMobile && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      ml: 1,
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    EZ1040
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: `${theme.palette.primary.main}10` },
                  }}
                  startIcon={<HomeIcon />}
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: `${theme.palette.primary.main}10` },
                  }}
                  startIcon={<DashboardIcon />}
                  onClick={handleDashboardOpen}
                >
                  Dashboard
                </Button>
                <Button
                  color="primary"
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: `${theme.palette.primary.main}10` },
                  }}
                  startIcon={<CloudUploadIcon />}
                  onClick={() => navigate("dashboard/create-1040")}
                >
                  Create Form
                </Button>
              </Box>
            )}

            {/* User Actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Theme Toggle */}
              <Tooltip title={theme.palette.mode === "dark" ? "Light Mode" : "Dark Mode"}>
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  color="primary"
                  sx={{
                    "&:hover": { backgroundColor: `${theme.palette.primary.main}10` },
                  }}
                >
                  {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </Tooltip>

              {/* User Menu or Login/Register */}
              {user?.id ? (
                <>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleUserMenuOpen}
                      sx={{
                        p: 0,
                        border: `2px solid ${theme.palette.primary.main}`,
                        "&:hover": { backgroundColor: `${theme.palette.primary.main}10` },
                      }}
                    >
                      <Avatar
                        alt={`${user.username || "User"}`}
                        src="/static/images/avatar/2.jpg"
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        {user.username ? user.username[0].toUpperCase() : "U"}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                        mt: 1.5,
                        borderRadius: 2,
                        minWidth: 180,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        navigate("/dashboard/user-information/personal")
                      }}
                    >
                      <ListItemIcon>
                        <PersonIcon fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        navigate("/dashboard/create-1040")
                      }}
                    >
                      <ListItemIcon>
                        <DashboardIcon fontSize="small" />
                      </ListItemIcon>
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        navigate("/dashboard/view-forms")
                      }}
                    >
                      <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                      </ListItemIcon>
                      My Forms
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose()
                        navigate("settings")
                      }}
                    >
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" color="error" />
                      </ListItemIcon>
                      <Typography color="error">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: "flex", gap: 1 }}>
                  {!isMobile && (
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<LoginIcon />}
                      onClick={openLogin}
                      sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        borderRadius: 2,
                      }}
                    >
                      Log in
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PersonAddIcon />}
                    onClick={openRegister}
                    sx={{
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: 2,
                      boxShadow: 2,
                      "&:hover": {
                        boxShadow: 4,
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                  <UserSignUp open={isRegisterOpen} close={closeRegister} switchToLogin={switchToLogin} />
                  <UserLogin open={isLoginOpen} close={closeLogin} switchToSignUp={switchToSignUp} />
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="left"
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{
            "& .MuiDrawer-paper": {
              width: 280,
              boxSizing: "border-box",
              boxShadow: theme.shadows[5],
            },
          }}
        >
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="EZ1040 Logo"
                style={{ height: "32px", objectFit: "contain" }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ ml: 1, fontWeight: 700, color: theme.palette.primary.main }}
              >
                EZ1040
              </Typography>
            </Box>
            <IconButton onClick={toggleMobileMenu}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            <ListItem
              component="button"
              onClick={() => {
                navigate("/")
                toggleMobileMenu()
              }}
            >
              <ListItemIcon>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => {
                handleDashboardOpen()
                toggleMobileMenu()
              }}
            >
              <ListItemIcon>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => {
                navigate("/dashboard/create-1040")
                toggleMobileMenu()
              }}
            >
              <ListItemIcon>
                <CloudUploadIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Create Form" />
            </ListItem>
            <ListItem
              component="button"
              onClick={() => {
                navigate("/dashboard/view-forms")
                toggleMobileMenu()
              }}
            >
              <ListItemIcon>
                <DescriptionIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="My Forms" />
            </ListItem>
          </List>
          <Divider />
          {!user?.id && (
            <Box sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<LoginIcon />}
                onClick={() => {
                  openLogin()
                  toggleMobileMenu()
                }}
                fullWidth
                sx={{ mb: 1, textTransform: "none", borderRadius: 2 }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PersonAddIcon />}
                onClick={() => {
                  openRegister()
                  toggleMobileMenu()
                }}
                fullWidth
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Sign Up
              </Button>
            </Box>
          )}
          {user?.id && (
            <Box sx={{ p: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={() => {
                  handleLogout()
                  toggleMobileMenu()
                }}
                fullWidth
                sx={{ textTransform: "none", borderRadius: 2 }}
              >
                Logout
              </Button>
            </Box>
          )}
        </Drawer>
      </AppBar>
    </Fade>
  )
}

export default Navbar
