import { useEffect } from "react"
import "./App.css"

import { Header } from "./components/Header"
import { TodoForm } from "./components/TodoForm"
import { TodoList } from "./components/TodoList"

import { useTodosContext } from "./hooks/useTodosContext"

function App() {
    const { todos } = useTodosContext()
    useEffect(() => {
        console.log(todos)
    }, [todos])
    return (
        <div className="App">
            <Header />
            <TodoForm />
            <TodoList />
        </div>
    )
}

export default App
