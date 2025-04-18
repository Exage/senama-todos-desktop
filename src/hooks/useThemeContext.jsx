import { useContext } from 'react'
import { ThemeContext } from '../contexts/ThemeContext'

export const useThemeContext = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw Error('useThemeContext must be used inside an ThemeContextProvider')
    }

    return context
}