import { Form, Input, Button } from "antd"
import { useTodosContext } from "../hooks/useTodosContext"
import { usePostTodo } from "../hooks/usePostTodo"

import { todosContextActions } from "../constants/TodosContextActions"

export const TodoForm = () => {
    const [form] = Form.useForm()
    const { dispatch } = useTodosContext()
    const { postTodo, isLoading } = usePostTodo()

    const onFinish = async (values) => {
        const newTodo = values.todo.trim()

        if (newTodo) {
            const todo = await postTodo(newTodo)
            dispatch({ type: todosContextActions.add, payload: todo })
            form.resetFields()
        }
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="inline"
            style={{ marginTop: "32px" }}
        >
            <Form.Item
                name="todo"
                rules={[{ required: true, message: "This field is required" }]}
                style={{ flex: 1 }}
            >
                <Input placeholder="Type your todo here" disabled={isLoading} />
            </Form.Item>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
                Send
            </Button>
        </Form>
    )
}
