const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res)=>{
    try {
        const newUser = new User(req.body);
        newUser.generateToken();
        newUser.save();
        res.send(newUser);
    } catch (error) {
        res.status(400).send(error);
    };
});

router.post('/session', async (req, res)=>{
    const user = await User.findOne({username:req.body.username});
    if (!user) {
       res.status(400).send('User not found');
    };

    const isMatch = await user.checkPassword(req.body.password);

    if(!isMatch){
        res.status(400).send('user not found');
    };

    try {
        user.generateToken();
        user.save();
        res.send({token:user.token});
    } catch (error) {
        res.status(500).send(error);
    };
});

router.get('/', async (req,res)=>{
    const users = await User.find();
    res.send(users);
});

module.exports = router;