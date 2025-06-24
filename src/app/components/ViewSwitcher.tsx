'use client'

import React, { useState } from 'react';
import { 
  Button, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  Typography 
} from '@mui/material';
import { 
  CalendarViewDay, 
  CalendarViewWeek, 
  CalendarViewMonth,
  ViewDay,
  Check,
  KeyboardArrowDown 
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';

const views = [
  { 
    id: 'day', 
    label: 'Day View', 
    path: '/day',
    icon: <CalendarViewDay /> 
  },
  { 
    id: 'three-day', 
    label: 'Three Day View', 
    path: '/three-day',
    icon: <ViewDay /> 
  },
  { 
    id: 'week', 
    label: 'Week View', 
    path: '/week',
    icon: <CalendarViewWeek /> 
  },
  { 
    id: 'month', 
    label: 'Month View', 
    path: '/month',
    icon: <CalendarViewMonth /> 
  },
];

export default function ViewSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const currentView = views.find(view => pathname.startsWith(view.path)) || views[0];
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewChange = (path: string) => {
    router.push(path);
    handleClose();
  };

  return (
    <>
      <Button
        id="view-switcher-button"
        aria-controls={open ? 'view-switcher-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
        sx={{
          color: 'black',
          borderWidth: 2,
          borderColor: 'black',
          '&:hover': {
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'black',
            color: 'white',
          }
        }}
        variant="outlined"
      >
        <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
          {currentView.icon}
        </ListItemIcon>
        {currentView.label}
      </Button>
      <Menu
        id="view-switcher-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'view-switcher-button',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1,
            border: 2,
            borderColor: 'black',
          },
        }}
      >
        {views.map((view) => (
          <MenuItem 
            key={view.id}
            onClick={() => handleViewChange(view.path)}
            selected={pathname.startsWith(view.path)}
          >
            <ListItemIcon>
              {view.icon}
            </ListItemIcon>
            <Typography variant="inherit">{view.label}</Typography>
            {pathname.startsWith(view.path) && (
              <ListItemIcon sx={{ ml: 'auto' }}>
                <Check />
              </ListItemIcon>
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}