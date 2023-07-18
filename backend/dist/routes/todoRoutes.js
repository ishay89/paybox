"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../models/Todo"));
const router = express_1.default.Router();
// Create a new Todo
router.post('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, dueDate } = req.body;
        console.log("adding new todo");
        const todo = new Todo_1.default({
            title,
            description,
            dueDate
        });
        yield todo.save();
        res.status(201).json({ todo });
    }
    catch (error) {
        console.error('Error creating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// Get all Todos
router.get('/todos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("fetching todos");
        const todos = yield Todo_1.default.find();
        res.status(200).json({ todos });
    }
    catch (error) {
        console.error('Error fetching Todos:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// Update Todo (toggle done)
router.patch('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const todo = yield Todo_1.default.findById(id);
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        todo.done = !todo.done;
        yield todo.save();
        res.status(200).json({ todo });
    }
    catch (error) {
        console.error('Error updating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// Update Todo
router.put('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, dueDate } = req.body;
        const todo = yield Todo_1.default.findByIdAndUpdate(id, { title, description, dueDate }, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ todo });
    }
    catch (error) {
        console.error('Error updating Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
// Delete Todo
router.delete('/todos/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield Todo_1.default.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting Todo:', error);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=todoRoutes.js.map