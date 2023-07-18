import React, { useState } from 'react';

interface TodoItemProps {
    todo: {
        _id: string;
        title: string;
        description: string;
        dueDate: string;
        done: boolean;
    };
    onDelete: (id: string) => void;
    onToggleDone: (id: string) => void;
    onUpdate: (id: string, updatedTodo: { title: string; description: string; dueDate: string }) => void;
}

function TodoItem({ todo, onDelete, onToggleDone, onUpdate } : TodoItemProps) {
    const [editMode, setEditMode] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [updatedDescription, setUpdatedDescription] = useState(todo.description);
    const [updatedDueDate, setUpdatedDueDate] = useState(todo.dueDate);

    const handleDelete = () => {
        onDelete(todo._id);
    };

    const handleToggleDone = () => {
        onToggleDone(todo._id);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleUpdate = () => {
        onUpdate(todo._id, { title: updatedTitle, description: updatedDescription, dueDate: updatedDueDate });
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setUpdatedTitle(todo.title);
        setUpdatedDescription(todo.description);
        setUpdatedDueDate(todo.dueDate);
    };

    return (
        <tr>
            <td>
                <input type="checkbox" checked={todo.done} onChange={handleToggleDone} />
            </td>
            {!editMode ? (
                <>
                    <td style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.title}</td>
                    <td style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.description}</td>
                    <td style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.dueDate.split('T')[0]}</td>
                </>
            ) : (
                <>
                    <td>
                        <input
                            type="text"
                            value={updatedTitle}
                            onChange={e => setUpdatedTitle(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={updatedDescription}
                            onChange={e => setUpdatedDescription(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="date"
                            value={`${updatedDueDate.split('T')[0]}`}
                            onChange={e => setUpdatedDueDate(e.target.value)}
                        />
                    </td>
                </>
            )}
            <td>
                {!editMode ? (
                    <>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                ) : (
                    <>
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                )}
            </td>
        </tr>
    );
}


export default TodoItem;
