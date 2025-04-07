import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "antd/dist/reset.css"
import "./index.css"
import App from "./App.jsx"

import { ThemeProvider } from "./contexts/ThemeContext.jsx"
import { TodosContextProvider } from "./contexts/TodosContext.jsx"

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <TodosContextProvider>
                <App />
            </TodosContextProvider>
        </ThemeProvider>
    </StrictMode>
)
