import { Theme } from "../constants/Theme"
import { useThemeContext } from "../hooks/useThemeContext"

export const Loader = () => {
    const { isDark } = useThemeContext()

    const currentTheme = isDark ? "dark" : "light"

    return (
        <div
            className="loader"
            style={{
                borderColor: Theme.colors[currentTheme].colorTextBase,
                borderBottomColor: Theme.colors[currentTheme].colorPrimary,
            }}
        ></div>
    )
}
