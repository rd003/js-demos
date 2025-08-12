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
    const abortController = new AbortController();

    const interceptor = axios.interceptors.response.use(
      (response) => (response),
      async (error) => {
        const originalRequest = error.config;

        // Check for 401 Unauthorized and ensure we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to refresh the token
            await axios.post('/api/auth/refresh', {}, {
              withCredentials: true
            });

            // If refresh is successful, retry the original request
            return axios(originalRequest);

          } catch (refreshError) {
            // Refresh failed, logout user and redirect to login
            logoutUser();
            navigate('/login');
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Initial authentication check
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/api/auth/me', {
          signal: abortController.signal
        });
        loginUser(res.data);
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.log('Auth check failed:', error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    // Cleanup interceptor on unmount
    return () => {
      abortController.abort();
      axios.interceptors.response.eject(interceptor);
    };
  }, []);


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
  return isAuthenticated === true ? (children)
    : (<Navigate to="/login" replace state={{ path: location.pathname }} />);
}

const UnprotectedRoute = ({ isAuthenticated, children }) => {
  const location = useLocation();
  return isAuthenticated === true ? <Navigate to="/dashboard" replace state={{ path: location.pathname }} /> : children;
}

export default App