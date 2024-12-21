import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user] = useState(null); // Store user info
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    // Check if the user is already authenticated when the app loads
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsAuthenticated(true);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (...userDetails) => {
    localStorage.setItem('authToken', 'swsawewesdsewewsasdfsfsdsds');
    setLoading(true);
    setIsAuthenticated(true);
    console.log(userDetails);
    setLoading(false);
  };

  const logout = async () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  const createUser = async (...userDetails) => {
   console.log(userDetails);
   
 };

  return {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    createUser
  };
};
