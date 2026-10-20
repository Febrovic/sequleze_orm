module.exports = (db, types) => {
    const Tag = db.define('tags', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: types.STRING,
            allowNull: false,
        },
    });

    return Tag;
};
