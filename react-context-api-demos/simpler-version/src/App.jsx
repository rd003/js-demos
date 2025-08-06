import { useState } from 'react';
import Login from './components/Login';
import Profile from './components/Profile';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  const loginUser = (userData) => {
    setUser(userData);
  }

  const logoutUser = () => setUser(null);

  return (
    <UserProvider value={{ user, loginUser, logoutUser }}>
      <div className="w-full border-2 border-red-300 flex flex-col items-center">
        <Login />
        <Profile />
      </div>
    </UserProvider>
  )
}

export default App