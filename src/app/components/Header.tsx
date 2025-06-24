'use client'

import Logo from "@/app/components/Logo"; // Importing Logo component for the header
import Link from "next/link"; // Importing Link from next/link for client-side navigation 
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ViewSwitcher from "./ViewSwitcher";
import UserProfileMenu from "./UserProfileMenu";

// import ViewSwitcher from "./ViewSwitcher";
// import TodoListModal from "./TodoListModal";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 border-b border-border bg-white gap-2">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2"><Logo width={80} height={80} />
        <span className="font-raleway font-bold text-xl text-black">
          Zoku
          </span>
          </Link>
          
      </div>
      
      <div className="flex items-center gap-4">
        {/* Add Todo List Modal trigger here */}
        {/* <TodoListModal />
        <ViewSwitcher /> */}
        <nav className="flex gap-3">
          {/* <Button
            variant="outline"
            className="px-5"
            onClick={() => router.push("/signup")}

              // alert("Sign Up not implemented in prototype.")
          >
            Sign Up
          </Button> */}
          <ViewSwitcher />
          <UserProfileMenu />
          <Button
            variant="default"
            className="px-20"
            onClick={() => router.push("/login")}
          >
            Demo Login
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
