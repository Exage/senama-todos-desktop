import { useState } from "react"

export const useFetchTodos = () => {
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(null)

    const fetchTodos = async () => {
        try {
            setLoading(true)
            setError(null)

            const api_url = `${import.meta.env.VITE_APP_API}/todos`

            const response = await fetch(api_url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "GET",
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

    return { fetchTodos, isLoading, error }
}
