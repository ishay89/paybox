import React from 'react';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: {
        _id: string;
        title: string;
        description: string;
        dueDate: string;
        done: boolean;
    }[];
    onDelete: (id: string) => void;
    onToggleDone: (id: string) => void;
    onUpdate: (id: string, updatedTodo: { title: string; description: string; dueDate: string }) => void;
}

function TodoList({ todos, onDelete, onToggleDone, onUpdate } : TodoListProps) {
    return (
        <table>
            <thead>
            <tr>
                <th>Done</th>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onDelete={onDelete}
                    onToggleDone={onToggleDone}
                    onUpdate={onUpdate}/>))}
            </tbody>
        </table>
    );
}

export default TodoList;