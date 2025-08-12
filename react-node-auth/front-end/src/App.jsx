import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Layout from "./components/Layout"
import NotFound from "./components/NotFound"
import Dashboard from "./components/Dashboard"
import Person from './components/person/Person'
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import axiosHttp from './utils/axios.util'

const App = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loginUser = (user) => setUser(user);
  const logoutUser = () => setUser(null);
  const navigate = useNavigate();

  // I am not able to put this interface outside because of useNavigate and logoutUser methods, because hooks are allowed in components only.
  axiosHttp.interceptors.response.use(
    (response) => (response),
    async (error) => {
      const originalRequest = error.config;
      // Don't intercept refresh endpoint failures
      if (originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }
      // Check for 401 Unauthorized and ensure we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          await axiosHttp.post('/auth/refresh', {}, {
            withCredentials: true
          });

          // If refresh is successful, retry the original request
          return axiosHttp(originalRequest);

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

  useEffect(() => {
    const abortController = new AbortController();

    // Initial authentication check
    const checkAuth = async () => {
      setLoading(true);
      try {
        const res = await axiosHttp.get('/auth/me', {
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

    // Cleanup 
    return () => {
      abortController.abort();
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