module.exports = (db, types) => {
    const User = db.define('users', {
        id: {
            type: types.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: types.STRING,
            allowNull: false,
            validate: {
                is: ["^[a-z]+$",'i'],
            },
        },
    });

    return User;
};
