const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    order: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('Todo', TodoSchema);