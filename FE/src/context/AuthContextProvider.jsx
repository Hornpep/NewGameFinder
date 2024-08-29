import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { whoAmI, logout } from '../data/auth';
import { AuthContext } from '.';

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkSession, setCheckSession] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await whoAmI();
        setUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error(error);
      } finally {
        setCheckSession(false);
      }
    };
    checkSession && getUser();
  }, [checkSession]);

  const signout = async () => {
    try {
      await logout();
      toast.success('You have been logged out');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, signout, user, setIsAuthenticated, setCheckSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;