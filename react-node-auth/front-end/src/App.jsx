import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Layout from "./components/Layout"
import NotFound from "./components/NotFound"
import Dashboard from "./components/Dashboard"
import Person from './components/person/Person'
import { Routes, Route } from "react-router";
import axios from 'axios'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {
    ; (async () => {
      var userInfo = (await axios.get('/api/auth/me',
        { withCredentials: true }
      )).data;
      const { username, role } = userInfo;
      console.log({ username, role });
    })();
  }, []);

  return (
    <div>
      <Routes>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="person" element={<Person />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>


    </div>
  )
}

export default App