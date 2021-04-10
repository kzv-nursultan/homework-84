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
            res.status(400).send('Check your inputs');
        };
    } catch (error) {
        res.status(500).send({error_message: error.errors.status.message});
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({user:req.user._id}).populate('user');
        res.send(tasks);
    } catch (error) {
        res.status(500).send('Something went wrong');
    };
});

router.put('/:id', auth, async (req, res)=>{
    const data = req.body;
    const task = await Task.findById(req.params.id);
    if(data.user == task.user) {
        try {
            const editedTask = await Task.findByIdAndUpdate(req.params.id, data,{ new: true, runValidators: true });
            res.send(editedTask);
        } catch (error){
            res.status(500).send({error_message: error.errors.status.message});
        };
    } else {
        return res.status(400).send('You can not edit user');
    };
});

router.delete('/:id', auth, async (req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.send('Deleted');
    } catch (error) {
        res.send({error_message: error.errors.status.message});
    };
});

module.exports = router;