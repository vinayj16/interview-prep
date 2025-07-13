import React, { memo, useEffect, useState, forwardRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { 
  FaTachometerAlt, FaFileAlt, FaCode, FaQuestionCircle,
  FaStar, FaRoad, FaLaptopCode, FaUser, FaSignOutAlt,
  FaBars, FaTimes, FaHome, FaBook, FaChalkboardTeacher,
  FaClipboardList, FaComments, FaProjectDiagram, FaCog,
  FaMoon, FaSun, FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Tooltip,
  Zoom,
  IconButton,
  Divider,
  Switch,
  Badge,
  Avatar,
  useMediaQuery
} from '@mui/material';
import { useApp } from '../context/AppContext';
import { useTheme as useThemeContext } from '../context/ThemeContext';

// Styled components
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
    backgroundColor: 'var(--sidebar-bg)',
    color: 'var(--sidebar-text)',
    borderRight: '1px solid var(--sidebar-border)',
    transition: 'background-color 0.3s ease, border-color 0.3s ease',
    boxSizing: 'border-box',
    overflowX: 'hidden',
    ...(isMobile ? {
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      zIndex: theme.zIndex.drawer + 2,
      transform: isClosing ? 'translateX(-100%)' : 'translateX(0)',
      transition: 'width 0.3s ease, transform 0.3s ease',
      '&.MuiDrawer-paperAnchorLeft': {
        borderRight: 'none',
      },
    } : {
      position: 'relative',
      height: '100vh',
      borderRight: 'none',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[3],
      transition: 'width 0.3s ease, transform 0.3s ease',
    }),
  },
  '& .MuiBackdrop-root': {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },
}));

// Main Sidebar component
const Sidebar = memo(({ isOpen, onClose, isMobile: isMobileProp = false }) => {
  const { theme, toggleTheme } = useThemeContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isDarkMode = theme === 'dark';
  const width = 240; // or your preferred sidebar width in pixels
  
  // Navigation items for the sidebar
  const navItems = [
    { path: '/', icon: <FaHome />, label: 'Home', show: true },
    { path: '/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', show: true },
    { path: '/coding', icon: <FaCode />, label: 'Coding', show: true },
    { path: '/mcqs', icon: <FaQuestionCircle />, label: 'MCQs', show: true },
    { path: '/resume', icon: <FaFileAlt />, label: 'Resume Builder', show: true },
    { path: '/roadmap', icon: <FaRoad />, label: 'Learning Path', show: true },
    { path: '/reviews', icon: <FaStar />, label: 'Interview Reviews', show: true },
    { path: '/face-to-face', icon: <FaLaptopCode />, label: 'Mock Interview', show: true },
  ];

  // Close sidebar when route changes (only on mobile)
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  // Handle logout
  const handleLogout = () => {
    actions.logout();
    navigate('/login');
    onClose();
  };

  // Toggle sidebar collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Filter out items that shouldn't be shown
  const filteredNavItems = navItems.filter(item => item.show !== false);

  // Check if any nav items should be shown
  const showNavSection = filteredNavItems.length > 0;

  const drawerContent = (
    <>
      {/* Header */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          minHeight: '64px',
          background: theme === 'dark'
            ? 'linear-gradient(135deg, #1a237e 0%, #2a3a8f 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          position: 'relative',
        }}
      >
        {!isCollapsed && (
          <>
            <Box sx={{ textAlign: 'center', mb: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                InterviewPrep
            </Typography>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.9,
                  fontSize: '0.75rem'
                }}
              >
                Your Interview Success Partner
            </Typography>
          </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
  {state.user?.name ? (
    <Box sx={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: '#e0e7ef',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: '1.2rem',
      color: '#3b82f6',
      border: '2px solid var(--primary-color)'
    }}>
      {state.user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2)}
    </Box>
  ) : (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="#e0e7ef" />
      <path d="M24 26c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5zm0-2a5 5 0 100-10 5 5 0 000 10z" fill="#3b82f6" />
    </svg>
  )}
        </Box>
          </>
        )}

          <IconButton 
          onClick={toggleCollapse}
            sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            backgroundColor: isCollapsed ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.3)',
              '&:hover': {
              backgroundColor: isCollapsed ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.4)',
              },
            }}
          >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </IconButton>
      </Box>

      {/* Navigation Items */}
      <List sx={{ pt: 1, px: isCollapsed ? 0 : 1 }}>
        {filteredNavItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <ListItem 
              key={item.path}
              disablePadding
              sx={{
                display: 'block',
                '& .Mui-selected': {
                  backgroundColor: 'action.selected',
                  borderLeft: '4px solid',
                  borderLeftColor: 'primary.main',
                  paddingLeft: '12px',
                },
              }}
            >
              <Tooltip 
                title={isCollapsed ? item.label : ''}
                placement="right"
                TransitionComponent={Zoom}
                arrow
              >
                <ListItemButtonLink
                  to={item.path}
                  selected={isSelected}
                  onClick={onClose}
                  sx={{
                    minHeight: 48,
                    justifyContent: isCollapsed ? 'center' : 'flex-start',
                    px: isCollapsed ? 0 : 2.5,
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    transition: 'all 0.2s',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      ...(isCollapsed ? {} : { transform: 'translateX(4px)' }),
                    },
                    '&.Mui-selected': {
                      backgroundColor: 'action.selected',
                      '&:hover': {
                        backgroundColor: 'action.selected',
                      },
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 'auto',
                      mr: isCollapsed ? 0 : 2,
                      justifyContent: 'center',
                      color: isSelected ? 'var(--primary-color)' : 'var(--text-secondary)',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!isCollapsed && (
                  <ListItemText 
                    primary={item.label} 
                      sx={{
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'opacity 0.2s',
                        '& .MuiListItemText-primary': {
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? 'var(--primary-color)' : 'var(--text-primary)',
                        },
                      }}
                    />
                  )}
                </ListItemButtonLink>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* Settings Section */}
      <Divider sx={{ my: 1 }} />
      <List sx={{ pt: 0, px: isCollapsed ? 0 : 1, mt: 'auto' }}>
        {/* Logout Button */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <Tooltip
            title={isCollapsed ? 'Logout' : ''}
            placement="right"
            TransitionComponent={Zoom}
            arrow
          >
            <ListItemButton
              onClick={handleLogout}
              sx={{
                minHeight: 48,
                justifyContent: isCollapsed ? 'center' : 'flex-start',
                px: isCollapsed ? 0 : 2.5,
                borderRadius: 1,
                mx: 1,
                my: 0.5,
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'error.light',
                  color: 'error.main',
                  ...(isCollapsed ? {} : { transform: 'translateX(4px)' }),
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  mr: isCollapsed ? 0 : 2,
                  justifyContent: 'center',
                  color: 'error.main',
                }}
              >
                <FaSignOutAlt />
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary="Logout"
                  sx={{
                    color: 'error.main',
                    '& .MuiListItemText-primary': {
                      fontWeight: 500,
                    },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
          </ListItem>
      </List>
    </>
  );

  return (
    <StyledDrawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isOpen}
      onClose={onClose}
      drawerWidth={isCollapsed ? 72 : width}
      isMobile={isMobile}
      isClosing={!isOpen}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: isCollapsed ? 72 : width,
          borderRight: 'none',
          transition: 'width 0.3s ease, transform 0.3s ease',
        },
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
});

export default memo(Sidebar);