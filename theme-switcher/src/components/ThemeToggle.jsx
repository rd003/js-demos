import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    const handleToggle = () => {
        toggleTheme(theme);
    }
    return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            backgroundColor: theme === 'light' ? '#f9f9f9' : '#444',
            color: theme === 'light' ? '#333' : '#fff'
        }}>
            <button onClick={handleToggle} style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: theme === 'light' ? '#007bff' : '#ffc107',
                color: theme === 'light' ? 'white' : 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
        </div>
    )
}

export default ThemeToggle