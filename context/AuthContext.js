import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (you might want to check a accessToken in localStorage)
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // Fetch user data or set the user state
      setUser({ accessToken }); // Simplified example, ideally you fetch user info from the backend
    } else {
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('accessToken', userData.accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
