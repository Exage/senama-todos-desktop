import { Button, Space } from "antd"

export const TodoActions = ({
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    onToggleCompleted,
    completed,
    isLoading
}) => {

    return (
        <Space>
            {isEditing ? (
                <>
                    <Button
                        onClick={onSave}
                        type="primary"
                        disabled={isLoading}
                    >
                        Save
                    </Button>
                    <Button onClick={onCancel} disabled={isLoading}>
                        Cancel
                    </Button>
                </>
            ) : (
                <>
                    <Button onClick={onEdit} disabled={isLoading}>
                        Edit
                    </Button>
                    <Button onClick={onToggleCompleted} disabled={isLoading}>
                        {completed ? "Undone" : "Done"}
                    </Button>
                    <Button onClick={onDelete} danger disabled={isLoading}>
                        Delete
                    </Button>
                </>
            )}
        </Space>
    )
}
