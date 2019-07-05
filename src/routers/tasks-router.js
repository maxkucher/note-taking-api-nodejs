const express = require('express');
require('../db/mongoose');
const Task = require('../models/taks');
const router = new express.Router();


router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400)
            .send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find();
        res.send(task);
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        res.send(task);
    } catch (e) {
        res.status(404)
            .send({error: "Task not found"});
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['completed', 'description'];
    const updates = Object.keys(req.body);
    const isValidRequest = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidRequest) {
        return res.status(400).send();
    }
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        /*const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });*/
        if (!task) {
            res.status(404)
                .send({error: 'Task not found'})
        } else res.status(200)
            .send(task);
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200)
            .send();
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

module.exports = router;