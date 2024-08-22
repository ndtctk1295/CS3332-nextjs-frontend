import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (check accessToken in localStorage)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch user data (including role) from the backend or from localStorage
      const userRole = localStorage.getItem('userRole');
      if (userRole) {
        setUser({ accessToken, role: userRole });
      } else {
        // Optionally fetch user data from the backend if needed
        // Example: fetchUserData(accessToken);
      }
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    // console.log('userData', userData);
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('userRole', userData.role);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    setUser({});
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
