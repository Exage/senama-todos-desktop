import { useState } from "react"
import { List, Typography, Input, Space } from "antd"
import { TodoActions } from "./TodoActions"

const { Text } = Typography

export const TodoItem = ({
    item,
    index,
    onSave,
    onDelete,
    onToggleCompleted,
    isLoading
}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState(item.title)

    const handleSave = () => {
        onSave({ ...item, title: editedTitle })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedTitle(item.title)
        setIsEditing(false)
    }

    return (
        <List.Item>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        flexWrap: "nowrap",
                    }}
                >
                    <Text style={{ whiteSpace: "nowrap" }} strong>
                        {index + 1}.
                    </Text>
                    {isEditing ? (
                        <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            style={{ flex: 1, margin: "0 20px 0 10px" }}
                        />
                    ) : (
                        <Text
                            delete={item.completed}
                            style={{
                                margin: "0 20px 0 10px",
                                opacity: item.completed ? 0.3 : 1,
                            }}
                        >
                            {item.title}
                        </Text>
                    )}
                </div>

                <TodoActions
                    isEditing={isEditing}
                    onEdit={() => setIsEditing(true)}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    onDelete={() => onDelete(item)}
                    onToggleCompleted={() =>
                        onToggleCompleted(item, !item.completed)
                    }
                    completed={item.completed}
                    isLoading={isLoading}
                />
            </div>
        </List.Item>
    )
}
