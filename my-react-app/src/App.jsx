import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import Post from "./components/post/Post";
import User from "./components/User";
import NavBar from './components/NavBar';
import { Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: '15px' }}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/post" element={<Post />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  );
}
