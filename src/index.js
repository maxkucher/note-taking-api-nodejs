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
    try {

    } catch (e) {

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


app.listen(port, () => {
    console.log('Server is up and kicking!!!')
});