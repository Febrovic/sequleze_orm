module.exports = (db, types) => {
    const Post = db.define('posts', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: types.STRING,
            allowNull: false,
        },
        body: {
            type: types.STRING,
            allowNull: false,
        },
    });

    return Post;
};
