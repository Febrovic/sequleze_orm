module.exports = (db, types) => {
    const Category = db.define('categories', {
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

    return Category;
};
