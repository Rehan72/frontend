import { motion } from "framer-motion";
import {
  Activity,
  Briefcase,
  Clipboard,
  Home,
  Info,
  LayoutDashboard,
  Phone,
  Users,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Sidebar parent animation
  const sidebarVariants = {
    hidden: { x: -250, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 70, duration: 0.8 },
    },
  };

  // Individual link animation
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Icon animation on hover
  const iconHoverVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 10 },
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "User", path: "/user", icon: Users },
    { name: "Home", path: "/home", icon: Home },
    { name: "Activity", path: "/alter", icon: Activity },
    { name: "About", path: "/about", icon: Info },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Contact", path: "/contact", icon: Phone },
    { name: "Reports", path: "/report", icon: Clipboard },
  ];

  return (
    <motion.aside
      className="w-56 bg-background min-h-screen border-r border-border"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="p-4">
        {/* Logo */}
        <motion.div
          className="text-xl font-bold text-primary mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          KLIMATE
        </motion.div>

        {/* Navigation */}
        <nav>
          <motion.ul
            className="space-y-4"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            {menuItems.map((item, index) => (
              <motion.li key={index} variants={linkVariants}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    location.pathname.startsWith(item.path)
                      ? "flex items-center space-x-3 bg-gray-400 text-white rounded-md p-2 transition-transform duration-300 dark:bg-gray-600 dark:text-white"
                      : "flex items-center space-x-3 text-foreground hover:bg-muted hover:text-primary rounded-md p-2 transition-transform duration-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                >
                  <motion.div
                    variants={iconHoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="text-primary dark:text-gray-300"
                  >
                    <item.icon size={20} />
                  </motion.div>

                  <span>{item.name}</span>
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
