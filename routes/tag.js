const express = require('express');
const router = express.Router();
const { Tag } = require('../models');


router.route('/').get(async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.post(async (req, res) => {
    try {
        const { title } = req.body;
        const newTag = await Tag.create({ title });
        res.status(201).json(newTag);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/:id')
.get(async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.json(tag);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.put(async (req, res) => {
    try {
        const { title } = req.body;
        const [updated] = await Tag.update({ title }, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        const updatedTag = await Tag.findByPk(req.params.id);
        res.json(updatedTag);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.delete(async (req, res) => {
    try {
        const deleted = await Tag.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Tag not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
