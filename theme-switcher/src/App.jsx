import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import ThemeToggle from './components/ThemeToggle';


function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <MainContent />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App