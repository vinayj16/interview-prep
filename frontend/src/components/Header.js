import React, { useState, useEffect, memo } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaSun, 
  FaMoon, 
  FaBars,
  FaTimes,
  FaSignInAlt, 
  FaUserPlus, 
  FaSignOutAlt,
  FaHome,
  FaUsers,
  FaEnvelope,
  FaInfoCircle
} from 'react-icons/fa';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Tooltip, 
  useMediaQuery, 
  useTheme,
  Box,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingRight: 24, // keep right padding when drawer closed
}));

const Header = memo(({ theme, toggleTheme, user, onLogout, toggleSidebar, isSidebarOpen = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: <FaHome /> },
    { path: '/about', label: 'About', icon: <FaInfoCircle /> },
    { path: '/services', label: 'Services', icon: <FaUsers /> },
    { path: '/contact', label: 'Contact', icon: <FaEnvelope /> },
  ];
  
  // Only show navigation items that should be in the header
  const headerNavItems = navItems.filter(item => 
    ['/', '/about', '/services', '/contact'].includes(item.path)
  );
  
  // For mobile, show menu toggle instead of nav items
  const visibleNavItems = isMobile ? [] : headerNavItems;

  const handleUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseMenu();
    onLogout && onLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleMobileNavOpen = () => setMobileNavOpen(true);
  const handleMobileNavClose = () => setMobileNavOpen(false);

  return (
    <StyledAppBar position="fixed" color="default" elevation={1}>
      <StyledToolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label={isSidebarOpen ? 'close drawer' : 'open drawer'}
            onClick={toggleSidebar}
            sx={{ marginRight: 2, ...(isMobile && { display: 'flex' }) }}
          >
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </IconButton>
          
          {/* Logo/Brand */}
          <Box 
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              mr: 3,
            }}
            aria-label="Go to home page"
          >
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              InterviewPrep
            </Typography>
          </Box>
          
          {/* Desktop nav links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 2 }}>
            {headerNavItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  fontWeight: isActive(item.path) ? 700 : 400,
                  borderBottom: isActive(item.path) ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  minWidth: 'auto',
                  px: 1.5,
                }}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile nav menu button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open navigation menu"
              onClick={handleMobileNavOpen}
              size="large"
            >
              <FaBars />
            </IconButton>
          </Box>
        </Box>
        
        <Drawer
          anchor="left"
          open={mobileNavOpen}
          onClose={handleMobileNavClose}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={handleMobileNavClose}>
            {headerNavItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: isActive(item.path) ? 'primary.main' : 'text.primary',
                  fontWeight: isActive(item.path) ? 700 : 400,
                  borderBottom: isActive(item.path) ? '2px solid #1976d2' : 'none',
                  borderRadius: 0,
                  justifyContent: 'flex-start',
                  width: '100%',
                  mb: 1,
                }}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Tooltip title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="toggle theme"
              sx={{
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </IconButton>
          </Tooltip>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
            <>
              <IconButton
                onClick={handleUserMenu}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ ml: 2 }}
                aria-label="Open user menu"
              >
                <Avatar 
                  sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}
                  alt={user.name || 'User'}
                  src={user.avatar}
                >
                  {user.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate('/profile')} aria-label="Go to profile">
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} aria-label="Logout">
                  <ListItemIcon>
                    <FaSignOutAlt fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
            ) : (
            <Box sx={{ display: 'flex', gap: 1, ml: 1 }}>
              <Button
                component={RouterLink}
                to="/login"
                color="inherit"
                startIcon={<FaSignInAlt />}
                sx={{ textTransform: 'none' }}
                aria-label="Login"
              >
                Login
              </Button>
              <Button
                component={RouterLink}
                to="/register"
                variant="contained"
                color="primary"
                startIcon={<FaUserPlus />}
                sx={{ textTransform: 'none', boxShadow: 'none' }}
                aria-label="Sign Up"
              >
                Sign Up
              </Button>
            </Box>
            )}
          </Box>
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
});

export default Header;