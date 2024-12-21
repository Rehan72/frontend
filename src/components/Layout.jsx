import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      {/* <Navbar /> */}

      <div className="flex">
        <Sidebar />
        <main className="min-h-screen container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
