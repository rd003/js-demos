import { useTheme } from "../contexts/ThemeContext"

const MainContent = () => {
    const { theme } = useTheme();
    return (
        <main style={{
            backgroundColor: theme === 'light' ? '#fff' : '#222',
            color: theme === 'light' ? '#333' : '#fff',
            padding: '40px',
            minHeight: '300px'
        }}>
            <h2>Welcome to the Main Content!</h2>
            <p>
                This component automatically gets the theme from context.
                No props needed!
            </p>
            <p>
                Notice how both Header and MainContent use the same theme
                without passing props between them.
            </p>
        </main>
    )
}

export default MainContent