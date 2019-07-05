const express = require('express');
require('../db/mongoose');
const Task = require('../models/task');
const router = new express.Router();
const auth = require('../middleware/auth');

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        createdBy: req.user._id
    });
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400)
            .send(e);
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const task = await Task.find({createdBy: req.user._id});
        res.send(task);
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, createdBy: req.user._id});
        if (!task) {
            res.status(404)
                .send();
        } else res.send(task);
    } catch (e) {
        res.status(404)
            .send({error: "Task not found"});
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['completed', 'description'];
    const updates = Object.keys(req.body);
    const isValidRequest = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidRequest) {
        return res.status(400).send();
    }
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, createdBy: req.user._id});
        if (!task) {
            res.status(404)
                .send();
        } else {
            updates.forEach((update) => task[update] = req.body[update]);
            await task.save();
            if (!task) {
                res.status(404)
                    .send({error: 'Task not found'})
            } else res.status(200)
                .send(task);
        }

    } catch (e) {
        res.status(500)
            .send(e);
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        await Task.findOneAndDelete({_id, createdBy: req.user._id});
        res.status(200)
            .send();
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

module.exports = router;