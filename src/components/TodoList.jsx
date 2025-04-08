import { useEffect, useState } from "react"
import { List, Button } from "antd"

import { useTodosContext } from "../hooks/useTodosContext"
import { useFetchTodos } from "../hooks/useFetchTodos"
import { useDeletTodo } from "../hooks/useDeleteTodo"
import { usePutTodo } from "../hooks/usePutTodo"
import { todosContextActions } from "../constants/TodosContextActions"

import { TodoItem } from "./TodoItem"
import { Loader } from "./Loader"

export const TodoList = () => {
    const { todos, dispatch } = useTodosContext()
    const { fetchTodos, isLoading: isFetching } = useFetchTodos()
    const { deleteTodo, isLoading: isDeleting } = useDeletTodo()
    const { putTodo, isLoading: isUpdating } = usePutTodo()

    const [filter, setFilter] = useState("all")

    const isLoading = isDeleting || isUpdating

    useEffect(() => {
        const getTodos = async () => {
            const fetchedTodos = await fetchTodos()

            const sortedByDate = [...fetchedTodos].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
            )

            dispatch({ type: todosContextActions.set, payload: sortedByDate })
        }

        getTodos()
    }, [])

    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true
        if (filter === "active") return !todo.completed
        if (filter === "completed") return todo.completed
    })

    const handleSave = async (todo) => {
        const updated = await putTodo(todo._id, todo.title, todo.completed)
        dispatch({ type: todosContextActions.update, payload: updated })
    }

    const handleToggleCompleted = async (todo, completed) => {
        const updated = await putTodo(todo._id, todo.title, completed)
        dispatch({ type: todosContextActions.update, payload: updated })
    }

    const handleDelete = async (todo) => {
        const response = await deleteTodo(todo._id)
        dispatch({ type: todosContextActions.delete, payload: response })
    }

    if (isFetching) {
        return (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "210px",
                }}
            >
                <Loader />
            </div>
        )
    }

    return (
        <div style={{ marginTop: "24px" }}>
            <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
                <Button
                    type={filter === "all" ? "primary" : "default"}
                    onClick={() => setFilter("all")}
                >
                    All
                </Button>
                <Button
                    type={filter === "active" ? "primary" : "default"}
                    onClick={() => setFilter("active")}
                >
                    Active
                </Button>
                <Button
                    type={filter === "completed" ? "primary" : "default"}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </Button>
            </div>

            <List
                bordered
                dataSource={filteredTodos}
                renderItem={(item, index) => (
                    <TodoItem
                        key={`${item._id}_${item.completed ? "completed" : "uncompleted"}`}
                        item={item}
                        index={index}
                        onSave={handleSave}
                        onDelete={handleDelete}
                        onToggleCompleted={handleToggleCompleted}
                        isLoading={isLoading}
                    />
                )}
            />
        </div>
    )
}
