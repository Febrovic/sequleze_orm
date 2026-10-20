const express = require('express');
const router = express.Router();
const { Post, User, Category, Tag } = require('../models');

router.route('/')
    .get(async (req, res) => {
        try {
            const posts = await Post.findAll({ include: [User, Category, Tag] });
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .post(async (req, res) => {
        try {
            const { title, body, userId, categoryId, tags } = req.body;
            const newPost = await Post.create({ title, body, userId, categoryId });
            if (tags && tags.length > 0) {
                const tagRows = await Promise.all(
                    tags.map(t => Tag.findOrCreate({ where: { title: t } }).then(([tag]) => tag))
                );
                await newPost.setTags(tagRows);
            }
            const post = await Post.findByPk(newPost.id, { include: [User, Category, Tag] });
            res.status(201).json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

router.route('/:id')
    .get(async (req, res) => {
        try {
            const post = await Post.findByPk(req.params.id, { include: [User, Category, Tag] });
            if (!post) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.json(post);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .put(async (req, res) => {
        try {
            const { title, body, userId, categoryId, tagIds } = req.body;
            const [updated] = await Post.update({ title, body, userId, categoryId }, { where: { id: req.params.id } });
            if (!updated) {
                return res.status(404).json({ error: 'Post not found' });
            }
            const updatedPost = await Post.findByPk(req.params.id);
            if (tagIds && tagIds.length > 0) {
                const tags = await Tag.findAll({ where: { id: tagIds } });
                await updatedPost.setTags(tags);
            }
            res.json(updatedPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
    .delete(async (req, res) => {
        try {
            const deleted = await Post.destroy({ where: { id: req.params.id } });
            if (!deleted) {
                return res.status(404).json({ error: 'Post not found' });
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

module.exports = router;
