'use client';

import React, { useState, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton, Menu, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo';
import ViewSwitcher from './ViewSwitcher';
import CreateMenu from './CreateMenu';
import UserProfileMenu from './UserProfileMenu';
import TodoListSidebar from './TodoListSidebar';
import { useAuth } from '@/context/AuthContext';

// Memoize the Logo component to prevent unnecessary re-renders
const MemoizedLogo = memo(Logo);

const Header = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  // MenuItems component reused for both desktop and mobile
  const MenuItems = ({ onClose }: { onClose?: () => void }) => (
    <>
      {isLoggedIn ? (
        <>
          <Box sx={{ my: 1 }}>
            <TodoListSidebar />
          </Box>
          <Box sx={{ my: 1 }}>
            <ViewSwitcher />
          </Box>
          <Box sx={{ my: 1 }}>
            <CreateMenu />
          </Box>
          <Box sx={{ my: 1 }}>
            <UserProfileMenu />
          </Box>
        </>
      ) : (
        <Button
          size="small"
          variant="contained"
          fullWidth
          sx={{ fontSize: '0.9rem', py: 1, borderRadius: 1 }}
          onClick={() => {
            router.push('/login');
            onClose?.();
          }}
        >
          Demo Login
        </Button>
      )}
    </>
  );

  return (
    <div className="w-11/12 items-center bg-white border-b border-border">
      <header className="max-w-[1920px] mx-auto flex flex-row justify-between items-center px-8 md:px-12 py-4">
        <Link href="/">
          <div className="flex items-center gap-2">
            <MemoizedLogo width={70} height={70} className="text-black" aria-label="Logo" />
            <span className="font-raleway font-bold text-xl text-black">Zoku</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <MenuItems />
        </div>

        {/* Mobile Menu Button and Dropdown */}
        <div className="md:hidden">
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            sx={{ border: 1, borderColor: 'black', p: 0.5 }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { minWidth: 160, p: 1, borderRadius: 2 },
            }}
          >
            <Box display="flex" flexDirection="column" gap={1}>
              <MenuItems onClose={handleMenuClose} />
            </Box>
          </Menu>
        </div>
      </header>
    </div>
  );
};

export default memo(Header);
