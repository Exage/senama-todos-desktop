import { createContext, useReducer } from "react"
import { todosContextActions } from "../constants/TodosContextActions"

export const TodosContext = createContext()

export const todosReducer = (state, action) => {
    switch (action.type) {
        case todosContextActions.set:
            return {
                todos: action.payload,
            }
        case todosContextActions.add:
            return {
                todos: [action.payload, ...state.todos],
            }
        case todosContextActions.update:
            return {
                todos: state.todos.map((item) =>
                    item._id === action.payload._id
                        ? { ...item, ...action.payload }
                        : item
                ),
            }
        case todosContextActions.delete:
            return {
                todos: state.todos.filter(
                    (item) => item._id !== action.payload._id
                ),
            }
    }
}

export const TodosContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(todosReducer, {
        todos: [],
    })

    return (
        <TodosContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TodosContext.Provider>
    )
}
