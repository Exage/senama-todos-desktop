import { useState } from "react"

export const usePostTodo = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const postTodo = async (title) => {
        try {
            setLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/todos`

            const response = await fetch(api_url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ title }),
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

    return { postTodo, isLoading, error }
}
