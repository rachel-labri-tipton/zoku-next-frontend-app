'use client'

import Logo from "@/app/components/Logo"; // Importing Logo component for the header
import { useState } from "react"; // Importing React for component creation
import Link from "next/link"; // Importing Link from next/link for client-side navigation 
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ViewSwitcher from "./ViewSwitcher";
import UserProfileMenu from "./UserProfileMenu";
import { useUser } from "@/context/UserContext"; // Importing user context to manage user state


const Header = () => {
  const router = useRouter();
  const { user, setUser } = useUser(); // Using user context to get user state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const theme = useTheme()// State to manage login status

  const handleLogout = () => {
    setUser(null);
    // Additional logout logic...
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-12 py-2 border-b border-border bg-white dark:bg-black">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center"><Logo width={70} height={70} />
        <span className="font-raleway font-bold text-xl text-black dark:text-white">
          Zoku
          </span>
          </Link>
          
      </div>
      
      <div className="flex items-center gap-4">
        {/* Add Todo List Modal trigger here */}
        {/* <TodoListModal />
        <ViewSwitcher /> */}
        <nav className="flex gap-3">

          {isLoggedIn && (
            <>
              <ViewSwitcher />
              <UserProfileMenu />
              <Button 
                variant="outlined"
                className="px-4"
                onClick={setIsLoggedIn(false)}> Logout</Button>
              </>
          )}
          
          {!isLoggedIn && (
            <>
            <Button
            variant="primary"
            className="px-20"
            onClick={() => router.push("/login")}
          >
            Demo Login
              </Button>
            </>)}
        </nav>
      </div>
    </header>
  );
};

export default Header;
