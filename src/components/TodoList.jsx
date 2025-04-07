import { useEffect } from "react"
import { List } from "antd"

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

    const isLoading = isDeleting || isUpdating

    useEffect(() => {
        const getTodos = async () => {
            const todos = await fetchTodos()

            const sorted = [...todos].sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )

            dispatch({ type: todosContextActions.set, payload: sorted })
        }

        getTodos()
    }, [])

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
        <List
            bordered
            dataSource={todos}
            style={{ marginTop: "24px" }}
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
    )
}
