const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    titre: {
        type:String,
        // required:true,
        // unique:true
    },
    check:{
        type:Boolean,
        default:false
    },
});

module.exports = mongoose.model('task', TaskSchema);

