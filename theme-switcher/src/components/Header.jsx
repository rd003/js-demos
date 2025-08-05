import { useTheme } from "../contexts/ThemeContext"

function Header() {
    const { theme } = useTheme();
    return (
        <header style={{
            backgroundColor: theme === 'light' ? '#f0f0f0' : '#333',
            color: theme === 'light' ? '#333' : '#f0f0f0',
            padding: '20px',
            textAlign: 'center'
        }}>
            <h1>My App</h1>
            <p>Current theme : {theme}</p>
        </header>
    )
}

export default Header