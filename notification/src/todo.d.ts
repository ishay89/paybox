/// <reference path="../../backend/src/models/todo.d.ts" />


declare module '../../backend/src/models/todo' {
    import { Schema } from 'mongoose';

    interface TodoDocument {
        // Add any additional properties or methods specific to the notification microservice
        // if needed.
    }

    interface Todo {
        // Add any additional properties or methods specific to the notification microservice
        // if needed.
    }

    const TodoSchema: Schema<TodoDocument>;

    export { TodoDocument, Todo, TodoSchema };
}


