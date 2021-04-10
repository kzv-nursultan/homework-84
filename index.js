const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");
const exitHook = require('async-exit-hook');
const users = require('./app/users');
const track = require('./app/task');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', users);
app.use('/tasks', track);

const port = 8000;

const run = async () => {
    await mongoose.connect('mongodb://localhost/todoapi',
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

    app.listen(port, ()=>{
        console.log('server started on port ' + port);
    });

    exitHook(async callback=>{
        await mongoose.disconnect();
        console.log(' Mongoose was disconnected');
        callback();
    });
};

run().catch(e=>console.error(e));