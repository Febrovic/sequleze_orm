const Sequelize = require('sequelize');
const db = require('../config/database');

const Category= require('./Category')(db, Sequelize);
const Post = require('./Post')(db, Sequelize);
const User = require('./User')(db, Sequelize);
const Tag = require('./Tag')(db, Sequelize);
const PostTag = db.define('post_tags');



Category.hasMany(Post, { as: 'articles' });
Post.belongsTo(Category);

User.hasMany(Post);
Post.belongsTo(User);

Post.belongsToMany(Tag, {through: PostTag});
Tag.belongsToMany(Post, {through: PostTag});

db.sync({ force: false })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

module.exports = {
    Category,
    Post,
    User,
    Tag,
};