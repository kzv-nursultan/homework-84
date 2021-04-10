const User = require('../models/User');

const auth = async (req,res,next) => {
    const token = req.get('Authorization');
    if(!token){
        return res.send(401).send('Token not exist');
    };

    const user = await User.findOne({token});
    if(!user){
        return res.status(401).send('User not found');
    };
    req.user = user;

    next();
};

module.exports = auth;