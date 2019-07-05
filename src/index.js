const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/taks');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
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

app.get('/users', async (req, res) => {
    try {
        res.send(await User.find());
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

app.get('/users/:id', async (req, res) => {
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

app.patch('/users/:id', async (req, res) => {
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

app.delete('/users/:id', async (req, res) => {
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


app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400)
            .send(e);
    }
});

app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find();
        res.send(task);
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        res.send(task);
    } catch (e) {
        res.status(404)
            .send({error: "Task not found"});
    }
});

app.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['completed', 'description'];
    const updates = Object.keys(req.body);
    const isValidRequest = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidRequest) {
        return res.status(400).send();
    }
    const _id = req.params.id;
    try {
        const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedTask) {
            res.status(404)
                .send({error: 'Task not found'})
        } else res.status(200)
            .send(updatedTask);
    } catch (e) {
        res.status(500)
            .send(e);
    }
});

app.delete('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
    console.log('Server is up and kicking!!!')
});