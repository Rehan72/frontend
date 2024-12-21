import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-primary">
          <Link to="/">KLIMATE</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm font-medium text-foreground">
          <li>
            <Link
              to="/"
              className="hover:text-primary transition-colors duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-primary transition-colors duration-200"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/service"
              className="hover:text-primary transition-colors duration-200"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-primary transition-colors duration-200"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
