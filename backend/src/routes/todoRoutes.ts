import express, { Request, Response } from 'express';
import Todo from '../models/Todo';

const router = express.Router();

// Create a new Todo
router.post('/todos', async (req: Request, res: Response) => {
    try {
        const { title, description, dueDate } = req.body;
        console.log("adding new todo")
        const todo = new Todo({
            title,
            description,
            dueDate
        });

        await todo.save();

        res.status(201).json({ todo });
    } catch (error) {
        console.error('Error creating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Get all Todos
router.get('/todos', async (req: Request, res: Response) => {
    try {
        console.log("fetching todos")
        const todos = await Todo.find();
        res.status(200).json({ todos });
    } catch (error) {
        console.error('Error fetching Todos:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Todo (toggle done)
router.patch('/todos/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todo.done = !todo.done;
        await todo.save();

        res.status(200).json({ todo });
    } catch (error) {
        console.error('Error updating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Todo
router.put('/todos/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;

        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, dueDate },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.status(200).json({ todo });
    } catch (error) {
        console.error('Error updating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Delete Todo
router.delete('/todos/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
