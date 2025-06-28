'use client';

import React, { useState, useEffect, memo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconButton, Drawer, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from './Logo'; // Assuming you have a Logo component
import ViewSwitcher from './ViewSwitcher';
import CreateMenu from './CreateMenu';
import UserProfileMenu from './UserProfileMenu'; // Assuming you have a UserProfileMenu component
import TodoListSidebar from './TodoListSidebar';
import { useAuth } from '@/context/AuthContext';

// Memoize the Logo component to prevent unnecessary re-renders
const MemoizedLogo = memo(Logo);
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn, login, logout } = useAuth();

  const MenuItems = () => (
    <>
      {isLoggedIn ? (
        <>
          <TodoListSidebar />
          <ViewSwitcher />
          <CreateMenu />
          <UserProfileMenu />
        </>
      ) : (
        <Button
          variant="contained"
          className="px-4 w-full md:w-auto"
          onClick={() => router.push('/login')}
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <IconButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black">
            <MenuIcon />
          </IconButton>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <MenuItems />
        </div>

        {/* Mobile Menu Drawer */}
        <Drawer
          anchor="right"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="md:hidden"
        >
          <div className="w-64 p-4 h-full bg-white">
            <MenuItems />
          </div>
        </Drawer>
      </header>
    </div>
  );
};
export default memo(Header);
