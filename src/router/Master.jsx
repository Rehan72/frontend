import {
   createBrowserRouter,
   Navigate,
   RouterProvider
} from "react-router-dom";
import Login from "../auth/Login";
import Layout from "../components/Layout";
// import Charger from "../pages/charger/Charger";
import { useEffect } from "react";
import SignUp from "../auth/SignUp";
import About from "../pages/about/About";
import ActivityFeedPage from "../pages/activity/ActivityFeedPage";
import Contact from "../pages/contact/Contact";
import Dashboard from "../pages/dashboard/Dashboard";
import ErrorBoundary from "../pages/ErrorBoundary";
import Home from "../pages/home/Home";
import Reports from "../pages/report/Reports";
import Services from "../pages/services/Services";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import User from "../pages/users/User";
import ViewUser from "../pages/users/ViewUser";

const Master = () => {
  //const { isAuthenticated } = useAuth();
  const isAuthenticated = true; // Replace with your authentication logic

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
  };
  useEffect(() => {
    // if (isAuthenticated) {
    //    console.log(isAuthenticated,"Is");
    //   navigate("/dashboard"); // Navigate to dashboard if authenticated
    // }
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/",
      element: isAuthenticated ? <Layout /> : <Login />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        
        
          {
            path: "/user",
            element: <User />,
          },
          {
            path: "/user/add-user",
            element: <AddUser />,
          },
          {
            path: "/edit-user",
            element: <EditUser />,
          },
          {
            path: "/view-user",
            element: <ViewUser />,
          },
          {
            path: "/alter",
            element: <ActivityFeedPage />,
          },
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/services",
            element: <Services />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/report",
            element: <Reports />,
          },
        {
          path: "*",
          element: <ErrorBoundary />,
        },
      ],
    },
  ]);


  return <RouterProvider router={router} />;


};

export default Master;


