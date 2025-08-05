import { createContext, useContext, useState } from "react";

// step 1
const ThemeContext = createContext();

// step 2
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    }

    const value = {
        theme,
        toggleTheme
    }

    return (<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>)
}

// Step 3: Create a custom hook to use the context

export const useTheme = () => {
    const context = useContext(ThemeContext);

    // Always check if context exists

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;

}
