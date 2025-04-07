import { useState } from "react"

export const usePutTodo = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const putTodo = async (id, title, completed) => {
        try {
            setLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/todos/${id}`

            const response = await fetch(api_url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify({ title, completed }),
            })
            const json = await response.json()

            return json
        } catch (error) {
            setError(error.message)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { putTodo, isLoading, error }
}
