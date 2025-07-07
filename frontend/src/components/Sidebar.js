import React, { memo, useEffect, forwardRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme, styled, alpha } from '@mui/material/styles';
import { 
  FaTachometerAlt, FaFileAlt, FaCode, FaQuestionCircle,
  FaUserTie, FaStar, FaRoad, FaLaptopCode,
  FaTimes, FaSignOutAlt
} from 'react-icons/fa';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  Box,
  Typography,
  Avatar,
  Tooltip,
  Zoom
} from '@mui/material';

// Create a styled ListItemButton component that works with react-router
const ListItemButtonLink = forwardRef(({ to, selected, ...props }, ref) => (
  <ListItemButton
    ref={ref}
    component={RouterLink}
    to={to}
    selected={selected}
    {...props}
  />
));

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'drawerWidth' && prop !== 'isMobile' && prop !== 'isClosing',
})(({ theme, drawerWidth, isMobile, isClosing }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    overflowX: 'hidden',
    ...(isMobile ? {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: theme.zIndex.drawer + 2,
      transform: isClosing ? 'translateX(-100%)' : 'translateX(0)',
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '&.MuiDrawer-paperAnchorLeft': {
        borderRight: 'none',
      },
    } : {
      position: 'relative',
      height: '100vh',
      borderRight: 'none',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
  '& .MuiBackdrop-root': {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const Sidebar = memo(({ isOpen, onClose, user, onItemClick, width = 280, isMobile = false, isClosing = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  // Using the isMobile prop passed from parent component
  
  // Navigation items for the sidebar
  const navItems = [
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', show: true },
    { path: '/coding', icon: <FaCode />, label: 'Coding', show: true },
    { path: '/mcqs', icon: <FaQuestionCircle />, label: 'MCQs', show: true },
    { path: '/resume', icon: <FaFileAlt />, label: 'Resume Builder', show: true },
    { path: '/roadmap', icon: <FaRoad />, label: 'Learning Path', show: true },
    { path: '/reviews', icon: <FaStar />, label: 'Interview Reviews', show: true },
    { path: '/face-to-face', icon: <FaLaptopCode />, label: 'Mock Interview', show: true },
  ];
  
  // Filter out items that shouldn't be shown
  const filteredNavItems = navItems.filter(item => item.show !== false);

  // Close sidebar when route changes (only on mobile)
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, onClose, isMobile, isOpen]);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
    onClose();
  };

  const drawerContent = (
    <>
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px',
          minHeight: '64px',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user?.avatar ? (
            <Avatar 
              src={user.avatar} 
              alt={user.name || 'User'}
              sx={{ width: 36, height: 36, mr: 1.5 }}
            />
          ) : (
            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, mr: 1.5 }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </Avatar>
          )}
          <Box>
            <Typography variant="subtitle2" noWrap>
              {user?.name || 'Guest'}
            </Typography>
            <Typography variant="caption" noWrap>
              {user?.email || ''}
            </Typography>
          </Box>
        </Box>
        {isMobile && (
          <IconButton 
            onClick={onClose} 
            color="inherit"
            sx={{
              '&:hover': {
                backgroundColor: alpha('#fff', 0.1),
              },
            }}
          >
            <FaTimes />
          </IconButton>
        )}
      </Box>
      <Divider />
      <List sx={{ pt: 1 }}>
        {filteredNavItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem 
              key={item.path}
              disablePadding
              sx={{
                '& .Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderLeft: '4px solid',
                  borderLeftColor: 'primary.main',
                  paddingLeft: '12px',
                },
              }}
            >
              <Tooltip 
                title={item.label}
                placement="right"
                TransitionComponent={Zoom}
                disableHoverListener={isOpen}
                arrow
              >
                <ListItemButtonLink
                  to={item.path}
                  selected={isSelected}
                  onClick={onItemClick}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      transform: 'translateX(4px)',
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                        transform: 'translateX(4px)',
                      },
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 40, 
                      color: isSelected ? 'primary.main' : 'text.primary',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label} 
                    primaryTypographyProps={{
                      fontWeight: isSelected ? 'fontWeightMedium' : 'fontWeightRegular',
                    }}
                  />
                </ListItemButtonLink>
              </Tooltip>
            </ListItem>
          );
        })}
        
        {user && (
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                color: 'error.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'error.main' }}>
                <FaSignOutAlt />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={isOpen}
      onClose={onClose}
      width={width}
      isMobile={isMobile}
      isClosing={isClosing}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
        disableScrollLock: true,
      }}
      sx={{
        display: { xs: isMobile ? 'block' : 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
});

export default Sidebar;