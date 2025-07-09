import React, { memo, useEffect, useState, forwardRef } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme, styled, alpha } from '@mui/material/styles';
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
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },
}));

// Main Sidebar component
const Sidebar = memo(({ isOpen, onClose, width = 280 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { state, actions } = useApp();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(theme.palette.mode === 'dark');

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
    { path: '/study-plan', icon: <FaClipboardList />, label: 'Study Plan', show: true },
    { path: '/discussions', icon: <FaComments />, label: 'Discussions', show: true },
    { path: '/projects', icon: <FaProjectDiagram />, label: 'Projects', show: true },
  ];

  // Admin items (only shown for admin users)
  const adminItems = [
    { path: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Admin Dashboard', show: state.user?.role === 'admin' },
    { path: '/admin/users', icon: <FaUser />, label: 'User Management', show: state.user?.role === 'admin' },
    { path: '/admin/content', icon: <FaBook />, label: 'Content Management', show: state.user?.role === 'admin' },
  ];

  // Settings items
  const settingsItems = [
    { path: '/settings/profile', icon: <FaUser />, label: 'Profile', show: true },
    { path: '/settings/account', icon: <FaCog />, label: 'Account', show: true },
    { path: '/settings/appearance', icon: isDarkMode ? <FaMoon /> : <FaSun />, label: 'Appearance', show: true },
  ];

  // Close sidebar when route changes (only on mobile)
  useEffect(() => {
    if (isMobile && isOpen) {
      onClose();
    }
  }, [location.pathname, isMobile, isOpen, onClose]);

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    const newMode = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    actions.setTheme(newMode);
  };

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
  const filteredAdminItems = adminItems.filter(item => item.show !== false);
  const filteredSettingsItems = settingsItems.filter(item => item.show !== false);

  // Check if any admin items should be shown
  const showAdminSection = filteredAdminItems.length > 0;

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
          background: theme.palette.mode === 'dark'
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
              <Avatar
                alt={state.user?.name || 'User'}
                src={state.user?.avatar || '/static/images/avatar/1.jpg'}
                sx={{ width: 48, height: 48, border: `2px solid ${theme.palette.primary.main}` }}
              />
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
            backgroundColor: alpha(theme.palette.primary.main, 0.2),
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.3),
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
                      color: isSelected ? 'primary.main' : 'text.secondary',
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
                          color: isSelected ? 'primary.main' : 'text.primary',
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

      {/* Admin Section (if applicable) */}
      {showAdminSection && (
        <>
          <Divider sx={{ my: 1 }} />
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 1,
              color: 'text.secondary',
              display: isCollapsed ? 'none' : 'block',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 700,
              letterSpacing: '0.05em'
            }}
          >
            Admin
          </Typography>
          <List sx={{ pt: 0, px: isCollapsed ? 0 : 1 }}>
            {filteredAdminItems.map((item) => {
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
                          color: isSelected ? 'primary.main' : 'text.secondary',
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
                              color: isSelected ? 'primary.main' : 'text.primary',
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
        </>
      )}

      {/* Settings Section */}
      <Divider sx={{ my: 1 }} />
      <List sx={{ pt: 0, px: isCollapsed ? 0 : 1, mt: 'auto' }}>
        {filteredSettingsItems.map((item) => {
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
                      color: isSelected ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.label === 'Appearance' ? (
                      <Switch
                        checked={isDarkMode}
                        onChange={handleDarkModeToggle}
                        color="primary"
                        size="small"
                        sx={{
                          '& .MuiSwitch-switchBase': {
                            color: isDarkMode ? '#fff' : '#333',
                          },
                          '& .MuiSwitch-track': {
                            backgroundColor: isDarkMode ? alpha('#fff', 0.3) : alpha('#333', 0.3),
                          },
                        }}
                      />
                    ) : (
                      item.icon
                    )}
                  </ListItemIcon>
                  {!isCollapsed && (
                    <ListItemText
                      primary={item.label}
                      sx={{
                        opacity: isCollapsed ? 0 : 1,
                        transition: 'opacity 0.2s',
                        '& .MuiListItemText-primary': {
                          fontWeight: isSelected ? 600 : 400,
                          color: isSelected ? 'primary.main' : 'text.primary',
                        },
                      }}
                    />
                  )}
                </ListItemButtonLink>
              </Tooltip>
            </ListItem>
          );
        })}

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
          transition: theme.transitions.create(['width', 'transform'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      {drawerContent}
    </StyledDrawer>
  );
});

export default Sidebar;
