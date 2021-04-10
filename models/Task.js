const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'UserSchema',
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:['new','in_progress', 'complete'],
    }
});

const Task = mongoose.model('TaskSchema',TaskSchema);
module.exports = Task;