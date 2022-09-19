const router = require('express').Router();
const Task = require('../models/task');
console.log('fuck testing');

router.post('/', async (req, res) => {
    const newTask = new Task(req.body);
    try {
        const savedTask = await newTask.save();
        res.status(200).json(savedTask);
    } catch (err) {
        //affichage de l'erreur au cas ou tous ne se passe pas comme prevus
        res.status(500).json(err);
    }
});

//update task

router.put('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    try {
        // if (task.username == req.body.username) {
        try {
            const updateTask = await Task.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                },
                { new: true }
            );
            res.status(200).json(updateTask);
        } catch (err) {
            res.status(500).json(err);
        }
        // } else {
        // res.status(401).json('vous pouvez uniquement modifier vos tache');
        // }
    } catch (err) {
        res.status(500).json(err);
    }


});

// effacer tasche 
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        // if (task.username === req.body.username) {
        try {
            await task.delete();
            res.status(200).json('tache effacer');
        } catch (err) {
            res.status(500).json(err);
        }
        // } else {
        //     res.status(200).json('vous ne pouvez effacer que vos propre action messages');
        // }
    } catch (err) {
        res.status(500).json(err);
    }
    // const task = await Task.findByIdAndDelete(req.params.id);

});

//get task one
router.get('/:username/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    try {
        res.status(200).json(task);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    } catch (err) {
        res.status(500).json(err)
    }
});

// //get all task
router.get('/:username', async (req, res) => {
    try {
        const task = await Task.findOne({ username: req.params.username });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router