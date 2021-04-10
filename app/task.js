const express = require('express');
const auth = require("../middleware/auth");
const Task = require ('../models/Task');
const router = express.Router();

router.post('/', auth, async (req,res)=>{
    const data = req.body;
    try {
        if(data.user && data.title && data.description && data.status) {
            const newTask = new Task(data);
            await newTask.save();
            res.send(newTask);
        } else {
            res.send(400).send('Check your inputs');
        };
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user._id)
        const tasks = await Task.find({user:req.user._id}).populate('user');
        res.send(tasks);
    } catch (error) {
        res.status(500).send('Something went wrong');
    };
});

module.exports = router;