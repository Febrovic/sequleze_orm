const express = require('express');
const router = express.Router();
const { User, Post } = require('../models');

router.route('/')
    .get(async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .post(async (req, res) => {
        try {
            const { username } = req.body;
            const newUser = await User.create({ username });
            res.status(201).json(newUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, { include: Post });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .put(async (req, res) => {
        try {
            const { username } = req.body;
            const [updated] = await User.update({ username }, { where: { id: req.params.id } });
            if (!updated) {
                return res.status(404).json({ error: 'User not found' });
            }
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .delete(async (req, res) => {
        try {
            const deleted = await User.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });


 router.route('/:id/posts')
    .get(async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id, { include: Post });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user.Posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });   

module.exports = router;