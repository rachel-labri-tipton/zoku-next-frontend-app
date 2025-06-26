'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import { Button, Typography, IconButton, Drawer, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ViewSwitcher from './ViewSwitcher';
import UserProfileMenu from './UserProfileMenu';
import TodoListModal from './TodoListModal';
import Logo from '@/app/components/Logo';

const MemoizedLogo = memo(Logo);

const Header = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Example media query for mobile

  // State to manage mobile view
  // const theme = useTheme()// State to manage login status

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const MenuItems = () => (
    <>
      <TodoListModal />
      <ViewSwitcher />
      <UserProfileMenu />
      <Button
        variant="outlined"
        className="px-4 w-full md:w-auto"
        onClick={() => console.log('Logout clicked')}
      >
        Logout
      </Button>
      <Button
        variant="contained"
        className="px-4 w-full md:w-auto"
        onClick={() => router.push('/login')}
      >
        Demo Login
      </Button>
    </>
  );

  return (
    <header className="sticky w-full top-0 z-50 flex flex-row justify-between items-center md:px-12 py-12 bg-white dark:bg-black dark:text-white">
      <div className="flex items-center pl-5">
        <Link href="/" className="flex items-center">
          <MemoizedLogo width={70} height={70} />
          <h1 className="text-black font-bold font-raleway dark:text-white">Zoku</h1>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-4">
        <MenuItems />
      </div>
      {/* </div> : <IconButton
          className="lg:hidden md:hidden text-black dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <MenuIcon className="lg:hidden md:hidden" />
        </IconButton>} */}
      <div className="md:hidden items-center gap-4">
        <IconButton
          className="text-black dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>
      </div>

      {/* Mobile Menu Drawer */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleMobileMenu}
        className=""
        sx={{
          '& .MuiDrawer-paper': {
            width: '100px', // or any width you prefer
            maxWidth: '80%', // responsive width
          },
        }}
      >
        <div className="w-64 p-4 h-full bg-white dark:bg-gray-900">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <IconButton onClick={toggleMobileMenu} className="text-black dark:text-white">
              <CloseIcon />
            </IconButton>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex flex-col gap-4">
            <MenuItems />
          </div>
        </div>
      </Drawer>
    </header>
  );
};

export default memo(Header);
