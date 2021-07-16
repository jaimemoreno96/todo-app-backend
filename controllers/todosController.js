const Todo = require('../models/Todo');
const { validationResult } = require('express-validator');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json({ todos });
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

const addTodo = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(404).json({ errors: errors.array() });
    }

    try {
        const todo = new Todo(req.body);
        let maxTodo = await Todo.find().sort({ order: -1 }).limit(1);

        if (maxTodo.length) {
            todo.order = maxTodo[0].order + 1;
        }

        await todo.save();
        res.json(todo);

    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }

}

const updTodo = async (req, res) => {
    try {
        let newTodo = req.body;
        let todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not founded' })
        }

        todo = await Todo.findByIdAndUpdate({ _id: req.params.id }, { $set: newTodo }, { new: true });

        return res.json({ todo });
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

const deleteTodo = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id)

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not founded' })
        }

        await Todo.findByIdAndDelete({ _id: req.params.id })

        res.json({ msg: 'Todo deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}

const reorderTodos = async (req, res) => {

    try {
        let todo = await Todo.findById(req.params.id)

        if (!todo) {
            return res.status(404).json({ msg: 'Todo not founded' })
        }
        console.log(req.body.position);

        await Todo.updateOne({ _id: req.params.id }, { $set: { $order: req.body.positon } });
        res.json({ msg: 'Todo reordered' })

    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }

}

const deleteCompletedTodos = async (req, res) => {
    try {
        let todos = await Todo.find({ completed: true }).exec();
        console.log(todos);

        if (!todos) {
            return res.status(404).json({ msg: 'There is not completed todos' })
        }

        await Todo.deleteMany({ completed: true });

        res.json({ msg: 'Todos deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send('There is an error');
    }
}


module.exports = {
    addTodo,
    getTodos,
    updTodo,
    deleteTodo,
    reorderTodos,
    deleteCompletedTodos
}