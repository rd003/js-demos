import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Layout from "./components/Layout"
import NotFound from "./components/NotFound"
import Dashboard from "./components/Dashboard"
import Person from './components/person/Person'
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const loginUser = (user) => setUser(user);
  const logoutUser = () => setUser(null);

  useEffect(() => {
    // I am setting up axios interceptor to handle auth failures

    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logoutUser();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    ; (async () => {
      setLoading(true);
      try {
        var res = await axios.get('/api/auth/me');
        loginUser(res.data);
      }
      catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate, location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <AuthProvider value={{ user, loginUser, logoutUser }}>
      <div>
        <Routes>
          <Route index element={<UnprotectedRoute isAuthenticated={!!user}><Login /></UnprotectedRoute>} />
          <Route path="login" element={<UnprotectedRoute isAuthenticated={!!user}><Login /></UnprotectedRoute>} />
          <Route path="signup" element={<UnprotectedRoute isAuthenticated={!!user}><Signup /></UnprotectedRoute>} />

          <Route element={<ProtectedRoute isAuthenticated={!!user}><Layout /></ProtectedRoute>} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="person" element={<Person />} />
          </Route>

          <Route path="*" element={<NotFound />} />

        </Routes>

      </div >
    </AuthProvider>)
}

const ProtectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  return isAuthenticated === true ? (children)
    : (<Navigate to="/login" replace state={{ path: location.pathname }} />);
}

const UnprotectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  return isAuthenticated === true ? <Navigate to="/dashboard" replace state={{ path: location.pathname }} /> : children;
}

export default App