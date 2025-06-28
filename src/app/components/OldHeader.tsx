"use client";
import { Home } from 'lucide-react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ViewSwitcher from './ViewSwitcher';
import TodoListModal from './TodoListModal';

const OldHeader = () => {
  const router = useRouter();
  return (
    <div className="w-11/12 justify-center bg-white border-b border-border pt-5">
      <header className="max-w-[1920px] mx-auto flex flex-col sm:flex-row justify-between items-center px-8 md:px-12 py-4 gap-2">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Home className="text-black" size={28} aria-label="Home"></Home>
            <span className="font-raleway font-bold text-xl text-black">Zoku</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {/* Add Todo List Modal trigger here */}
          <ViewSwitcher />
          <TodoListModal />

          <nav className="flex gap-3">
            <Button variant="outlined" className="px-5" onClick={() => router.push('/login')}>
              Login
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default OldHeader;
