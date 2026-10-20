const express = require('express');
const router = express.Router();
const { Category, Post, User } = require('../models');

router.route('/').get(async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.post(async (req, res) => {
    try {
        const { title } = req.body;
        const newCategory = await Category.create({ title });
        res.status(201).json(newCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/:id')
.get(async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.put(async (req, res) => {
    try {
        const { title } = req.body;
        const [updated] = await Category.update({ title }, { where: { id: req.params.id } });
        if (!updated) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const updatedCategory = await Category.findByPk(req.params.id);
        res.json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})
.delete(async (req, res) => {
    try {
        const deleted = await Category.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.route('/:id/posts').get(async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        const posts = await Post.findAll({
            where: { categoryId: req.params.id },
            attributes: { exclude: ['categoryId', 'userId'] },
            include: [Category, User],
        });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
