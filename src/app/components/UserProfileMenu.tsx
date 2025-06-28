'use client';

import React, { useState } from 'react';
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Switch,
  Divider,
  Box,
} from '@mui/material';
import { DarkMode, Person, Settings, Logout } from '@mui/icons-material';
import { authService } from '@/services/api/auth'; // Adjust the import path as necessary
import { useTheme } from 'next-themes';
import { useAuth } from '@/context/AuthContext'; // Adjust the import path as necessary
import { useRouter } from 'next/navigation'; // Use the correct import for useRouter

export default function UserProfileMenu() {
  // State to manage the menu anchor element
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const open = Boolean(anchorEl);
  const { isLoggedIn, login, logout } = useAuth(); // Use the auth context to manage login state

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    handleClose(); // Close the menu after   authService.logout();
    router.push('/'); // Redirect to login page after logout
    // Optionally, you can redirect the user after logout
    // window.location.href = '/login'; // Redirect to login page
  };

  if (!isLoggedIn) return null; // Hide menu if not logged in

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          border: 2,
          borderColor: 'black',
          p: 0.5,
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: 'black',
            color: 'white',
          }}
        >
          DU
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            border: 2,
            borderColor: 'black',
            mt: 1.5,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              mb: 1,
              bgcolor: 'black',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onClick={() => alert('Avatar selection coming soon!')}
          >
            DU
          </Avatar>
          <Box>User Name</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>user@email.com</Box>
        </Box>

        <Divider sx={{ my: 1, borderColor: 'grey.300' }} />

        <MenuItem onClick={handleThemeChange}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark Mode</ListItemText>
          <Switch edge="end" checked={theme === 'dark'} onChange={handleThemeChange} />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 1, borderColor: 'grey.300' }} />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
