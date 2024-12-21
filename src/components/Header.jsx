import { motion } from 'framer-motion';
import { CreditCard, LogOut, Package, User, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "../context/Theme-Provider";
import { useAuth } from "../hooks/UseAuth";
import NotificationBell from "./Notification";
import { ThemeToggle } from "./theme-toggle";
function Header() {
   
  const { theme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
   logout(); // Call the logout function from useAuth
   navigate("/"); // Redirect the user to the login page after logout
 };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 text-black">
        <Link to={"/dashboard"}>
        <motion.img
            src={theme === "dark" ? "/logo.png" : "/logo2.png"}
            alt="Klimate logo"
            className="h-14"
            initial={{ x: 0, y: 0, rotate: 0 }}
      animate={{
        x: ["0px", "30px", "-30px", "0px"], // Drifting horizontally
        y: ["0px", "10px", "-10px", "0px"], // Drifting vertically
        rotate: [0, 5, -5, 0], // Slight rotation
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
          />
        </Link>

        <div className="flex gap-4">
          <ThemeToggle />
          <div>
            <NotificationBell />
          </div>
          
            <div className="ml-auto relative">
               <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                     <AvatarImage src="https://github.com/shadcn.png" />
                     <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
               </DropdownMenuTrigger>
               <DropdownMenuContent asChild>
               <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-56 bg-white shadow-lg rounded-md dark:bg-gray-800 dark:text-gray-300"
          >
               {/* className="w-56 bg-white shadow-lg rounded-md dark:bg-gray-800 dark:text-gray-300"> */}
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-200 font-semibold">
                     My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-t my-2 dark:border-gray-700" />
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                     <User size={16} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                     <CreditCard size={16} /> Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                     <Users size={16} /> Team
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                     <Package size={16} /> Subscription
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={handleLogout}
                  >
                     <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                  </motion.div>
               </DropdownMenuContent>
               </DropdownMenu>
            </div>
           
        </div>
      </div>
    </header>
  );
}

export default Header;
