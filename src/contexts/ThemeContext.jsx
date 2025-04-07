import { createContext, useContext, useState, useEffect } from "react"
import { ConfigProvider, theme } from "antd"
import { Theme } from "../constants/Theme"

const THEME_KEY = "theme-mode"

const ThemeSwitcherContext = createContext()

export const useTheme = () => useContext(ThemeSwitcherContext)

export const ThemeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_KEY)

        if (savedTheme === "dark") {
            setIsDark(true)
        } else if (savedTheme === "light") {
            setIsDark(false)
        } else {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
            setIsDark(prefersDark)
            localStorage.setItem(THEME_KEY, prefersDark ? "dark" : "light")
        }
    }, [])

    useEffect(() => {
        const className = isDark ? "dark" : "light"

        document.body.style.backgroundColor = Theme.colors[className].colorBgBase
    }, [isDark])

    const toggleTheme = () => {
        const nextTheme = !isDark ? "dark" : "light"
        localStorage.setItem(THEME_KEY, nextTheme)
        setIsDark((prev) => !prev)
    }

    return (
        <ThemeSwitcherContext.Provider value={{ isDark, toggleTheme }}>
            <ConfigProvider
                theme={{
                    algorithm: isDark
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm,
                    token: {
                        colorPrimary: isDark
                            ? Theme.colors.dark.colorPrimary
                            : Theme.colors.light.colorPrimary,
                        colorBgBase: isDark
                            ? Theme.colors.dark.colorBgBase
                            : Theme.colors.light.colorBgBase,
                        colorTextBase: isDark
                            ? Theme.colors.dark.colorTextBase
                            : Theme.colors.light.colorTextBase,
                        borderRadius: Theme.borderRadius,
                    },
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeSwitcherContext.Provider>
    )
}
