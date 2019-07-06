const express = require('express');
require('../db/mongoose');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middleware/auth');


router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        const result = await user.save();
        user.generateAuthToken();
        res.send(user);
    } catch (e) {
        res
            .status(400)
            .send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (e) {
        res.status(400)
            .send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.send()
    } catch (e) {
        res.status(500)
            .send();
    }
});

router.post('/users/logout/all', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (e) {
        res.status(500)
            .send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

/*router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        res.send(await User.findById(_id));
    } catch (e) {
        res.status(404)
            .send({
                error: "User not found"
            })
    }
});*/

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['age', 'name', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400)
            .send({error: 'Invalid request'})
    }
    try {

        const user = req.user;
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

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

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200)
            .send();
    } catch (e) {
        res.status(500)
            .send({error: e});
    }
});

module.exports = router;
