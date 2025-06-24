'use client'

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
  Box
} from '@mui/material';
import {
  DarkMode,
  Person,
  Settings,
  Logout
} from '@mui/icons-material';
import { useTheme } from 'next-themes';

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { theme, setTheme } = useTheme();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{ 
          border: 2,
          borderColor: 'black',
          p: 0.5
        }}
      >
        <Avatar 
          sx={{ 
            width: 32, 
            height: 32,
            bgcolor: 'black',
            color: 'white'
          }}
        >
          U
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
                opacity: 0.8
              }
            }}
            onClick={() => alert('Avatar selection coming soon!')}
          >
            U
          </Avatar>
          <Box>User Name</Box>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            user@email.com
          </Box>
        </Box>

        <Divider sx={{ my: 1, borderColor: 'grey.300' }} />

        <MenuItem onClick={handleThemeChange}>
          <ListItemIcon>
            <DarkMode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Dark Mode</ListItemText>
          <Switch 
            edge="end"
            checked={theme === 'dark'}
            onChange={handleThemeChange}
          />
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>

        <Divider sx={{ my: 1, borderColor: 'grey.300' }} />

        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}