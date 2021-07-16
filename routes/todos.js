const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const todosController = require("../controllers/todosController");

router.get('/',
    todosController.getTodos
);

router.post('/',
    [
        check('title', 'El título es obligatorio').not().isEmpty()
    ],
    todosController.addTodo
);

router.put('/:id',
    todosController.updTodo
);

router.delete('/:id',
    todosController.deleteTodo
);

router.patch('/:id',
    todosController.reorderTodos
);

router.delete('/',
    todosController.deleteCompletedTodos
);


module.exports = router;

