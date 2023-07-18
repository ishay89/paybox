import mongoose, { Schema, Document } from 'mongoose';

interface ITodo extends Document {
    title: string;
    description: string;
    dueDate: Date;
    done: boolean;
}

const todoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    done: { type: Boolean, default:false },
});

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
