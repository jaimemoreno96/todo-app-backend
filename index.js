const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const whiteList = ['http://localhost:3000', 'http://192.168.1.162:3000', undefined];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin)) {
            return callback(null, true);
        }
        callback(new Error('Not allowed by CORS'));
    }
}

connectDB();

app.use(cors(corsOptions));

app.use(express.json({ extended: true }));

app.use('/api/todos', require('./routes/todos'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));