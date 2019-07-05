const express = require('express');
require('../db/mongoose');
const User = require('../models/user');
const router = new express.Router();



router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user);
    } catch (e) {
        res
            .status(400)
            .send(e);
    }
});

router.get('/users', async (req, res) => {
    try {
        res.send(await User.find());
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        res.send(await User.findById(_id));
    } catch (e) {
        res.status(404)
            .send({
                error: "User not found"
            })
    }
});

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['age', 'name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400)
            .send({error: 'Invalid request'})
    }
    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            res.status(404).send();
        } else {
            res.send(user);
        }
    } catch (e) {
        res.status(400)
            .send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200)
            .send();
    } catch (e) {
        res.status(500)
            .send({error: e});
    }
});

module.exports =router;
