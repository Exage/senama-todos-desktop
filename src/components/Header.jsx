import { Typography, Button } from "antd"
import { BulbOutlined, MoonOutlined } from "@ant-design/icons"
import { useThemeContext } from "../hooks/useThemeContext"

const { Title } = Typography

export const Header = () => {
    const { toggleTheme, isDark } = useThemeContext()

    return (
        <header className="header">
            <Title style={{ marginBottom: 0 }}>Todo App</Title>
            <Button
                type="primary"
                shape="circle"
                icon={isDark === "light" ? <MoonOutlined /> : <BulbOutlined />}
                onClick={toggleTheme}
            />
        </header>
    )
}
