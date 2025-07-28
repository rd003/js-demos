import Home from './pages/Home';
import About from './pages/About'
import NotFound from './pages/NotFound';
import Person from './components/person/Person';

import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/person' element={<Person />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App